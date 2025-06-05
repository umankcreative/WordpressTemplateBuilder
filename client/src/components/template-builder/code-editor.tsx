import { useState } from "react";
import { Component } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateWordPressCode } from "@/lib/template-generator";
import { Save, FileCode } from "lucide-react";

interface CodeEditorProps {
  components: Component[];
}

export default function CodeEditor({ components }: CodeEditorProps) {
  const [currentFile, setCurrentFile] = useState("index.php");

  const codeFiles = generateWordPressCode(components);

  const getLanguageForFile = (filename: string) => {
    if (filename.endsWith(".php")) return "php";
    if (filename.endsWith(".css")) return "css";
    if (filename.endsWith(".js")) return "javascript";
    return "text";
  };

  return (
    <div className="h-full bg-slate-900 text-gray-100 flex flex-col">
      {/* Code Editor Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="font-semibold flex items-center">
            <FileCode className="h-4 w-4 mr-2" />
            Template Code
          </h3>
          <Select value={currentFile} onValueChange={setCurrentFile}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(codeFiles).map((filename) => (
                <SelectItem key={filename} value={filename}>
                  {filename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Apply Changes
        </Button>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code className={`language-${getLanguageForFile(currentFile)}`}>
            {codeFiles[currentFile] || "// File not found"}
          </code>
        </pre>
      </div>

      {/* Code Editor Footer */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span>Language: {getLanguageForFile(currentFile).toUpperCase()}</span>
          <span>Lines: {(codeFiles[currentFile] || "").split('\n').length}</span>
        </div>
      </div>
    </div>
  );
}
