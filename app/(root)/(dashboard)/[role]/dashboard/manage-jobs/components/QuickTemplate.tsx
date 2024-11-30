import { Check, FireExtinguisher, Search, Star } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../../../../../../../components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../../../../../components/ui/drawer';

const templates = [
  {
    id: 1,
    title: 'Offer Letter Template',
    description: 'Standard offer letter for new hires',
    tags: ['HR', 'Hiring'],
    category: 'hiring',
  },
  {
    id: 2,
    title: 'Rejection Email',
    description: 'Professional rejection email for candidates',
    tags: ['HR', 'Communication'],
    category: 'communication',
  },
  {
    id: 3,
    title: 'Interview Invitation',
    description: 'Template for scheduling interviews',
    tags: ['HR', 'Interview'],
    category: 'interview',
  },
  {
    id: 4,
    title: 'Task Assignment',
    description: 'Standard task assignment template',
    tags: ['Management', 'Tasks'],
    category: 'tasks',
  },
  {
    id: 5,
    title: 'Welcome Email',
    description: 'Welcome email for new team members',
    tags: ['HR', 'Onboarding'],
    category: 'onboarding',
  },
];

export function QuickTemplate() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="bg-theme1 font-semibold text-white"
        >
          <FireExtinguisher />
          Quick Template
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-[400px] p-4">
          <DrawerHeader>
            <DrawerTitle className="text-black"> Quick Template</DrawerTitle>
            <DialogDescription>
              Choose from our collection of pre-written templates for various
              purposes.
            </DialogDescription>
          </DrawerHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <Search className="text-muted-foreground h-4 w-4" />
              <Input placeholder="Search templates..." className="flex-1" />
            </div>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hiring">Hiring</TabsTrigger>
                <TabsTrigger value="communication">Emails</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="group relative">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <CardTitle className="text-base">
                                {template.title}
                              </CardTitle>
                              <CardDescription>
                                {template.description}
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            {template.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-auto gap-2"
                            >
                              <Check className="h-3 w-3" /> Use Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="hiring" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {templates
                      .filter((t) => t.category === 'hiring')
                      .map((template) => (
                        <Card key={template.id} className="group relative">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <CardTitle className="text-base">
                                  {template.title}
                                </CardTitle>
                                <CardDescription>
                                  {template.description}
                                </CardDescription>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                              >
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              {template.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-auto gap-2"
                              >
                                <Check className="h-3 w-3" /> Use Template
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              {/* Similar TabsContent for other categories */}
            </Tabs>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
