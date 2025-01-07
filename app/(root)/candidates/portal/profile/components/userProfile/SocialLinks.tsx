'use client';

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/profile/profileApi';
import { Github, Globe, Linkedin } from 'lucide-react';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import { InputField } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const SocialLinks = () => {
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const cookies = parseCookies();
  const token = cookies['auth_token'];

  const { data: profileInfo } = useGetProfileQuery<any>({});
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      const profile = profileInfo.data[0];
      setLinkedin(profile.linkedin || '');
      setGithub(profile.github || '');
      // Portfolio is kept for UI purposes but not handled in backend for now
    }
  }, [profileInfo]);

  const handleLinkedinSave = async () => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      try {
        await updateProfile({
          candidateId: profileInfo.data[0].id,
          data: { linkedin },
        });
        toast.success('LinkedIn updated successfully!');
      } catch (error) {
        toast.error('Error updating LinkedIn. Please try again.');
        console.error('Error updating LinkedIn:', error);
      }
    }
  };

  const handleGithubSave = async () => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      try {
        await updateProfile({
          candidateId: profileInfo.data[0].id,
          data: { github },
        });
        toast.success('GitHub updated successfully!');
      } catch (error) {
        toast.error('Error updating GitHub. Please try again.');
        console.error('Error updating GitHub:', error);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Social Links</h2>
        <div className="space-y-4">
          {/* LinkedIn URL */}
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              onBlur={handleLinkedinSave}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>

          {/* GitHub URL */}
          <div className="relative">
            <Github className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="GitHub URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              onBlur={handleGithubSave}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>

          {/* Portfolio URL */}
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="Portfolio URL"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinks;
