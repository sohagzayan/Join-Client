'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useRef, useState } from 'react';

const Filtering = () => {
  const searchInputRef = useRef<any>(null);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [showFilters, setShowFilters] = useState<any>(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    jobType: [],
    experienceLevel: [],
    salary: [0, 200],
    location: '',
    datePosted: '',
    remoteOnly: false,
  });

  const handleSearchFocus = () => {
    searchInputRef.current.style.width = '105%';
  };

  const handleSearchBlur = () => {
    searchInputRef.current.style.width = '100%';
  };

  const handleFilterChange = (filterType: any, value: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <div>
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Job title, keywords, or company"
              className="w-full rounded-md border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <Input
                type="text"
                placeholder="City, state, or zip code"
                className="w-64 border-gray-700 bg-gray-800 text-gray-100"
                value={selectedFilters.location}
                onChange={(e: any) =>
                  handleFilterChange('location', e.target.value)
                }
              />
              <Select
                onValueChange={(value) =>
                  handleFilterChange('jobType', [value])
                }
              >
                <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  handleFilterChange('datePosted', value)
                }
              >
                <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
                  <SelectValue placeholder="Date Posted" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="3d">Last 3 days</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="14d">Last 14 days</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  handleFilterChange('salary', value.split('-').map(Number))
                }
              >
                <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
                  <SelectValue placeholder="Salary Estimate" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                  <SelectItem value="0-50">$0 - $50,000</SelectItem>
                  <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100-150">$100,000 - $150,000</SelectItem>
                  <SelectItem value="150-200">$150,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center gap-2 border-gray-700 bg-gray-800 text-gray-100"
              >
                {showFilters ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                {showFilters ? 'Hide Filters' : 'Show More Filters'}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <Card className="border-gray-700 bg-gray-800">
                  <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Experience Level
                      </label>
                      <div className="space-y-2">
                        {['Entry Level', 'Mid Level', 'Senior Level'].map(
                          (level) => (
                            <div key={level} className="flex items-center">
                              <Checkbox
                                id={`experience-${level}`}
                                checked={selectedFilters.experienceLevel.includes(
                                  level,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleFilterChange('experienceLevel', [
                                      ...selectedFilters.experienceLevel,
                                      level,
                                    ]);
                                  } else {
                                    handleFilterChange(
                                      'experienceLevel',
                                      selectedFilters.experienceLevel.filter(
                                        (l: any) => l !== level,
                                      ),
                                    );
                                  }
                                }}
                                className="border-gray-600"
                              />
                              <label
                                htmlFor={`experience-${level}`}
                                className="ml-2 text-sm text-gray-300"
                              >
                                {level}
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="remote-only"
                        checked={selectedFilters.remoteOnly}
                        onCheckedChange={(checked) =>
                          handleFilterChange('remoteOnly', checked)
                        }
                      />
                      <Label htmlFor="remote-only" className="text-gray-300">
                        Remote Only
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
