'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Copy,
  Edit,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import * as React from 'react';

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    name: 'Software Engineer Job Description',
    category: 'Job Descriptions',
    description: 'Standard job description for a software engineer role.',
    lastUpdated: '2024-10-15',
    tags: ['Engineering', 'Development'],
    content: 'We are seeking a talented Software Engineer...',
    version: 1,
    usageCount: 15,
  },
  {
    id: 2,
    name: 'Interview Invitation Email',
    category: 'Emails',
    description: 'Template for inviting candidates to an interview.',
    lastUpdated: '2024-10-14',
    tags: ['Interview', 'Communication'],
    content: 'Dear [Candidate Name], We are pleased to invite you...',
    version: 2,
    usageCount: 30,
  },
  {
    id: 3,
    name: 'Frontend Developer Interview Questions',
    category: 'Interview Questions',
    description:
      'Set of technical questions for frontend developer interviews.',
    lastUpdated: '2024-10-13',
    tags: ['Frontend', 'Technical'],
    content: '1. What is the difference between let and var?...',
    version: 1,
    usageCount: 10,
  },
  {
    id: 4,
    name: 'Onboarding Checklist',
    category: 'Task Templates',
    description: 'Checklist for new employee onboarding process.',
    lastUpdated: '2024-10-12',
    tags: ['Onboarding', 'HR'],
    content:
      '[ ] Set up company email\n[ ] Provide access to necessary tools...',
    version: 3,
    usageCount: 25,
  },
];

const categories = [
  'Job Descriptions',
  'Emails',
  'Interview Questions',
  'Task Templates',
];

