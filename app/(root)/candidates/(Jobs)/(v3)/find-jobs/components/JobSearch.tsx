'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ChevronDown, Info, MapPin, Search } from 'lucide-react';
import * as React from 'react';

export default function JobSearch() {
  const [selectedFilters, setSelectedFilters] = React.useState<{
    remote: string[];
    jobType: string[];
    schedule: string[];
    careerLevel: string[];
  }>({
    remote: [],
    jobType: [],
    schedule: [],
    careerLevel: [],
  });

  const filterOptions = {
    remote: ['Remote', 'Hybrid', 'On-site'],
    jobType: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    schedule: ['Weekday', 'Weekend', 'Evening', 'Overnight', 'Flexible'],
    careerLevel: [
      'Entry Level',
      'Mid Level',
      'Senior Level',
      'Director',
      'Executive',
    ],
  };

  const handleFilterSelect = (
    category: keyof typeof selectedFilters,
    value: string,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const totalFilters = Object.values(selectedFilters).flat().length;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 text-white">
      <div className="grid gap-2 md:grid-cols-[1fr,1fr,auto]">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search by job title, keyword, etc."
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input placeholder="Location" className="pl-10" />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="hidden items-center gap-2 md:flex">
                Tips
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use specific keywords to find relevant jobs</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(filterOptions).map(([category, options]) => (
          <DropdownMenu key={category}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {category.replace(/([A-Z])/g, ' $1').trim()}
                <ChevronDown className="h-4 w-4" />
                {selectedFilters[category as keyof typeof selectedFilters]
                  .length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {
                      selectedFilters[category as keyof typeof selectedFilters]
                        .length
                    }
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  className="flex items-center gap-2"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleFilterSelect(
                      category as keyof typeof selectedFilters,
                      option,
                    );
                  }}
                >
                  <div
                    className={cn(
                      'h-4 w-4 rounded-sm border',
                      selectedFilters[
                        category as keyof typeof selectedFilters
                      ].includes(option) && 'bg-primary border-primary',
                    )}
                  />
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link" className="text-primary font-medium">
              More Filters
              {totalFilters > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {totalFilters}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            className="z-[1050] max-h-screen overflow-y-auto bg-gray-900 text-white" // Ensure high z-index and scrollability
          >
            <SheetHeader>
              <SheetTitle>All Filters</SheetTitle>
              <SheetDescription>
                Apply additional filters to refine your job search
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className={cn(
                          'justify-start',
                          selectedFilters[
                            category as keyof typeof selectedFilters
                          ].includes(option) && 'bg-primary/10',
                        )}
                        onClick={() =>
                          handleFilterSelect(
                            category as keyof typeof selectedFilters,
                            option,
                          )
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
