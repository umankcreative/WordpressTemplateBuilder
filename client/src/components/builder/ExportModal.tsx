import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import type { TemplateSettings } from '@/types/template';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (settings: TemplateSettings) => Promise<void>;
  currentSettings: TemplateSettings;
  isExporting: boolean;
}

export function ExportModal({
  isOpen,
  onClose,
  onExport,
  currentSettings,
  isExporting
}: ExportModalProps) {
  const [settings, setSettings] = useState<TemplateSettings>(currentSettings);
  const [includeFiles, setIncludeFiles] = useState({
    templates: true,
    styles: true,
    functions: true,
    assets: false,
  });

  const handleExport = async () => {
    try {
      await onExport(settings);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const updateSetting = (key: keyof TemplateSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export WordPress Template
          </DialogTitle>
          <DialogDescription>
            Configure your template settings and download as a ZIP file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template Name */}
          <div>
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              value={settings.name}
              onChange={(e) => updateSetting('name', e.target.value)}
              placeholder="My Custom Theme"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => updateSetting('description', e.target.value)}
              placeholder="A beautiful custom WordPress theme..."
              rows={3}
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={settings.author || ''}
              onChange={(e) => updateSetting('author', e.target.value)}
              placeholder="Your Name"
            />
          </div>

          {/* Version */}
          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={settings.version}
              onChange={(e) => updateSetting('version', e.target.value)}
              placeholder="1.0.0"
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={settings.tags?.join(', ') || ''}
              onChange={(e) => updateSetting('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
              placeholder="responsive, modern, business"
            />
          </div>

          {/* Include Files */}
          <div>
            <Label>Include Files</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="templates"
                  checked={includeFiles.templates}
                  onCheckedChange={(checked) => 
                    setIncludeFiles(prev => ({ ...prev, templates: !!checked }))
                  }
                />
                <Label htmlFor="templates" className="text-sm">
                  Template PHP files (.php)
                </Label>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="styles"
                  checked={includeFiles.styles}
                  onCheckedChange={(checked) => 
                    setIncludeFiles(prev => ({ ...prev, styles: !!checked }))
                  }
                />
                <Label htmlFor="styles" className="text-sm">
                  Stylesheets (.css)
                </Label>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="functions"
                  checked={includeFiles.functions}
                  onCheckedChange={(checked) => 
                    setIncludeFiles(prev => ({ ...prev, functions: !!checked }))
                  }
                />
                <Label htmlFor="functions" className="text-sm">
                  Functions file (functions.php)
                </Label>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assets"
                  checked={includeFiles.assets}
                  onCheckedChange={(checked) => 
                    setIncludeFiles(prev => ({ ...prev, assets: !!checked }))
                  }
                />
                <Label htmlFor="assets" className="text-sm">
                  Assets folder (images, fonts)
                </Label>
                <Badge variant="secondary" className="text-xs">Optional</Badge>
              </div>
            </div>
          </div>

          {/* Export Info */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Export will include:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• WordPress theme structure</li>
              <li>• Generated PHP template files</li>
              <li>• CSS styles and theme setup</li>
              <li>• WordPress Customizer integration</li>
              <li>• Responsive design support</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export ZIP
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
