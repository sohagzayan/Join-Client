'use client';
import { InputField } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const JobSwitchCreateHandle = () => {
  const [currentCompany, setCurrentCompany] = useState('TechRecruit Inc.');
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([
    'TechRecruit Inc.',
    'Global Staffing Solutions',
    'Talent Finders Ltd.',
  ]);

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex items-center space-x-5 rounded-lg bg-[rgba(255,255,255,0.05)] px-4 py-2 shadow">
      <div className=" ">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 py-2 font-semibold text-white"
              >
                {currentCompany}
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-16 w-64 border-2 border-[rgba(255,255,255,0.1)] bg-[#181C3B] p-0 text-white">
              <div className="p-2">
                <div className="relative mb-2">
                  <InputField
                    type="search"
                    icon={Search}
                    placeholder="Find company..."
                    // value={searchTerm}
                    // onChange={(e: any) => setSearchTerm(e.target.value)}
                    className="rounded-md border-2 border-[rgba(255,255,255,0.1)] bg-themeDark outline-none"
                  />
                </div>
                <div className="max-h-48 overflow-auto">
                  {filteredCompanies.map((company) => (
                    <Button
                      key={company}
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => {
                        setCurrentCompany(company);
                        setSearchTerm('');
                      }}
                    >
                      {company}
                      {company === currentCompany && (
                        <svg
                          className="text-primary h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" className="mt-2 w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Job
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <span className="rounded border border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] px-2 py-0.5 text-xs text-theme1">
            Free
          </span>
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-transparent bg-theme1 text-white"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default JobSwitchCreateHandle;
