import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import FilterDrawer from './FilterDrawer';
import Filters from './Filters';
import Jobs from './Jobs';
import Suggestion from './Suggestion';

const FindJobs = () => {
  return (
    <section className="w-full">
      {/* search field  */}
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex w-full max-w-full items-center space-x-1 md:max-w-[90%] md:space-x-2 lg:md:max-w-[90%] lg:space-x-2">
          {/* Filter Drawer Trigger for Mobile */}
          <div className="md:hidden lg:hidden">
            <FilterDrawer /> {/* Add the filter drawer here */}
          </div>

          {/* Search Input */}
          <Input
            className="flex-grow"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            placeholder="Search by keywords (PHP, NET, graphic design, etc.)"
            type="search"
          />

          {/* Search Button */}
          <Button
            type="submit"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            className="flex items-center justify-center rounded border border-black8"
          >
            <Search className="h-5 w-5" /> {/* Adding the Search Icon */}
          </Button>
        </div>
      </div>

      {/* filter section  */}
      <div className="my-10 grid grid-cols-12 gap-4">
        {/* Filters for Desktop - 30% width */}
        <div
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="scrollbar-hide col-span-3 hidden h-screen w-full overflow-y-scroll rounded md:block lg:block"
        >
          {/* Content for Filters Section */}
          <Filters />
        </div>

        {/* Job Listings - 40% width */}
        <div
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="col-span-12 h-full rounded md:col-span-6 lg:col-span-6"
        >
          {/* Content for Job Post */}
          <Jobs />
        </div>

        {/* Suggestions - 30% width */}
        <div
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="col-span-3 hidden h-full rounded md:block lg:block"
        >
          {/* Content for Suggestions */}
          <Suggestion />
        </div>
      </div>
    </section>
  );
};

export default FindJobs;
