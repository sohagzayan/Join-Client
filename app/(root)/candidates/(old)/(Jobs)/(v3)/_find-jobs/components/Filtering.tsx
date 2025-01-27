'use client';

import * as Slider from '@radix-ui/react-slider';
import { gsap } from 'gsap';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  DollarSign,
  Globe,
  GraduationCap,
  MapPin,
  Search,
  User,
  X,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const EnhancedJobFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || '',
  );
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | string[]>
  >(() => {
    const filters: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'search' && key !== 'preference') {
        filters[key] = value.split(',');
      }
    });
    return filters;
  });
  const [isPreferenceActive, setIsPreferenceActive] = useState(
    searchParams.get('preference') === 'true',
  );
  const [salaryRange, setSalaryRange] = useState([0, 200000]);

  const filterBarRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const preferenceOverlayRef = useRef(null);

  useEffect(() => {
    // Initial animation for the filter bar
    gsap.from(filterBarRef.current, {
      y: -20,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.7)',
    });

    // Subtle floating animation for search icon
    gsap.to(searchRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  const handleDropdownAnimation = (isOpen: boolean) => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  };

  const filters = [
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'jobType', label: 'Job Type', icon: Briefcase },
    { id: 'datePosted', label: 'Date Posted', icon: Calendar },
    { id: 'experienceLevel', label: 'Experience Level', icon: GraduationCap },
    { id: 'remoteType', label: 'Remote Type', icon: Globe },
  ];

  const handleFilterSelect = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = (prev[filterId] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      const newFilters = { ...prev, [filterId]: newValues };
      updateURL(newFilters, searchValue, isPreferenceActive, salaryRange);
      return newFilters;
    });
  };

  const getFilterOptions = (filterId: string) => {
    switch (filterId) {
      case 'location':
        return ['New York', 'San Francisco', 'London', 'Remote'];
      case 'jobType':
        return ['Full-time', 'Part-time', 'Contract', 'Internship'];
      case 'datePosted':
        return ['Past 24 hours', 'Past week', 'Past month', 'Any time'];
      case 'experienceLevel':
        return ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
      case 'remoteType':
        return ['Remote', 'Hybrid', 'On-site'];
      default:
        return [];
    }
  };

  const resetFilters = () => {
    gsap.to('.filter-item', {
      scale: 0.9,
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('.filter-item', {
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'elastic.out(1, 0.5)',
        });
        setSelectedFilters({});
        setSalaryRange([0, 200000]);
        updateURL({}, searchValue, isPreferenceActive, [0, 200000]);
      },
    });
  };

  const togglePreference = () => {
    gsap.to(preferenceOverlayRef.current, {
      opacity: isPreferenceActive ? 0 : 1,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsPreferenceActive(!isPreferenceActive);
        updateURL(
          selectedFilters,
          searchValue,
          !isPreferenceActive,
          salaryRange,
        );
      },
    });
  };

  const updateURL = (
    filters: Record<string, string | string[]>,
    search: string,
    preference: boolean,
    salary: number[],
  ) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      }
    });
    if (search) params.set('search', search);
    if (preference) params.set('preference', 'true');
    params.set('minSalary', salary[0].toString());
    params.set('maxSalary', salary[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    updateURL(selectedFilters, newSearchValue, isPreferenceActive, salaryRange);
  };

  const handleSalaryChange = (newValues: number[]) => {
    setSalaryRange(newValues);
    updateURL(selectedFilters, searchValue, isPreferenceActive, newValues);
  };

  return (
    <div
      ref={filterBarRef}
      className="relative h-full space-y-6 rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 p-6"
    >
      <div className="relative">
        <Search
          ref={searchRef}
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500"
        />
        <input
          type="text"
          placeholder="Search job titles, keywords, or companies..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full rounded-full bg-[rgba(255,255,255,0.08)] py-3 pl-12 pr-4 text-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {filters.map((filter) => (
          <div key={filter.id} className="filter-item relative">
            <button
              onClick={() => {
                if (activeFilter === filter.id) {
                  handleDropdownAnimation(false);
                  setTimeout(() => setActiveFilter(null), 300);
                } else {
                  setActiveFilter(filter.id);
                  handleDropdownAnimation(true);
                }
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                ((selectedFilters[filter.id] as string[]) || []).length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.04)]'
              } transform shadow-sm hover:scale-105`}
              disabled={isPreferenceActive}
            >
              <filter.icon className="h-4 w-4" />
              {filter.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeFilter === filter.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeFilter === filter.id && (
              <div
                ref={dropdownRef}
                className="absolute left-0 top-full z-10 mt-2 w-48 overflow-hidden bg-[rgba(255,255,255,0.08)] text-white shadow-lg hover:bg-[rgba(255,255,255,0.04)]"
              >
                {getFilterOptions(filter.id).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect(filter.id, option)}
                    className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors duration-150 hover:bg-gray-50 ${((selectedFilters[filter.id] as string[]) || []).includes(option) ? 'bg-blue-100 text-blue-700' : ''} `}
                  >
                    <span className="mr-2">
                      {(
                        (selectedFilters[filter.id] as string[]) || []
                      ).includes(option)
                        ? '✓'
                        : ''}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="filter-item relative">
          <button
            onClick={() =>
              setActiveFilter(activeFilter === 'salary' ? null : 'salary')
            }
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              salaryRange[0] > 0 || salaryRange[1] < 200000
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.04)]'
            } transform shadow-sm hover:scale-105`}
            disabled={isPreferenceActive}
          >
            <DollarSign className="h-4 w-4" />
            Salary Range
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                activeFilter === 'salary' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeFilter === 'salary' && (
            <div
              ref={dropdownRef}
              className="absolute left-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-lg bg-white p-4 shadow-lg"
            >
              <Slider.Root
                className="relative flex h-5 w-full touch-none select-none items-center"
                value={salaryRange}
                onValueChange={handleSalaryChange}
                min={0}
                max={200000}
                step={1000}
                minStepsBetweenThumbs={1}
              >
                <Slider.Track className="relative h-2 grow rounded-full bg-gray-200">
                  <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
                </Slider.Track>
                <Slider.Thumb
                  className="block h-5 w-5 rounded-full bg-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Minimum salary"
                />
                <Slider.Thumb
                  className="block h-5 w-5 rounded-full bg-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Maximum salary"
                />
              </Slider.Root>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>${salaryRange[0].toLocaleString()}</span>
                <span>${salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={togglePreference}
          className={`flex transform items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105 ${
            isPreferenceActive
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-theme1 text-white hover:bg-theme2'
          } `}
        >
          <User className="h-4 w-4" />
          Use Preferences
        </button>

        {(Object.keys(selectedFilters).length > 0 ||
          salaryRange[0] > 0 ||
          salaryRange[1] < 200000) && (
          <button
            onClick={resetFilters}
            className="hover:bg-red-200 ml-auto flex transform items-center gap-2 rounded-full bg-red px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:scale-105"
            disabled={isPreferenceActive}
          >
            Reset filters
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isPreferenceActive && (
        <div
          ref={preferenceOverlayRef}
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm"
        >
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <h3 className="mb-2 text-lg font-semibold">
              Using Profile Preferences
            </h3>
            <p className="text-gray-600">
              Filters are currently based on your profile settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedJobFilterBar;
