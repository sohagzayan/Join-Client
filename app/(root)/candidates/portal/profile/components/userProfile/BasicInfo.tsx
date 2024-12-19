'use client';

import {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/profile/profileApi';
import { MapPin, Upload } from 'lucide-react';
import { parseCookies } from 'nookies';
import { ChangeEvent, useEffect, useState } from 'react';

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
import { useGetCurrentUserQuery } from '@/redux/features/auth/authentication';
import { toast } from 'sonner';

// Define types
interface FormData {
  name: string;
  location: string;
  primaryRole: string;
  yearsOfExperience: number;
}

const BasicInfo = () => {
  // State to hold form values
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    primaryRole: '',
    yearsOfExperience: 0,
  });

  const cookies = parseCookies();
  const token = cookies['auth_token'];

  const { data: profileInfo } = useGetProfileQuery({});
  const { data: currentUser } = useGetCurrentUserQuery(
    token ? { token } : { token: '' },
    {
      skip: !token,
    },
  );

  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      const profile = profileInfo.data[0];
      setFormData({
        name: profile.name || '',
        location: profile.location || '',
        primaryRole: profile.primaryRole || '',
        yearsOfExperience: profile.yearsOfExperience || 0,
      });
    }
  }, [profileInfo]);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Select change
  const handleSelectChange = (
    field: keyof FormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle save button click
  const handleSaveExperience = async () => {
    try {
      if (
        profileInfo?.data &&
        Array.isArray(profileInfo.data) &&
        profileInfo.data.length > 0
      ) {
        // Update profile
        await updateProfile({
          candidateId: profileInfo.data[0].id,
          data: {
            name: formData.name,
            location: formData.location,
            primaryRole: formData.primaryRole,
            yearsOfExperience: formData.yearsOfExperience,
          },
        });
        toast.success('Profile Update Successful', { duration: 4000 });
      } else {
        // Add profile
        await addProfile({
          data: {
            candidateId: currentUser?.id,
            name: formData.name,
            location: formData.location,
            primaryRole: formData.primaryRole,
            yearsOfExperience: formData.yearsOfExperience,
          },
        });
        toast.success('Profile Update Successful', { duration: 4000 });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

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
              type="button"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <InputField
                id="name"
                value={formData.name}
                onChange={handleInputChange}
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
                  value={formData.location}
                  onChange={handleInputChange}
                  className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="primaryRole">Primary Role</Label>
            <Select
              value={formData.primaryRole}
              onValueChange={(value) =>
                handleSelectChange('primaryRole', value)
              }
            >
              <SelectTrigger className="bg-transparent focus:ring-blue-500 focus:ring-offset-blue-500">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
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
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Select
              value={formData.yearsOfExperience.toString()}
              onValueChange={(value) =>
                handleSelectChange('yearsOfExperience', parseInt(value))
              }
            >
              <SelectTrigger className="bg-transparent focus:ring-blue-500 focus:ring-offset-blue-500">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                <SelectItem value="0">0-1 years</SelectItem>
                <SelectItem value="1">1-3 years</SelectItem>
                <SelectItem value="3">3-5 years</SelectItem>
                <SelectItem value="5">5-10 years</SelectItem>
                <SelectItem value="10">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <div className="flex w-full justify-end">
        <Button
          onClick={handleSaveExperience}
          className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
          type="button"
        >
          Save Experience
        </Button>
      </div>
    </Card>
  );
};

export default BasicInfo;
