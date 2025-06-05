import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Sliders, MousePointer, Palette, AlignHorizontalSpaceBetween, Type, Image, Trash2 } from 'lucide-react';
import type { TemplateComponent } from '@/types/template';

interface PropertiesPanelProps {
  selectedComponent: TemplateComponent | null;
  onComponentUpdate: (componentId: string, updates: Partial<TemplateComponent>) => void;
  onComponentDelete: (componentId: string) => void;
}

export function PropertiesPanel({
  selectedComponent,
  onComponentUpdate,
  onComponentDelete
}: PropertiesPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-background border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Sliders className="w-5 h-5 mr-2" />
            Properties
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <MousePointer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select a component to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  const updateProps = (key: string, value: any) => {
    onComponentUpdate(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [key]: value
      }
    });
  };

  const updateStyle = (key: string, value: any) => {
    onComponentUpdate(selectedComponent.id, {
      style: {
        ...selectedComponent.style,
        [key]: value
      }
    });
  };

  return (
    <div className="w-80 bg-background border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Sliders className="w-5 h-5 mr-2" />
          Properties
        </h2>
        <div className="flex items-center mt-2">
          <Badge variant="outline" className="mr-2">
            {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Component-specific properties */}
        {selectedComponent.type === 'navbar' && (
          <NavbarProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {selectedComponent.type === 'hero' && (
          <HeroProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {selectedComponent.type === 'gallery' && (
          <GalleryProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {selectedComponent.type === 'contact' && (
          <ContactProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {selectedComponent.type === 'faq' && (
          <FaqProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {selectedComponent.type === 'footer' && (
          <FooterProperties
            component={selectedComponent}
            updateProps={updateProps}
            updateStyle={updateStyle}
          />
        )}

        {/* General Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="componentId">Component ID</Label>
              <Input
                id="componentId"
                value={selectedComponent.id}
                disabled
                className="text-xs"
              />
            </div>
            
            <div>
              <Label htmlFor="cssClasses">CSS Classes</Label>
              <Input
                id="cssClasses"
                placeholder="custom-class another-class"
                value={selectedComponent.style?.className || ''}
                onChange={(e) => updateStyle('className', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Responsive Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Responsive</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hideOnMobile">Hide on Mobile</Label>
              <Switch
                id="hideOnMobile"
                checked={selectedComponent.style?.hideOnMobile || false}
                onCheckedChange={(checked) => updateStyle('hideOnMobile', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="hideOnTablet">Hide on Tablet</Label>
              <Switch
                id="hideOnTablet"
                checked={selectedComponent.style?.hideOnTablet || false}
                onCheckedChange={(checked) => updateStyle('hideOnTablet', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => onComponentDelete(selectedComponent.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Component
        </Button>
      </div>
    </div>
  );
}

// Component-specific property panels
function NavbarProperties({ component, updateProps }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={component.props.siteName || ''}
            onChange={(e) => updateProps('siteName', e.target.value)}
            placeholder="Your Site"
          />
        </div>
        
        <div>
          <Label htmlFor="menuItems">Menu Items (comma-separated)</Label>
          <Input
            id="menuItems"
            value={component.props.menuItems?.join(', ') || ''}
            onChange={(e) => updateProps('menuItems', e.target.value.split(',').map((s: string) => s.trim()))}
            placeholder="Home, About, Services, Contact"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function HeroProperties({ component, updateProps }: any) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Main Title</Label>
            <Input
              id="title"
              value={component.props.title || ''}
              onChange={(e) => updateProps('title', e.target.value)}
              placeholder="Welcome to Our Site"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={component.props.subtitle || ''}
              onChange={(e) => updateProps('subtitle', e.target.value)}
              placeholder="Create amazing experiences..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="buttonText">Button Text</Label>
            <Input
              id="buttonText"
              value={component.props.buttonText || ''}
              onChange={(e) => updateProps('buttonText', e.target.value)}
              placeholder="Get Started"
            />
          </div>
          
          <div>
            <Label htmlFor="buttonLink">Button Link</Label>
            <Input
              id="buttonLink"
              value={component.props.buttonLink || ''}
              onChange={(e) => updateProps('buttonLink', e.target.value)}
              placeholder="#"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Styling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="background">Background</Label>
            <Input
              id="background"
              value={component.props.background || ''}
              onChange={(e) => updateProps('background', e.target.value)}
              placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          </div>
          
          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={component.props.textColor || '#ffffff'}
                onChange={(e) => updateProps('textColor', e.target.value)}
                className="w-10 h-10 border border-border rounded"
              />
              <Input
                value={component.props.textColor || '#ffffff'}
                onChange={(e) => updateProps('textColor', e.target.value)}
                placeholder="#ffffff"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function GalleryProperties({ component, updateProps }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Image className="w-4 h-4 mr-2" />
          Gallery Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="galleryTitle">Title</Label>
          <Input
            id="galleryTitle"
            value={component.props.title || ''}
            onChange={(e) => updateProps('title', e.target.value)}
            placeholder="Our Gallery"
          />
        </div>
        
        <div>
          <Label htmlFor="columns">Columns</Label>
          <Input
            id="columns"
            type="number"
            min="1"
            max="6"
            value={component.props.columns || 3}
            onChange={(e) => updateProps('columns', parseInt(e.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ContactProperties({ component, updateProps }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="contactTitle">Title</Label>
          <Input
            id="contactTitle"
            value={component.props.title || ''}
            onChange={(e) => updateProps('title', e.target.value)}
            placeholder="Contact Us"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={component.props.address || ''}
            onChange={(e) => updateProps('address', e.target.value)}
            placeholder="123 Business St, City, State 12345"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={component.props.phone || ''}
            onChange={(e) => updateProps('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={component.props.email || ''}
            onChange={(e) => updateProps('email', e.target.value)}
            placeholder="contact@example.com"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function FaqProperties({ component, updateProps }: any) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const items = component.props.items || [];

  const addFaqItem = () => {
    if (newQuestion.trim()) {
      const newItems = [...items, { question: newQuestion, answer: newAnswer }];
      updateProps('items', newItems);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const removeFaqItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    updateProps('items', newItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">FAQ Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="faqTitle">Title</Label>
          <Input
            id="faqTitle"
            value={component.props.title || ''}
            onChange={(e) => updateProps('title', e.target.value)}
            placeholder="Frequently Asked Questions"
          />
        </div>

        <Separator />

        <div>
          <Label>FAQ Items</Label>
          <div className="space-y-2 mt-2">
            {items.map((item: any, index: number) => (
              <div key={index} className="p-2 border border-border rounded">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.question}</p>
                    {item.answer && (
                      <p className="text-xs text-muted-foreground">{item.answer}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFaqItem(index)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Textarea
            placeholder="Answer (optional)"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            rows={2}
          />
          <Button size="sm" onClick={addFaqItem} className="w-full">
            Add FAQ Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FooterProperties({ component, updateProps }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Footer Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="copyright">Copyright Text</Label>
          <Input
            id="copyright"
            value={component.props.copyright || ''}
            onChange={(e) => updateProps('copyright', e.target.value)}
            placeholder="© 2024 Your Site. All rights reserved."
          />
        </div>
        
        <div>
          <Label htmlFor="footerAddress">Address</Label>
          <Input
            id="footerAddress"
            value={component.props.address || ''}
            onChange={(e) => updateProps('address', e.target.value)}
            placeholder="123 Business St, City, State 12345"
          />
        </div>
        
        <div>
          <Label htmlFor="footerPhone">Phone</Label>
          <Input
            id="footerPhone"
            value={component.props.phone || ''}
            onChange={(e) => updateProps('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <Label htmlFor="footerEmail">Email</Label>
          <Input
            id="footerEmail"
            type="email"
            value={component.props.email || ''}
            onChange={(e) => updateProps('email', e.target.value)}
            placeholder="contact@example.com"
          />
        </div>
      </CardContent>
    </Card>
  );
}
