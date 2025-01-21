'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Tag {
  id: string;
  text: string;
}

export default function Filters() {
  const [skills, setSkills] = useState<Tag[]>([]);
  const [jobNature, setJobNature] = useState('any');
  const [jobLevel, setJobLevel] = useState('any');
  const [ageRange, setAgeRange] = useState('any');
  const [experience, setExperience] = useState('any');
  const [gender, setGender] = useState('any');
  const [postedWithin, setPostedWithin] = useState('any');
  const [deadline, setDeadline] = useState('any');
  const [payRange, setPayRange] = useState([18, 32]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeTag = (tagId: string) => {
    setSkills(skills.filter((tag) => tag.id !== tagId));
  };

  const clearAll = () => {
    setSkills([]);
    setJobNature('any');
    setJobLevel('any');
    setAgeRange('any');
    setExperience('any');
    setGender('any');
    setPostedWithin('any');
    setDeadline('any');
    setPayRange([1, 40]);
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-7xl rounded-lg bg-[rgba(255,255,255,0.08)] p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-theme1">FILTERS</h2>
        <Button
          variant="ghost"
          className="text-sm text-theme1 hover:text-white"
          onClick={clearAll}
        >
          Clear all filters
        </Button>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        {/* Job Nature - Always Visible */}
        <div className="w-[200px] space-y-2">
          <Label className="text-sm font-medium">Job Nature</Label>
          <select
            value={jobNature}
            onChange={(e: any) => setJobNature(e.target.value)}
            className="dark-select rounded-6 bg-[rgba(255,255,255,0.08)] px-6 py-2 text-white focus:outline"
          >
            <option value="" disabled>
              Select job nature
            </option>{' '}
            <option value="any">Any</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contractual">Contractual</option>
            <option value="intern">Intern</option>
            <option value="remote">Work from home</option>
          </select>
        </div>

        {/* Job Level - Always Visible */}
        <div className="w-[200px] space-y-2">
          <Label className="text-sm font-medium">Job Level</Label>
          <Select
            value={jobLevel}
            onValueChange={setJobLevel}
            // className="dark-select"
          >
            <SelectTrigger className="border-gray-700 bg-[rgba(255,255,255,0.08)] text-white">
              <SelectValue placeholder="Select job level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="entry">Entry level</SelectItem>
              <SelectItem value="mid">Mid level</SelectItem>
              <SelectItem value="top">Top level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience - Always Visible */}
        <div className="w-[200px] space-y-2">
          <Label className="text-sm font-medium">Experience</Label>
          <Select
            value={experience}
            onValueChange={setExperience}
            // className="dark-select"
          >
            <SelectTrigger className="border-gray-700 bg-[rgba(255,255,255,0.08)] text-white">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="fresher">Fresher</SelectItem>
              <SelectItem value="below-1">Below 1 year</SelectItem>
              <SelectItem value="1-3">1 - &lt; 3 years</SelectItem>
              <SelectItem value="3-5">3 - &lt; 5 years</SelectItem>
              <SelectItem value="5-10">5 - &lt; 10 years</SelectItem>
              <SelectItem value="above-10">Over 10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* More Filters Button & Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-theme1/80 gap-2 bg-theme1 text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              More Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="border-gray-700 bg-[rgba(255,255,255,0.08)] text-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-theme1">
                Additional Filters
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 py-4"
            >
              {/* Age Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Age Range</Label>
                <Select
                  value={ageRange}
                  onValueChange={setAgeRange}
                  // className="dark-select"
                >
                  <SelectTrigger className="border-gray-700 bg-[rgba(255,255,255,0.08)] text-white">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="below-20">Below 20 years</SelectItem>
                    <SelectItem value="20-30">20 - &lt; 30 years</SelectItem>
                    <SelectItem value="30-40">30 - &lt; 40 years</SelectItem>
                    <SelectItem value="40-50">40 - &lt; 50 years</SelectItem>
                    <SelectItem value="above-50">Over 50 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="male"
                      id="male"
                      className="border-gray-500"
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="female"
                      id="female"
                      className="border-gray-500"
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="any"
                      id="any-gender"
                      className="border-gray-500"
                    />
                    <Label htmlFor="any-gender">Any</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Posted Within */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Posted Within</Label>
                <RadioGroup
                  value={postedWithin}
                  onValueChange={setPostedWithin}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="any"
                      id="posted-any"
                      className="border-gray-500"
                    />
                    <Label htmlFor="posted-any">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="today"
                      id="posted-today"
                      className="border-gray-500"
                    />
                    <Label htmlFor="posted-today">Today</Label>
                  </div>
                  {[2, 3, 4, 5].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={`last-${day}`}
                        id={`posted-last-${day}`}
                        className="border-gray-500"
                      />
                      <Label htmlFor={`posted-last-${day}`}>
                        Last {day} days
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Deadline</Label>
                <RadioGroup
                  value={deadline}
                  onValueChange={setDeadline}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="any"
                      id="deadline-any"
                      className="border-gray-500"
                    />
                    <Label htmlFor="deadline-any">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="today"
                      id="deadline-today"
                      className="border-gray-500"
                    />
                    <Label htmlFor="deadline-today">Today</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="tomorrow"
                      id="deadline-tomorrow"
                      className="border-gray-500"
                    />
                    <Label htmlFor="deadline-tomorrow">Tomorrow</Label>
                  </div>
                  {[2, 3, 4].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={`next-${day}`}
                        id={`deadline-next-${day}`}
                        className="border-gray-500"
                      />
                      <Label htmlFor={`deadline-next-${day}`}>
                        Next {day} days
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pay Range */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Pay Range</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={payRange[0]}
                    onChange={(e: any) =>
                      setPayRange([Number(e.target.value), payRange[1]])
                    }
                    className="w-20 border-gray-700 bg-[rgba(255,255,255,0.08)] text-white"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    value={payRange[1]}
                    onChange={(e: any) =>
                      setPayRange([payRange[0], Number(e.target.value)])
                    }
                    className="w-20 border-gray-700 bg-[rgba(255,255,255,0.08)] text-white"
                  />
                </div>
                <Slider
                  value={payRange}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={setPayRange}
                  className="mt-6"
                />
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
