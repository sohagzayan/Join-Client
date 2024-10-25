'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobListing } from '@/data/models/JobInsights';
import { jobListings } from '@/utils/data/Insights';
import { FilterIcon, SearchIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import InsightsJobCard from './components/InsightsJobCard';

export default function JobInsights() {
  const [sortBy, setSortBy] = useState('views');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredJobs = jobListings
    .filter(
      (job: JobListing) =>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
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
        {sortedAndFilteredJobs.map((job: JobListing) => (
          <InsightsJobCard key={job.id + 10} job={job} />
        ))}
      </div>
    </div>
  );
}
