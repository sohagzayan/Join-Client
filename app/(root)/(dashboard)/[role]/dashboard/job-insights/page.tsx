'use client';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  FilterIcon,
  SearchIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for job listings
const jobListings: any = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    department: 'Engineering',
    views: 1200,
    applications: 45,
    timeToFill: 28,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 2,
    title: 'Product Manager',
    location: 'New York, NY',
    department: 'Product',
    views: 980,
    applications: 32,
    timeToFill: 35,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 3,
    title: 'UX Designer',
    location: 'London, UK',
    department: 'Design',
    views: 750,
    applications: 28,
    timeToFill: 21,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 4,
    title: 'Data Scientist',
    location: 'Berlin, Germany',
    department: 'Data',
    views: 620,
    applications: 18,
    timeToFill: 42,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
];

export default function JobInsights() {
  const [sortBy, setSortBy] = useState('views');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredJobs = jobListings
    .filter(
      (job: any) =>
        (filterDepartment === 'All' || job.department === filterDepartment) &&
        job.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a: any, b: any) => b[sortBy] - a[sortBy]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Job Insights</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Data">Data</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Views</SelectItem>
              <SelectItem value="applications">Applications</SelectItem>
              <SelectItem value="timeToFill">Time to Fill</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredJobs.map((job: any) => (
          <Card key={job.id} className="w-full">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{job.location}</p>
              <p className="text-muted-foreground text-sm">{job.department}</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="views" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="views">Views</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="timeToFill">Time to Fill</TabsTrigger>
                </TabsList>
                <TabsContent value="views">
                  <div className="mb-2 text-2xl font-bold">{job.views}</div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={job.viewsData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="applications">
                  <div className="mb-2 text-2xl font-bold">
                    {job.applications}
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={job.applicationsData}>
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="timeToFill">
                  <div className="mb-2 text-2xl font-bold">
                    {job.timeToFill} days
                  </div>
                  <div className="bg-muted h-2.5 w-full rounded-full">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(job.timeToFill / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-muted-foreground mt-2 flex justify-between text-sm">
                    <span>0 days</span>
                    <span>50 days</span>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center">
                  {job.views > 1000 ? (
                    <ArrowUpIcon className="text-green-500 mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="text-red-500 mr-1 h-4 w-4" />
                  )}
                  {job.views > 1000 ? 'High visibility' : 'Low visibility'}
                </span>
                <span className="flex items-center">
                  {job.applications > 30 ? (
                    <ArrowUpIcon className="text-green-500 mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="text-red-500 mr-1 h-4 w-4" />
                  )}
                  {job.applications > 30 ? 'High interest' : 'Low interest'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
