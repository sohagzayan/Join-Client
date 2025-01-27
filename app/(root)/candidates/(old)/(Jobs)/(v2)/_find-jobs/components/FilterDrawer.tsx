import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Filter, X } from 'lucide-react';
import Filters from './Filters';

export function FilterDrawer() {
  return (
    <Drawer>
      {/* Drawer Trigger - Filter Icon */}
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="flex items-center space-x-2"
        >
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </Button>
      </DrawerTrigger>

      {/* Full-screen Drawer from Bottom to Top, 90% Width */}
      <DrawerContent className="animate-slideUp fixed inset-0 mx-auto h-full w-[90%] rounded-t-lg border-none bg-themeDark">
        <div className="absolute -right-2 top-5 z-30">
          {/* Close Button */}
          <DrawerClose asChild>
            <Button variant="ghost" className="rounded p-2 text-[#fff]">
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </div>

        {/* Drawer Content with Y-axis scrolling */}
        <div
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="h-full overflow-y-auto"
        >
          <Filters />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
