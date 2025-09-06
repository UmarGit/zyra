"use client"

import type React from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import { Upload, X, Loader2, AlertCircle, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAppStore } from "@/lib/store"

export function ImageNode({ data, id }: NodeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const { nodeData, updateNodeData } = useAppStore()
  const currentNodeData = nodeData[id] || {}
  const selectedImage = currentNodeData.image
  const isLoading = currentNodeData.isGenerating
  const error = currentNodeData.error

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        updateNodeData(id, { image: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    updateNodeData(id, { image: undefined, error: undefined })
  }

  const downloadImage = () => {
    if (!selectedImage) return

    const link = document.createElement("a")
    link.href = selectedImage
    link.download = `image-${id}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-64 shadow-lg p-0">
      <Handle type="source" position={Position.Right} />

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

            {error ? (
              <div className="w-full h-32 border-2 border-red-200 rounded-md flex items-center justify-center bg-red-50">
                <div className="flex flex-col items-center gap-2 p-2 text-center">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <span className="text-xs text-red-600">{error}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateNodeData(id, { error: undefined })}
                    className="text-xs"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-md flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Generating...</span>
                </div>
              </div>
            ) : !selectedImage ? (
              <Button
                variant="outline"
                className="w-full h-32 border-dashed bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Image</span>
                </div>
              </Button>
            ) : (
              <div className="relative group">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={clearImage}
                >
                  <X className="h-3 w-3" />
                </Button>

                <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={downloadImage}
                  >
                    <Download className="h-3 w-3" />
                  </Button>

                  <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                      >
                        <Maximize2 className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-[80vh] p-2">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={selectedImage || "/placeholder.svg"}
                          alt="Fullscreen preview"
                          className="max-w-full max-h-full object-contain rounded-md"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
