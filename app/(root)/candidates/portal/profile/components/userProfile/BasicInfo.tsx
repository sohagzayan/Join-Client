'use client';

import { MapPin, Upload } from 'lucide-react';

import { InputField } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const BasicInfo = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 rounded-full"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <InputField
                id="name"
                placeholder="Your full name"
                className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <InputField
                  id="location"
                  className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="primary-role">Primary Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
