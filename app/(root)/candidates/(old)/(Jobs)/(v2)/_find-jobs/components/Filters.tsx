'use client';
import { SelectDropdown } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { useState } from 'react';

const statusOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];
const statusOptionsForCountry = [
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'usa', label: 'USA' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'pakistan', label: 'Pakistan' },
];
const statusOptionsForJobType = [
  { value: 'bangladesh', label: 'Full-Time' },
  { value: 'part_time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
];

export default function Filters() {
  const [payRate, setPayRate] = useState([18, 32]);
  const [includeWithoutPay, setIncludeWithoutPay] = useState(true);

  return (
    <div className="w-full p-4 shadow-md">
      {/* Filters Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-300">FILTERS</h2>
        <Button
          variant="link"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all filters
        </Button>
      </div>

      {/* Skills Filter */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Skills</h3>
          <Button
            variant="link"
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 bg-black8 p-2 text-gray-400">
          {['UI', 'mobile', 'PHP', 'photoshop'].map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded bg-themeDark2 px-3 py-1 text-sm"
            >
              {skill}
              <X className="ml-2 h-4 w-4 cursor-pointer" />
            </span>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Availability</h3>
          <Button
            variant="link"
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>
        <div className="space-y-2">
          {['Hourly', 'Part-time (20 hrs/wk)', 'Full-time (40 hrs/wk)'].map(
            (option) => (
              <div key={option} className="flex items-center">
                <Checkbox id={option} />
                <label htmlFor={option} className="ml-2 text-sm text-gray-300">
                  {option}
                </label>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Pay Rate Filter - range */}

      {/* Experience Level Filter */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">
            Experience level
          </h3>
          <Button
            variant="link"
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>

        <SelectDropdown
          selectedClassName="rounded text-sm"
          options={statusOptions}
        />
      </div>

      {/* Countries Filter */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">
            Select Your Country
          </h3>
          <Button
            variant="link"
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>
        <SelectDropdown
          selectedClassName="rounded text-sm"
          options={statusOptionsForCountry}
        />
      </div>

      {/* Job Type Filter */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Job type</h3>
          <Button
            variant="link"
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>
        <SelectDropdown
          selectedClassName="rounded text-sm"
          options={statusOptionsForJobType}
        />
      </div>
    </div>
  );
}
