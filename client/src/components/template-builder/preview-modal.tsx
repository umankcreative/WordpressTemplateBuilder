import { Component } from "@shared/schema";
import { getComponentRegistry } from "@/lib/component-registry";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: Component[];
}

export default function PreviewModal({ isOpen, onClose, components }: PreviewModalProps) {
  const componentRegistry = getComponentRegistry();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Website Preview</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="bg-white">
            {components.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-slate-500 text-lg mb-2">No components added yet</p>
                  <p className="text-slate-400">Start by dragging components from the sidebar</p>
                </div>
              </div>
            ) : (
              components.map((component) => {
                const RendererComponent = componentRegistry[component.type as keyof typeof componentRegistry];
                if (!RendererComponent) {
                  return (
                    <div
                      key={component.id}
                      className="p-8 border-2 border-dashed border-red-300 bg-red-50"
                    >
                      <p className="text-red-600 font-medium">Unknown component: {component.type}</p>
                    </div>
                  );
                }
                
                return (
                  <div key={component.id} className="w-full">
                    <RendererComponent properties={component.properties} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}