import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentLibrary from "./component-library";
import { Plus, File, Copy, Trash2 } from "lucide-react";

interface SidebarProps {
  onAddComponent: (type: string) => void;
}

export default function Sidebar({ onAddComponent }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("Home");

  const pages = [
    { name: "Home", isActive: true },
    { name: "About", isActive: false },
    { name: "Contact", isActive: false },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900 mb-3">Components</h2>
        <Input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        {/* Components Tab */}
        <TabsContent value="components" className="flex-1 overflow-y-auto p-4 mt-0">
          <ComponentLibrary searchTerm={searchTerm} onAddComponent={onAddComponent} />
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="flex-1 overflow-y-auto p-4 mt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Pages</h3>
              <Button size="sm" variant="outline" className="h-8">
                <Plus className="h-3 w-3 mr-1" />
                New
              </Button>
            </div>

            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    page.isActive
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4 text-slate-500" />
                      <span className={`text-sm font-medium ${
                        page.isActive ? "text-blue-700" : "text-slate-700"
                      }`}>
                        {page.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
