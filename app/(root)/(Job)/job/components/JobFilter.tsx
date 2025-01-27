'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';

const JobFilter = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});

  return (
    <div className="flex items-center space-x-4 rounded-lg p-4">
      {/* Settings Icon for Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center rounded-full border-gray-300 bg-theme1 px-4 py-2 text-white shadow transition-all duration-150 hover:bg-gray-200 hover:text-theme1">
            <FiFilter className="mr-2 text-lg" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="mt-2">Adjust your preferences here.</p>
        </DialogContent>
      </Dialog>

      <div className="relative">
        <button className="rounded-md bg-black px-3 py-2 text-sm text-white">
          Remote only
        </button>
      </div>

      <div className="relative">
        <Select>
          <SelectTrigger className="focus:ring-7 w-[150px] border-none bg-black text-white outline-none">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="border-0 bg-black text-white">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Select>
          <SelectTrigger className="focus:ring-7 w-[180px] border-none bg-black text-white outline-none">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="border-0 bg-black text-white">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Select>
          <SelectTrigger className="focus:ring-7 w-[180px] border-none bg-black text-white outline-none">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="border-0 bg-black text-white">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilter;
