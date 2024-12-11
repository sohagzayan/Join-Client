'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Github, Globe, Linkedin, Trash2, Trophy } from 'lucide-react';
import { useState } from 'react';

import { InputField } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ProfileFormData } from '@/data/models/profile';
import { useGetCurrentUserQuery } from '@/redux/features/auth/authentication';
import { useGetAllExperiencesQuery } from '@/redux/features/profile/addExperience/addExperienceApi';
import { revalidatePath } from 'next/cache';
import { parseCookies } from 'nookies';
import { AutoSaveForm } from './AutoSaveForm';
import BasicInfo from './userProfile/BasicInfo';
import Education from './userProfile/Education';
import {
  default as WorkExperience,
  default as WorkExperienceComponent,
} from './userProfile/WorkExperienceComponent';

type WorkExperience = {
  id: string;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  candidateId: 0;
};

export default function ProfileForm() {
  const cookies = parseCookies();
  const token = cookies['auth_token'];
  const { data: currentUser } = useGetCurrentUserQuery(
    token ? { token } : { token: '' },
    {
      skip: !token,
    },
  );

  // console.log(currentUser?.data?.id, 'current Userrrrrrr');

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: '1',
      companyName: '',
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      // @ts-ignore
      candidateId: currentUser?.data?.id,
    },
  ]);
  console.log(workExperience, 'workExperience');
  const [education, setEducation] = useState([{ id: '1' }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isDark, setIsDark] = useState(false);

  const { data: experienceData } = useGetAllExperiencesQuery({});
  console.log(experienceData, 'experienceDataaaaaaaaa');

  async function saveProfile(data: Partial<ProfileFormData>) {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically save to your database
      console.log('Saving profile data:', data);

      revalidatePath('/profile');
      return { success: true };
    } catch (error) {
      // console.error('Error saving profile:', error);
      return { success: false };
    }
  }

  const addWorkExperience = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkExperience((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        companyName: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        candidateId: 0,
      },
    ]);
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleInputChange = (
    id: string,
    field: keyof WorkExperience,
    value: string,
  ) => {
    setWorkExperience((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
            }
          : exp,
      ),
    );
  };

  const addEducation = () => {
    setEducation([...education, { id: String(education.length + 1) }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      currentSkill.trim() &&
      !skills.includes(currentSkill.trim())
    ) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  //  Hendler functions
  // save experience handler
  const handleSaveExperience = (e: any) => {
    e.preventDefault();
    console.log(workExperience, 'local-experience');
  };

  return (
    <div className={`p-4 text-white transition-colors duration-300`}>
      <div className="mx-auto">
        <div className="mb-4 flex justify-end">
          <Switch
            checked={isDark}
            onCheckedChange={setIsDark}
            aria-label="Toggle dark mode"
          />
        </div>

        <AutoSaveForm onSubmit={saveProfile}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Basic Info Section */}
            <BasicInfo />

            {/* Work Experience Section */}
            <WorkExperienceComponent
              workExperience={workExperience}
              addWorkExperience={addWorkExperience}
              removeWorkExperience={removeWorkExperience}
              handleInputChange={handleInputChange}
              handleSaveExperience={handleSaveExperience}
            />

            {/* Education Section */}
            <Education
              education={education}
              addEducation={addEducation}
              removeEducation={removeEducation}
            />

            {/* Skills Section */}
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
                        >
                          <Badge
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill}
                            <Trash2 className="ml-2 h-3 w-3" />
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Preferences */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Job Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <Label>Salary Expectations (Annual)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        type="number"
                        placeholder="Minimum"
                        className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                      />
                      <InputField
                        type="number"
                        placeholder="Maximum"
                        className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Work Type Preference</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Remote Only</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Willing to Relocate</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Notice Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-months">2 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Social Links</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <InputField
                      placeholder="LinkedIn URL"
                      className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                    />
                  </div>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <InputField
                      className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                      placeholder="GitHub URL"
                    />
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <InputField
                      className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                      placeholder="Portfolio URL"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demographics Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Demographics</h2>
                <div className="space-y-6">
                  <div>
                    <Label>Pronouns</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="he/him">he/him</SelectItem>
                        <SelectItem value="she/her">she/her</SelectItem>
                        <SelectItem value="they/them">they/them</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Display demographics on profile</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AutoSaveForm>
      </div>
    </div>
  );
}
