'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/profile/profileApi';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const DemoGraph = () => {
  const [pronouns, setPronouns] = useState('');
  const [showDemographics, setShowDemographics] = useState(false);

  const cookies = parseCookies();
  const token = cookies['auth_token'];

  const { data: profileInfo } = useGetProfileQuery<any>({});
  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      const profile = profileInfo.data[0];
      setPronouns(profile.pronouns || '');
    }
  }, [profileInfo]);

  const handlePronounsChange = async (value: string) => {
    setPronouns(value);

    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      try {
        await updateProfile({
          candidateId: profileInfo.data[0].id,
          data: { pronouns: value },
        });
        toast.success('Pronouns updated successfully!');
      } catch (error) {
        toast.error('Error updating pronouns. Please try again.');
        console.error('Error updating pronouns:', error);
      }
    } else {
      try {
        await addProfile({
          data: {
            candidateId: profileInfo?.data?.[0]?.candidateId || '',
            pronouns: value,
          },
        });
        toast.success('Pronouns added successfully!');
      } catch (error) {
        toast.error('Error adding pronouns. Please try again.');
        console.error('Error adding pronouns:', error);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Demographics</h2>
        <div className="space-y-6">
          {/* Pronouns Dropdown */}
          <div>
            <Label>Pronouns</Label>
            <Select
              value={pronouns}
              onValueChange={(value) => handlePronounsChange(value)}
            >
              <SelectTrigger className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]">
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                <SelectItem value="he/him">he/him</SelectItem>
                <SelectItem value="she/her">she/her</SelectItem>
                <SelectItem value="they/them">they/them</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display Demographics Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDemographics"
              checked={showDemographics}
              onChange={(e) => setShowDemographics(e.target.checked)}
              className="h-5 w-5 cursor-pointer rounded border-gray-500 bg-transparent text-blue-500 focus:ring focus:ring-blue-500"
            />
            <Label htmlFor="showDemographics" className="text-[#f5f5f5]">
              Display demographics on profile
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoGraph;
