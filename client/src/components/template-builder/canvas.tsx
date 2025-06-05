import { useDrop } from "react-dnd";
import { Component } from "@shared/schema";
import { getComponentRegistry } from "@/lib/component-registry";
import { Plus } from "lucide-react";

interface CanvasProps {
  components: Component[];
  selectedComponent: string | null;
  breakpointStyles: React.CSSProperties;
  onAddComponent: (type: string) => void;
  onSelectComponent: (id: string) => void;
  onClearSelection: () => void;
}

export default function Canvas({
  components,
  selectedComponent,
  breakpointStyles,
  onAddComponent,
  onSelectComponent,
  onClearSelection,
}: CanvasProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { type: string }) => {
      onAddComponent(item.type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const componentRegistry = getComponentRegistry();

  return (
    <div className="h-full p-6 overflow-auto">
      {/* Canvas Container with responsive frame */}
      <div className="mx-auto transition-all duration-300" style={breakpointStyles}>
        <div
          ref={drop}
          className={`bg-white rounded-lg shadow-lg border border-slate-200 min-h-96 relative ${
            isOver ? "border-blue-400 bg-blue-50" : ""
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClearSelection();
            }
          }}
        >
          {/* Drop Zone Indicator */}
          {isOver && (
            <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center z-10">
              <div className="text-center">
                <Plus className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">Drop component here</p>
              </div>
            </div>
          )}

          {/* Components */}
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Plus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 font-medium text-lg">Start building your page</p>
                <p className="text-slate-400 text-sm mt-1">
                  Drag components from the sidebar to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {components.map((component) => {
                const ComponentRenderer = componentRegistry[component.type];
                if (!ComponentRenderer) return null;

                return (
                  <div
                    key={component.id}
                    className={`relative group cursor-pointer transition-all ${
                      selectedComponent === component.id
                        ? "ring-2 ring-blue-500"
                        : "hover:ring-2 hover:ring-blue-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectComponent(component.id);
                    }}
                  >
                    {/* Component Toolbar */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-md shadow-sm">
                        <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-l">
                          <i className="fas fa-cog text-xs"></i>
                        </button>
                        <button className="p-2 hover:bg-slate-100 text-slate-600">
                          <i className="fas fa-copy text-xs"></i>
                        </button>
                        <button className="p-2 hover:bg-slate-100 text-red-500 rounded-r">
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <ComponentRenderer properties={component.properties} />
                  </div>
                );
              })}

              {/* Drop zone for additional components */}
              <div className="h-20 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors m-4">
                <Plus className="h-5 w-5 mr-2" />
                <span>Drop components here or click to add</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
