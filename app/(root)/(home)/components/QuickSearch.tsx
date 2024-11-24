'use client';
import { Select } from '@/components/common';
import { Category } from '@/components/icons/svg';
import PopularSearches from '@/components/shared/popular-searches/PopularSearches';
import { FiSearch } from 'react-icons/fi';
import { HiBriefcase } from 'react-icons/hi';

const QuickSearch = () => {
  const handleJobType = () => {};

  return (
    <div className="relative mx-auto mt-4 text-[14px] md:w-3/4">
      <div>
        <div className="rounded-md border-0 bg-transparent p-3 shadow">
          <form action="">
            <div className="registration-form text-dark bg-customWhiteTransparent text-start lg:rounded-md">
              <div className="flex w-full flex-col items-center gap-6 md:flex-row lg:flex-row">
                <div className="flex w-full items-center md:flex-row lg:flex-row">
                  <div className="h-full w-full border-r border-r-text8 md:w-[200px] lg:w-[200px]">
                    <Select
                      name="category"
                      placeholder="Category"
                      options={[
                        { value: 'United States', label: 'United States' },
                        { value: 'banana', label: 'Banana' },
                        { value: 'blueberry', label: 'Blueberry' },
                        { value: 'grapes', label: 'Grapes' },
                        { value: 'pineapple', label: 'Pineapple' },
                      ]}
                      // defaultValue="banana"
                      onChange={handleJobType}
                      triggerClassName="bg-transparent border-transparent text-text5 h-full"
                      icon={<Category />}
                      contentClassName="bg-[#181C3B] text-white"
                    />
                  </div>

                  <div className="h-full w-full border-r-text8 md:w-[200px] md:border-r lg:w-[200px] lg:border-r">
                    <Select
                      name="fruits"
                      placeholder="Part-time/Full-time"
                      options={[
                        { value: 'United States', label: 'United States' },
                        { value: 'banana', label: 'Banana' },
                        { value: 'blueberry', label: 'Blueberry' },
                        { value: 'grapes', label: 'Grapes' },
                        { value: 'pineapple', label: 'Pineapple' },
                      ]}
                      defaultValue="banana"
                      onChange={handleJobType}
                      triggerClassName="bg-transparent text-text5 border-transparent"
                      icon={<HiBriefcase className="text-2xl text-text5" />}
                      contentClassName="bg-white"
                    />
                  </div>
                </div>

                <div className="relative flex w-full items-center gap-1 bg-transparent px-2">
                  <input
                    type="text"
                    id="job-keyword"
                    className="filter-input-box h-[60px] w-full border-0 bg-transparent pb-[15px] pl-[10px] pr-[6px] pt-[13px] text-text5 placeholder:text-text6 focus:border-none focus:outline-none"
                    placeholder="Search for your next adventure..."
                    name="name"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-auto flex h-[60px] w-full items-center justify-center bg-theme1 py-2 text-[14px] font-600 text-white md:w-[200px] lg:w-[300px]"
                >
                  <FiSearch size={30} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <PopularSearches />
      </div>
    </div>
  );
};

export default QuickSearch;
