'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, Plus, Search } from 'lucide-react';
import * as React from 'react';

export default function DashboardTopBar() {
  const [currentCompany, setCurrentCompany] =
    React.useState('TechRecruit Inc.');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [companies, setCompanies] = React.useState([
    'TechRecruit Inc.',
    'Global Staffing Solutions',
    'Talent Finders Ltd.',
  ]);

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <nav className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-white">
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="px-0 font-semibold">
              {currentCompany}
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-16 w-64 bg-white p-0">
            <div className="p-2">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Find company..."
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  className="pl-8"
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
                New company
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <span className="rounded bg-yellow px-2 py-0.5 text-xs">Free</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          Analytics
        </Button>
        {/* <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User profile</span>
        </Button> */}
        {/* <Button variant="ghost" size="icon">
          <Clock className="h-5 w-5" />
          <span className="sr-only">Recent activity</span>
        </Button> */}
      </div>
    </nav>
  );
}
