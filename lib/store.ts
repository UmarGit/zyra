import { create } from "zustand"
import { type Node, type Edge, type Connection, addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react"

interface NodeData {
  image?: string
  text?: string
  isGenerating?: boolean
  error?: string
}

interface AppState {
  nodes: Node[]
  edges: Edge[]
  nodeData: Record<string, NodeData>
  apiKey: string

  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  onNodesChange: (changes: any[]) => void
  onEdgesChange: (changes: any[]) => void
  onConnect: (connection: Connection) => void

  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void
  addImageNode: (position: { x: number; y: number }) => void
  addTextNode: (position: { x: number; y: number }) => void
  generateImage: (textNodeId: string, prompt: string) => void
  getConnectedImages: (textNodeId: string) => Array<{ id: string; image: string }>
  setApiKey: (key: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeData: {},
  apiKey: "",

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },

  updateNodeData: (nodeId, data) => {
    const { nodeData } = get()
    set({
      nodeData: {
        ...nodeData,
        [nodeId]: { ...nodeData[nodeId], ...data },
      },
    })
  },

  addImageNode: (position) => {
    const { nodes } = get()
    const newNodeId = `image-${Date.now()}`
    const newNode: Node = {
      id: newNodeId,
      type: "imageNode",
      position,
      data: { nodeId: newNodeId },
    }
    set({ nodes: [...nodes, newNode] })
  },

  addTextNode: (position) => {
    const { nodes } = get()
    const newNodeId = `text-${Date.now()}`
    const newNode: Node = {
      id: newNodeId,
      type: "textNode",
      position,
      data: { nodeId: newNodeId },
    }
    set({ nodes: [...nodes, newNode] })
  },

  generateImage: async (textNodeId, prompt) => {
    const { nodes, apiKey } = get()
    const connectedImages = get().getConnectedImages(textNodeId)

    if (!apiKey.trim()) {
      get().updateNodeData(textNodeId, {
        error: "Please set your API key in Settings",
      })
      return
    }

    get().updateNodeData(textNodeId, { isGenerating: true, error: undefined })

    const newImageNodeId = `image-${Date.now()}`
    const textNode = nodes.find((n) => n.id === textNodeId)
    const newPosition = textNode ? { x: textNode.position.x + 300, y: textNode.position.y } : { x: 400, y: 200 }

    const newImageNode: Node = {
      id: newImageNodeId,
      type: "imageNode",
      position: newPosition,
      data: { nodeId: newImageNodeId },
    }

    set({ nodes: [...nodes, newImageNode] })
    get().updateNodeData(newImageNodeId, { isGenerating: true })

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: "gemini-2.5-flash-image-preview",
          apiKey,
          inputImages: connectedImages.map((img) => img.image),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

      const { imageUrl } = await response.json()

      get().updateNodeData(newImageNodeId, {
        image: imageUrl,
        isGenerating: false,
      })
    } catch (error) {
      console.error("Image generation failed:", error)
      let userFriendlyMessage = "Unknown error occurred"

      if (error instanceof Error) {
        if (error.message.includes("QUOTA_EXCEEDED")) {
          userFriendlyMessage = "⚠️ API quota exceeded. Please check your Gemini API billing or try again later."
        } else if (error.message.includes("RATE_LIMITED")) {
          userFriendlyMessage = "⏱️ Too many requests. Please wait a moment and try again."
        } else if (error.message.includes("GENERATION_FAILED")) {
          userFriendlyMessage = `❌ Generation failed: ${error.message.replace("GENERATION_FAILED: ", "")}`
        } else {
          userFriendlyMessage = error.message
        }
      }

      get().updateNodeData(newImageNodeId, {
        error: userFriendlyMessage,
        isGenerating: false,
      })

      get().updateNodeData(textNodeId, {
        error: userFriendlyMessage,
        isGenerating: false,
      })
    }

    get().updateNodeData(textNodeId, { isGenerating: false })
  },

  getConnectedImages: (textNodeId) => {
    const { edges, nodeData } = get()

    const connectedEdges = edges.filter((edge) => edge.target === textNodeId)
    const imageNodeIds = connectedEdges.map((edge) => edge.source)

    return imageNodeIds
      .map((nodeId) => ({
        id: nodeId,
        image: nodeData[nodeId]?.image || "",
      }))
      .filter((img) => img.image)
  },

  setApiKey: (key) => set({ apiKey: key }),
}))
