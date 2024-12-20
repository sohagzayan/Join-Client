'use client';

import {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/profile/profileApi';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Trophy } from 'lucide-react';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import { InputField } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Skill = () => {
  const [skills, setSkills] = useState<string[]>([]); // State to store all skills
  const [currentSkill, setCurrentSkill] = useState('');

  const cookies = parseCookies();
  const token = cookies['auth_token'];

  const { data: profileInfo } = useGetProfileQuery({});
  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      const profile = profileInfo.data[0];
      setSkills(profile.skills || []);
    }
  }, [profileInfo]);

  // Add skill and update profile immediately
  const addSkill = async (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      currentSkill.trim() &&
      !skills.includes(currentSkill.trim())
    ) {
      const updatedSkills = [...skills, currentSkill.trim()];
      setSkills(updatedSkills);
      setCurrentSkill('');

      if (
        profileInfo?.data &&
        Array.isArray(profileInfo.data) &&
        profileInfo.data.length > 0
      ) {
        try {
          await updateProfile({
            candidateId: profileInfo.data[0].id,
            data: { skills: updatedSkills },
          });
          toast.success('Skill added and profile updated successfully!');
        } catch (error) {
          toast.error('Error updating profile. Please try again.');
          console.error('Error updating profile:', error);
        }
      } else {
        try {
          await addProfile({
            data: {
              candidateId: profileInfo?.data?.[0]?.candidateId || '',
              skills: updatedSkills,
            },
          });
          toast.success('Skill added and profile created successfully!');
        } catch (error) {
          toast.error('Error creating profile. Please try again.');
          console.error('Error creating profile:', error);
        }
      }
    }
  };

  // Remove skill and update profile immediately
  const removeSkill = async (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);

    if (
      profileInfo?.data &&
      Array.isArray(profileInfo.data) &&
      profileInfo.data.length > 0
    ) {
      try {
        await updateProfile({
          candidateId: profileInfo.data[0].id,
          data: { skills: updatedSkills },
        });
        toast.success('Skill removed and profile updated successfully!');
      } catch (error) {
        toast.error('Error updating profile. Please try again.');
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        </div>
        <div>
          <Label htmlFor="skills">Add Skills</Label>
          <InputField
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={addSkill}
            placeholder="Type a skill and press Enter (e.g. React, Node.js, Python)"
            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex"
                >
                  <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-gray-800 dark:text-gray-300">
                    {skill}
                    <Trash2
                      className="hover:text-red-500 ml-2 h-4 w-4 text-gray-500 transition-colors duration-200 dark:text-gray-400"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skill;
