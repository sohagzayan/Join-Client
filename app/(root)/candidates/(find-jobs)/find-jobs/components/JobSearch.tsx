'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Bell,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Upload,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FilterState {
  jobType: string[];
  experienceLevel: string[];
  salary: string;
  location: string;
  skills: string[];
  company: string[];
  postedDate: string;
  companyRating: string;
}

export default function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [activeTab, setActiveTab] = useState('search');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    jobType: searchParams.getAll('jobType') || [],
    experienceLevel: searchParams.getAll('experienceLevel') || [],
    salary: searchParams.get('salary') || '',
    location: searchParams.get('location') || '',
    skills: searchParams.getAll('skills') || [],
    company: searchParams.getAll('company') || [],
    postedDate: searchParams.get('postedDate') || '',
    companyRating: searchParams.get('companyRating') || '',
  });

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case 'for-you':
        router.push('/for-you');
        break;
      case 'activity':
        router.push('/activity');
        break;
      default:
        router.push('/');
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (location) params.set('location', location);

    filters.jobType.forEach((type) => params.append('jobType', type));
    filters.experienceLevel.forEach((level) =>
      params.append('experienceLevel', level),
    );
    if (filters.salary) params.set('salary', filters.salary);
    if (filters.postedDate) params.set('postedDate', filters.postedDate);
    if (filters.companyRating)
      params.set('companyRating', filters.companyRating);

    router.push(`?${params.toString()}`);
  }, [searchTerm, location, filters, router]);

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | string[],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        {/* Search Section */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 transition-colors duration-200 hover:bg-gray-100">
                <Search className="h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  className="w-full border-none bg-transparent text-gray-900 outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="flex cursor-pointer items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 transition-colors duration-200 hover:bg-gray-100">
                <MapPin className="h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search your country"
                  value={location}
                  onChange={(e: any) => setLocation(e.target.value)}
                  className="w-[200px]"
                />
              </div>

              <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogTrigger asChild className="">
                  <button className="rounded-xl bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
                    <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Type</label>
                      <Select
                        value={filters.jobType[0]}
                        onValueChange={(value) =>
                          handleFilterChange('jobType', [value])
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Experience Level
                      </label>
                      <Select
                        value={filters.experienceLevel[0]}
                        onValueChange={(value) =>
                          handleFilterChange('experienceLevel', [value])
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Company Rating
                      </label>
                      <Select
                        value={filters.companyRating}
                        onValueChange={(value) =>
                          handleFilterChange('companyRating', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[4, 3, 2, 1].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              <div className="flex items-center">
                                {Array.from({ length: rating }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className="fill-yellow-400 text-yellow-400 h-4 w-4"
                                  />
                                ))}
                                <span className="ml-2">{rating}+ stars</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Posted Date</label>
                      <Select
                        value={filters.postedDate}
                        onValueChange={(value) =>
                          handleFilterChange('postedDate', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="1d">Last day</SelectItem>
                          <SelectItem value="3d">Last 3 days</SelectItem>
                          <SelectItem value="1w">Last week</SelectItem>
                          <SelectItem value="2w">Last 2 weeks</SelectItem>
                          <SelectItem value="1m">Last month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex justify-center gap-4">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground group border-none text-theme1"
            >
              <Upload className="group-hover:text-primary-foreground mr-2 h-4 w-4" />
              Upload your resume - let employers find you
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between border-b">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="activity">Your Activity</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              className="hover:text-primary-foreground group border-none shadow-none"
            >
              <Bell className="group-hover:text-primary-foreground mr-2 h-4 w-4" />
              Create job alert
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              className={cn(
                'rounded-full',
                filters.jobType.includes('easy-apply') && 'bg-accent',
              )}
              onClick={() => {
                const newValue = filters.jobType.includes('easy-apply')
                  ? filters.jobType.filter((t) => t !== 'easy-apply')
                  : [...filters.jobType, 'easy-apply'];
                handleFilterChange('jobType', newValue);
              }}
            >
              Easy Apply only
            </Button>
            <Button
              variant="outline"
              className={cn(
                'rounded-full',
                filters.jobType.includes('remote') && 'bg-accent',
              )}
              onClick={() => {
                const newValue = filters.jobType.includes('remote')
                  ? filters.jobType.filter((t) => t !== 'remote')
                  : [...filters.jobType, 'remote'];
                handleFilterChange('jobType', newValue);
              }}
            >
              Remote only
            </Button>
            <Select
              value={filters.salary}
              onValueChange={(value) => handleFilterChange('salary', value)}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Salary range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50k">$0 - $50k</SelectItem>
                <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                <SelectItem value="100k+">$100k+</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.companyRating}
              onValueChange={(value) =>
                handleFilterChange('companyRating', value)
              }
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Company rating" />
              </SelectTrigger>
              <SelectContent>
                {[4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="fill-yellow-400 text-yellow-400 h-4 w-4"
                        />
                      ))}
                      <span className="ml-2">{rating}+ stars</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.postedDate}
              onValueChange={(value) => handleFilterChange('postedDate', value)}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Date posted" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="1d">Last day</SelectItem>
                <SelectItem value="3d">Last 3 days</SelectItem>
                <SelectItem value="1w">Last week</SelectItem>
                <SelectItem value="2w">Last 2 weeks</SelectItem>
                <SelectItem value="1m">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
