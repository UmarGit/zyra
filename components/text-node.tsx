"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sparkles, ImageIcon, ArrowRight, Edit3 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useState } from "react";

export function TextNode({ data, id }: NodeProps) {
  const { nodeData, updateNodeData, generateImage, getConnectedImages } =
    useAppStore();
  const currentNodeData = nodeData[id] || {};
  const text = currentNodeData.text || "";
  const isGenerating = currentNodeData.isGenerating || false;
  const error = currentNodeData.error;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetText, setSheetText] = useState(text);

  const handleTextChange = (value: string) => {
    updateNodeData(id, { text: value });
    if (error) {
      updateNodeData(id, { error: undefined });
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    generateImage(id, text);
  };

  const handleSheetSave = () => {
    handleTextChange(sheetText);
    setIsSheetOpen(false);
  };

  const handleSheetCancel = () => {
    setSheetText(text);
    setIsSheetOpen(false);
  };

  const connectedImages = getConnectedImages(id);

  return (
    <Card className="w-64 shadow-lg border-blue-200 bg-blue-50/50 p-0">
      <Handle type="target" position={Position.Left} />

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              placeholder="Enter your prompt text..."
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[80px] max-h-[300px] resize-none border-blue-200 focus:border-blue-400 bg-white/80 pr-8"
            />

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-blue-100"
                  onClick={() => {
                    setSheetText(text);
                    setIsSheetOpen(true);
                  }}
                >
                  <Edit3 className="h-3 w-3 text-blue-600" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit prompt</SheetTitle>
                  <SheetDescription>
                    Make changes to your prompt here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>

                <div className=" px-4">
                  <Textarea
                    placeholder="Enter your detailed prompt here..."
                    value={sheetText}
                    onChange={(e) => setSheetText(e.target.value)}
                    className="h-[calc(100vh-248px)] resize-none"
                  />
                </div>
                <SheetFooter>
                  <Button variant="outline" onClick={handleSheetCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSheetSave}>Save Prompt</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          {connectedImages.length > 0 && (
            <div className="space-y-2 bg-white/60 rounded-lg p-2 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-medium text-blue-700">
                  <ImageIcon className="h-3 w-3" />
                  <span>Connected Images ({connectedImages.length})</span>
                </div>
                <ArrowRight className="h-3 w-3 text-blue-400" />
              </div>

              <div className="grid grid-cols-4 gap-1">
                {connectedImages.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-12 h-12 bg-gray-200 rounded-md border-2 border-blue-200 overflow-hidden shadow-sm">
                      {img.image ? (
                        <img
                          src={img.image || "/placeholder.svg"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                  </div>
                ))}

                {connectedImages.length > 4 && (
                  <div className="w-12 h-12 bg-blue-100 rounded-md border-2 border-blue-200 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-blue-600">
                      +{connectedImages.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || isGenerating}
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Sparkles className="h-3 w-3 mr-2" />
            {isGenerating ? "Generating..." : "Generate Image"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
