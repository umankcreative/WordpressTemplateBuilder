import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "@/components/template-builder/sidebar";
import Canvas from "@/components/template-builder/canvas";
import PropertiesPanel from "@/components/template-builder/properties-panel";
import CodeEditor from "@/components/template-builder/code-editor";
import ExportModal from "@/components/template-builder/export-modal";
import PreviewModal from "@/components/template-builder/preview-modal";
import { Button } from "@/components/ui/button";
import { useTemplateBuilder } from "@/hooks/use-template-builder";
import { Eye, Code, Download, Monitor, Tablet, Smartphone } from "lucide-react";

export default function TemplateBuilder() {
  const {
    currentView,
    setCurrentView,
    selectedComponent,
    components,
    currentBreakpoint,
    setCurrentBreakpoint,
    addComponent,
    updateComponent,
    deleteComponent,
    copyComponent,
    selectComponent,
    clearSelection,
  } = useTemplateBuilder();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const getBreakpointIcon = (breakpoint: string) => {
    switch (breakpoint) {
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getBreakpointStyles = (breakpoint: string) => {
    switch (breakpoint) {
      case "tablet":
        return { maxWidth: "768px" };
      case "mobile":
        return { maxWidth: "375px" };
      default:
        return { maxWidth: "100%" };
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex bg-slate-50 font-inter">
        {/* Sidebar */}
        <Sidebar onAddComponent={addComponent} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-slate-900">
                  <i className="fas fa-wordpress text-blue-600 mr-2"></i>
                  WP Template Builder
                </h1>
              </div>

              {/* Device Preview Controls */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={currentBreakpoint === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentBreakpoint("desktop")}
                  className="h-8"
                >
                  {getBreakpointIcon("desktop")}
                </Button>
                <Button
                  variant={currentBreakpoint === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentBreakpoint("tablet")}
                  className="h-8"
                >
                  {getBreakpointIcon("tablet")}
                </Button>
                <Button
                  variant={currentBreakpoint === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentBreakpoint("mobile")}
                  className="h-8"
                >
                  {getBreakpointIcon("mobile")}
                </Button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={currentView === "visual" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("visual")}
                  className="h-8"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Visual
                </Button>
                <Button
                  variant={currentView === "code" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("code")}
                  className="h-8"
                >
                  <Code className="h-4 w-4 mr-1" />
                  Code
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={() => setShowExportModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export Template
              </Button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Canvas Area */}
            <div className="flex-1 bg-slate-100">
              {currentView === "visual" ? (
                <Canvas
                  components={components}
                  selectedComponent={selectedComponent}
                  breakpointStyles={getBreakpointStyles(currentBreakpoint)}
                  onAddComponent={addComponent}
                  onSelectComponent={selectComponent}
                  onClearSelection={clearSelection}
                />
              ) : (
                <CodeEditor components={components} />
              )}
            </div>

            {/* Properties Panel */}
            {currentView === "visual" && (
              <PropertiesPanel
                selectedComponent={selectedComponent}
                onUpdateComponent={updateComponent}
                onDeleteComponent={deleteComponent}
                onCopyComponent={copyComponent}
              />
            )}
          </div>
        </div>

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          components={components}
        />

        {/* Preview Modal */}
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          components={components}
        />
      </div>
    </DndProvider>
  );
}
