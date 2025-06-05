import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Code, 
  Save, 
  Download,
  Plus
} from 'lucide-react';
import { TemplateComponent } from './TemplateComponent';
import { CodeEditor } from './CodeEditor';
import type { ViewMode, DeviceMode, TemplateComponent as TemplateComponentType } from '@/types/template';

interface CanvasAreaProps {
  components: TemplateComponentType[];
  selectedComponent: string | null;
  viewMode: ViewMode;
  deviceMode: DeviceMode;
  onComponentSelect: (componentId: string | null) => void;
  onComponentAdd: (componentType: string) => void;
  onComponentUpdate: (componentId: string, updates: Partial<TemplateComponentType>) => void;
  onComponentDelete: (componentId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onDeviceModeChange: (mode: DeviceMode) => void;
  onSave: () => void;
  onExport: () => void;
  isSaving: boolean;
  isExporting: boolean;
  currentPageName: string;
}

export function CanvasArea({
  components,
  selectedComponent,
  viewMode,
  deviceMode,
  onComponentSelect,
  onComponentAdd,
  onComponentUpdate,
  onComponentDelete,
  onViewModeChange,
  onDeviceModeChange,
  onSave,
  onExport,
  isSaving,
  isExporting,
  currentPageName
}: CanvasAreaProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { componentType: string }) => {
      onComponentAdd(item.componentType);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
      default:
        return '100%';
    }
  };

  const getDeviceMaxWidth = () => {
    switch (deviceMode) {
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
      default:
        return '1200px';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-900">
      {/* Top Toolbar */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Current Page:</span>
              <Badge variant="outline" className="text-primary">
                {currentPageName}
              </Badge>
            </div>
            
            {/* Device Preview Buttons */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onDeviceModeChange('desktop')}
              >
                <Monitor className="w-4 h-4 mr-1" />
                Desktop
              </Button>
              <Button
                variant={deviceMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onDeviceModeChange('tablet')}
              >
                <Tablet className="w-4 h-4 mr-1" />
                Tablet
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onDeviceModeChange('mobile')}
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'visual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('visual')}
              >
                <Eye className="w-4 h-4 mr-1" />
                Visual
              </Button>
              <Button
                variant={viewMode === 'code' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('code')}
              >
                <Code className="w-4 h-4 mr-1" />
                Code
              </Button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              onClick={onSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            <Button
              onClick={onExport}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export ZIP'}
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-auto">
        {viewMode === 'visual' ? (
          <div className="max-w-full mx-auto">
            {/* Device Frame */}
            <div
              className="bg-background rounded-lg shadow-lg border border-border mx-auto transition-all duration-300"
              style={{
                width: getDeviceWidth(),
                maxWidth: getDeviceMaxWidth(),
              }}
            >
              {/* Canvas Content */}
              <div
                ref={drop}
                className={`min-h-screen bg-background rounded-lg relative ${
                  isOver && canDrop ? 'bg-primary/5 border-2 border-dashed border-primary' : ''
                }`}
                onClick={() => onComponentSelect(null)}
              >
                {components.length === 0 ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <Plus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Start Building Your Template
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag components from the sidebar to get started
                      </p>
                    </div>
                  </div>
                ) : (
                  components.map((component, index) => (
                    <TemplateComponent
                      key={component.id}
                      component={component}
                      isSelected={selectedComponent === component.id}
                      onSelect={() => onComponentSelect(component.id)}
                      onUpdate={(updates) => onComponentUpdate(component.id, updates)}
                      onDelete={() => onComponentDelete(component.id)}
                      index={index}
                    />
                  ))
                )}

                {/* Drop Zone Indicator */}
                {isOver && canDrop && (
                  <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center pointer-events-none">
                    <div className="text-primary font-medium">
                      Drop component here
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CodeEditor components={components} />
        )}
      </div>
    </div>
  );
}
