import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Navigation, 
  Star, 
  Images, 
  Mail, 
  HelpCircle, 
  Minus,
  Heading,
  Plus,
  Copy,
  Trash2,
  GripVertical
} from 'lucide-react';
import type { ComponentType, TemplatePage } from '@/types/template';

const COMPONENT_TYPES: ComponentType[] = [
  {
    id: 'navbar',
    name: 'Navigation Bar',
    type: 'navbar',
    icon: 'Navigation',
    description: 'Heading navigation menu',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'header',
    name: 'Heading',
    type: 'header',
    icon: 'Heading',
    description: 'Page header section',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'hero',
    name: 'Hero Section',
    type: 'hero',
    icon: 'Star',
    description: 'Main banner area',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'gallery',
    name: 'Gallery',
    type: 'gallery',
    icon: 'Images',
    description: 'Image showcase grid',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'contact',
    name: 'Contact Form',
    type: 'contact',
    icon: 'Mail',
    description: 'Contact information',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    type: 'faq',
    icon: 'HelpCircle',
    description: 'Frequently asked questions',
    defaultProps: {},
    propertySchema: []
  },
  {
    id: 'footer',
    name: 'Footer',
    type: 'footer',
    icon: 'Minus',
    description: 'Bottom page section',
    defaultProps: {},
    propertySchema: []
  }
];

interface ComponentSidebarProps {
  pages: TemplatePage[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  onAddPage: (name: string) => void;
  onDeletePage: (pageId: string) => void;
}

function DraggableComponent({ component }: { component: ComponentType }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type: 'component', componentType: component.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const IconComponent = {
    Navigation,
    Heading,
    Star,
    Images,
    Mail,
    HelpCircle,
    Minus
  }[component.icon] || Star;

  return (
    <Card
      ref={drag}
      className={`cursor-grab hover:border-primary hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground">{component.name}</div>
            <div className="text-xs text-muted-foreground">{component.description}</div>
          </div>
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ComponentSidebar({ pages, currentPageId, onPageSelect, onAddPage, onDeletePage }: ComponentSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newPageName, setNewPageName] = useState('');

  const filteredComponents = COMPONENT_TYPES.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPage = () => {
    if (newPageName.trim()) {
      onAddPage(newPageName.trim());
      setNewPageName('');
    }
  };

  return (
    <div className="w-80 bg-background border-r border-border flex flex-col">
      {/* Heading */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-foreground">WP Builder</h1>
          <Button variant="ghost" size="sm">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4 mt-4">
            {/* Search */}
            <Input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Components List */}
            <div className="space-y-6">
              {/* Layout Components */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Heading className="w-4 h-4 mr-2 text-muted-foreground" />
                  Layout
                </h3>
                <div className="space-y-2">
                  {filteredComponents
                    .filter(c => ['navbar', 'header', 'footer'].includes(c.type))
                    .map(component => (
                      <DraggableComponent key={component.id} component={component} />
                    ))}
                </div>
              </div>

              {/* Content Components */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-muted-foreground" />
                  Content
                </h3>
                <div className="space-y-2">
                  {filteredComponents
                    .filter(c => ['hero', 'gallery', 'contact', 'faq'].includes(c.type))
                    .map(component => (
                      <DraggableComponent key={component.id} component={component} />
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pages" className="space-y-4 mt-4">
            {/* Add Page */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Pages</h3>
              <Button size="sm" variant="outline" onClick={handleAddPage}>
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>

            {/* New Page Input */}
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Page name..."
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
              />
            </div>

            {/* Pages List */}
            <div className="space-y-2">
              {pages.map(page => (
                <Card
                  key={page.id}
                  className={`cursor-pointer transition-colors ${
                    page.id === currentPageId
                      ? 'border-primary bg-primary/10'
                      : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => onPageSelect(page.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heading className="w-4 h-4 text-muted-foreground" />
                        <span className={`text-sm font-medium ${
                          page.id === currentPageId ? 'text-primary' : 'text-foreground'
                        }`}>
                          {page.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                        {pages.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeletePage(page.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
