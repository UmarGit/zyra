"use client";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ImageNode } from "@/components/image-node";
import { TextNode } from "@/components/text-node";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Type, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { trackPlaygroundAction, trackButtonClick } from "@/lib/analytics";

const nodeTypes = {
  imageNode: ImageNode,
  textNode: TextNode,
};

export default function PlaygroundPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addImageNode,
    addTextNode,
    apiKey,
    setApiKey,
  } = useAppStore();

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <div className={`flex-1 transition-all duration-300`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>

        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Button
            onClick={() => {
              addImageNode({ x: Math.random() * 400, y: Math.random() * 400 });
              trackPlaygroundAction('add_image_node');
            }}
            size="sm"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="hidden md:block ml-2">Add Image</span>
          </Button>

          <Button
            onClick={() => {
              addTextNode({ x: Math.random() * 400, y: Math.random() * 400 });
              trackPlaygroundAction('add_text_node');
            }}
            size="sm"
            variant="outline"
          >
            <Type className="h-4 w-4" />
            <span className="hidden md:block ml-2">Add Text</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              trackButtonClick('toggle_settings', 'playground');
            }}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:block ml-2">Settings</span>
          </Button>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="w-80 bg-background border-l border-border p-6 overflow-y-auto z-50">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Flow Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your image prompting workflow
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model-select">AI Model</Label>
                <div className="p-3 bg-muted rounded-md">
                  <div className="font-medium text-sm">
                    Gemini 2.5 Flash Image
                  </div>
                  <div className="text-xs text-muted-foreground">
                    State-of-the-art image generation and editing model
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  API key for the selected model provider
                </p>
              </div>

              <div className="space-y-2">
                <Label>Current Configuration</Label>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    Model:{" "}
                    <span className="font-medium">Gemini 2.5 Flash Image</span>
                  </div>
                  <div>
                    API Key:{" "}
                    <span className="font-medium">
                      {apiKey ? "••••••••" : "Not set"}
                    </span>
                  </div>
                  <div>
                    Note: Ensure your Google Cloud Project have billing enabled.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Usage Instructions</Label>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>1. Add image nodes and upload reference images</p>
                <p>2. Add text nodes with prompts</p>
                <p>3. Connect image nodes to text nodes</p>
                <p>4. Click "Generate Image" to create new images</p>
                <p>
                  5. The images generated are not saved, so please download them
                  before leaving the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
