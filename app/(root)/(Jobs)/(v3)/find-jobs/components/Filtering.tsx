'use client';
import { InputField, SelectDropdown } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { LiaAddressBook } from 'react-icons/lia';

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

  //   const handleSearchFocus = () => {
  //     searchInputRef.current.style.width = '105%';
  //   };

  const handleSearchBlur = () => {
    searchInputRef.current.style.width = '100%';
  };

  const handleFilterChange = (filterType: any, value: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const statusOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' },
  ];

  return (
    <div>
      <div>
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#05092B]">
              <Search className="text-white" size={18} />
            </div>
            <InputField
              inputClassName="placeholder:text-white "
              type="text"
              placeholder="Job title, keywords, or company"
              className="w-full rounded-xl border-transparent bg-[rgba(255,255,255,0.05)] py-3 pl-14 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="mb-8">
            <div className="relative flex flex-wrap gap-4">
              <div>
                <div className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#05092B]">
                  <LiaAddressBook className="text-white" size={18} />
                </div>
                <InputField
                  inputClassName="placeholder:text-white"
                  type="text"
                  placeholder="City, state, or zip code"
                  className="w-64 rounded-xl border-transparent bg-[rgba(255,255,255,0.05)] py-2 pl-14 text-white"
                  value={selectedFilters.location}
                  onChange={(e: any) =>
                    handleFilterChange('location', e.target.value)
                  }
                />
              </div>

              <div>
                <SelectDropdown
                  selectedClassName="rounded text-sm w-60 py-2 rounded-xl font-semibold"
                  options={statusOptions}
                  placeholder="Job type"
                />
              </div>

              <div>
                <SelectDropdown
                  placeholder="Date Posted"
                  selectedClassName="rounded text-sm w-60 py-2 rounded-xl font-semibold"
                  options={statusOptions}
                />
              </div>

              <div>
                <SelectDropdown
                  placeholder="Salary Estimate"
                  selectedClassName="rounded text-sm w-60 py-2 rounded-xl font-semibold"
                  options={statusOptions}
                />
              </div>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center gap-2 border-transparent bg-[rgba(255,255,255,0.05)] text-gray-100"
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
                <Card
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
                  }}
                  className="border"
                >
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