export default function EnhancedTemplateLibrary() {
  const [templates, setTemplates] = React.useState(mockTemplates);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] =
    React.useState('Job Descriptions');
  const [isAddingTemplate, setIsAddingTemplate] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState(null);
  const [newTemplate, setNewTemplate] = React.useState({
    name: '',
    category: '',
    description: '',
    content: '',
    tags: [],
  });
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [previewTemplate, setPreviewTemplate] = React.useState(null);
  const { toast } = useToast();

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === 'All' || template.category === selectedCategory) &&
      (searchTerm === '' ||
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        )) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => template.tags.includes(tag))),
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.category && newTemplate.content) {
      setTemplates([
        ...templates,
        {
          ...newTemplate,
          id: templates.length + 1,
          lastUpdated: new Date().toISOString().split('T')[0],
          version: 1,
          usageCount: 0,
        },
      ]);
      setNewTemplate({
        name: '',
        category: '',
        description: '',
        content: '',
        tags: [],
      });
      setIsAddingTemplate(false);
      toast({
        title: 'Success',
        description: 'New template added successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
    }
  };

  const handleEditTemplate = (template) => {
    const updatedTemplates = templates.map((t) =>
      t.id === template.id
        ? {
            ...template,
            lastUpdated: new Date().toISOString().split('T')[0],
            version: t.version + 1,
          }
        : t,
    );
    setTemplates(updatedTemplates);
    setEditingTemplate(null);
    toast({
      title: 'Success',
      description: 'Template updated successfully.',
    });
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((t) => t.id !== id));
    toast({
      title: 'Success',
      description: 'Template deleted successfully.',
    });
  };

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Job Descriptions':
        return <FileText className="h-4 w-4" />;
      case 'Emails':
        return <Mail className="h-4 w-4" />;
      case 'Interview Questions':
        return <MessageSquare className="h-4 w-4" />;
      case 'Task Templates':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const allTags = Array.from(new Set(templates.flatMap((t) => t.tags)));

  return (
    <div className="flex h-screen overflow-hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="fixed right-4 top-4">
            Quick Access
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          <h2 className="mb-4 text-lg font-semibold">Quick Access</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="recent">
              <AccordionTrigger>Recently Used</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {templates
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .slice(0, 5)
                    .map((template) => (
                      <li
                        key={template.id}
                        className="rounded p-1 text-sm hover:bg-gray-200"
                      >
                        <button
                          onClick={() => setPreviewTemplate(template)}
                          className="w-full text-left"
                        >
                          {template.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="favorites">
              <AccordionTrigger>Favorites</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {templates
                    .filter((t) => t.usageCount > 20)
                    .map((template) => (
                      <li
                        key={template.id}
                        className="rounded p-1 text-sm hover:bg-gray-200"
                      >
                        <button
                          onClick={() => setPreviewTemplate(template)}
                          className="w-full text-left"
                        >
                          {template.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
      <div className="w-full overflow-y-auto">
        <div className="container mx-auto p-4">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Template Library</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filter by Category <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setSelectedCategory('All')}>
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={isAddingTemplate}
                onOpenChange={setIsAddingTemplate}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Template</DialogTitle>
                    <DialogDescription>
                      Create a new template for your library.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newTemplate.name}
                        onChange={(e) =>
                          setNewTemplate({
                            ...newTemplate,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <select
                        id="category"
                        value={newTemplate.category}
                        onChange={(e) =>
                          setNewTemplate({
                            ...newTemplate,
                            category: e.target.value,
                          })
                        }
                        className="col-span-3"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newTemplate.description}
                        onChange={(e) =>
                          setNewTemplate({
                            ...newTemplate,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content" className="text-right">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        value={newTemplate.content}
                        onChange={(e) =>
                          setNewTemplate({
                            ...newTemplate,
                            content: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tags" className="text-right">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        placeholder="Enter tags separated by commas"
                        value={newTemplate.tags.join(', ')}
                        onChange={(e) =>
                          setNewTemplate({
                            ...newTemplate,
                            tags: e.target.value
                              .split(',')
                              .map((tag) => tag.trim()),
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddTemplate}>
                      Add Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="mb-4">
            <Label>Filter by Tags:</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'All' ? 'All Templates' : selectedCategory}
            </h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="preview-mode">Preview Mode</Label>
              <Switch
                id="preview-mode"
                checked={showPreview}
                onCheckedChange={setShowPreview}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{template.name}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Star
                              className="h-4 w-4"
                              fill={template.usageCount > 20 ? 'gold' : 'none'}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Used {template.usageCount} times</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-2 text-sm text-gray-500">
                    {template.description}
                  </p>
                  {showPreview && (
                    <ScrollArea className="h-40 w-full rounded-md border p-2">
                      <pre className="text-sm">{template.content}</pre>
                    </ScrollArea>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    Last updated: {template.lastUpdated}
                  </div>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPreviewTemplate(template)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preview</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newTemplate = {
                                ...template,
                                id: templates.length + 1,
                                name: `${template.name} (Copy)`,
                                version: 1,
                                usageCount: 0,
                              };
                              setTemplates([...templates, newTemplate]);
                              toast({
                                title: 'Success',
                                description:
                                  'Template duplicated successfully.',
                              });
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duplicate</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {previewTemplate && (
        <Dialog
          open={!!previewTemplate}
          onOpenChange={() => setPreviewTemplate(null)}
        >
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{previewTemplate.name}</DialogTitle>
              <DialogDescription>
                Category: {previewTemplate.category} | Version:{' '}
                {previewTemplate.version}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="whitespace-pre-wrap text-sm">
                {previewTemplate.content}
              </pre>
            </ScrollArea>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPreviewTemplate(null)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setEditingTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
              >
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingTemplate && (
        <Dialog
          open={!!editingTemplate}
          onOpenChange={() => setEditingTemplate(null)}
        >
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
              <DialogDescription>
                Make changes to your template here. Click save when you{"'"}re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingTemplate.description}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={editingTemplate.content}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      content: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="edit-tags"
                  value={editingTemplate.tags.join(', ')}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      tags: e.target.value.split(',').map((tag) => tag.trim()),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingTemplate(null)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleEditTemplate(editingTemplate)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
