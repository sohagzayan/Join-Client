'use client';

import TextArea from '@/components/common/text-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Camera } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface ProfileData {
  name: string;
  location: string;
  role: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experiences: string[]; // Assuming it's an array of strings
  skills: string[]; // Assuming it's an array of strings
  achievements: string;
}

const PersonalInfo: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    location: '',
    role: '',
    bio: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    experiences: [],
    skills: [],
    achievements: '',
  });

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | string[],
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextChange =
    (field: keyof ProfileData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleInputChange(field, e.target.value);
    };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <Avatar className="group h-32 w-32 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Input
              placeholder="Full Name"
              value={profileData.name}
              onChange={handleTextChange('name')}
              className="text-lg"
            />
            <Input
              placeholder="Location"
              value={profileData.location}
              onChange={handleTextChange('location')}
            />
          </div>
        </div>
        <Select
          value={profileData.role}
          onValueChange={(value) => handleInputChange('role', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <TextArea placeholder="Type your message here." />
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
