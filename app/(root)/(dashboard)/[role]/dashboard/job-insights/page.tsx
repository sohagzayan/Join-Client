'use client';
import { InputField, SelectDropdown } from '@/components/common';
import { Button } from '@/components/ui/button';
import { JobListing, SelectOption } from '@/data/models/JobInsights';
import {
  AllDepartments,
  InsightsSorting,
  jobListings,
} from '@/utils/data/Insights';
import { FilterIcon, SearchIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import InsightsJobCard from './components/InsightsJobCard';

export default function JobInsights() {
  const [sortBy, setSortBy] = useState<string | null | any>('views');
  const [filterDepartment, setFilterDepartment] = useState<string | null>(
    'All',
  );
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredJobs = jobListings
    .filter(
      (job: JobListing) =>
        (filterDepartment === 'All' || job.department === filterDepartment) &&
        job.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a: any, b: any) => b[sortBy] - a[sortBy]);

  const handleSelect = (option: SelectOption | null) => {
    if (option) {
      setFilterDepartment(option.value);
    } else {
      setFilterDepartment(null);
    }
  };

  const handleSorting = (option: SelectOption | null) => {
    if (option) {
      setSortBy(option.value);
    } else {
      setSortBy(null);
    }
  };

  return (
    <div className="mx-auto p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Job Insights</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <InputField
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-64 rounded-md"
          />
          <Button variant="outline" size="icon" className="border-theme1">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <SelectDropdown
            options={AllDepartments}
            onSelect={handleSelect}
            selectedClassName="rounded-md py-3 text-text6 w-[200px]"
          />

          <SelectDropdown
            options={InsightsSorting}
            onSelect={handleSorting}
            selectedClassName="rounded-md py-3 text-text6 w-[200px]"
          />
          <Button
            variant="outline"
            size="icon"
            className="w-[100px] border-theme1"
          >
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
