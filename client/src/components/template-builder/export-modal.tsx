import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Component } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: Component[];
}

export default function ExportModal({ isOpen, onClose, components }: ExportModalProps) {
  const [templateName, setTemplateName] = useState("my-custom-template");
  const [description, setDescription] = useState("A beautiful custom WordPress theme created with the template builder.");
  const [author, setAuthor] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [includeFiles, setIncludeFiles] = useState({
    php: true,
    css: true,
    functions: true,
    assets: false,
  });

  const { toast } = useToast();

  const exportMutation = useMutation({
    mutationFn: async () => {
      // Create a temporary template for export
      const templateData = {
        name: templateName,
        description,
        author,
        version,
        pages: [
          {
            name: "Home",
            slug: "index",
            components,
            isHomePage: true,
          },
        ],
      };

      const templateResponse = await apiRequest("POST", "/api/templates", templateData);
      const template = await templateResponse.json();

      // Export the template
      const exportResponse = await apiRequest("POST", `/api/templates/${template.id}/export`);
      
      if (exportResponse.ok) {
        // Create download link
        const blob = await exportResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      
      return template;
    },
    onSuccess: () => {
      toast({
        title: "Export Successful",
        description: "Your WordPress template has been downloaded successfully!",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your template. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExport = () => {
    exportMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export WordPress Template
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="my-custom-template"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your template"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
            />
          </div>

          <div>
            <Label className="text-base font-medium">Include Files</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-php"
                  checked={includeFiles.php}
                  onCheckedChange={(checked) =>
                    setIncludeFiles((prev) => ({ ...prev, php: checked === true }))
                  }
                />
                <Label htmlFor="include-php" className="text-sm">
                  Template PHP files
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-css"
                  checked={includeFiles.css}
                  onCheckedChange={(checked) =>
                    setIncludeFiles((prev) => ({ ...prev, css: checked === true }))
                  }
                />
                <Label htmlFor="include-css" className="text-sm">
                  CSS styles
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-functions"
                  checked={includeFiles.functions}
                  onCheckedChange={(checked) =>
                    setIncludeFiles((prev) => ({ ...prev, functions: checked === true }))
                  }
                />
                <Label htmlFor="include-functions" className="text-sm">
                  Functions.php
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-assets"
                  checked={includeFiles.assets}
                  onCheckedChange={(checked) =>
                    setIncludeFiles((prev) => ({ ...prev, assets: checked === true }))
                  }
                />
                <Label htmlFor="include-assets" className="text-sm">
                  Assets folder
                </Label>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-2">Export will include:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                style.css with theme information
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                index.php template file
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                functions.php with theme functions
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                header.php and footer.php
              </li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="flex-1"
          >
            {exportMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
