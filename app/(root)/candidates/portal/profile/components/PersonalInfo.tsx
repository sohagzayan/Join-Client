'use client';

import { Switch } from '@/components/ui/switch';
import { ProfileFormData } from '@/data/models/profile';
import { useGetCurrentUserQuery } from '@/redux/features/auth/authentication';
import { useGetAllExperiencesQuery } from '@/redux/features/profile/addExperience/addExperienceApi';
import { motion } from 'framer-motion';
import { revalidatePath } from 'next/cache';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { AutoSaveForm } from './AutoSaveForm';
import BasicInfo from './userProfile/BasicInfo';
import DemoGraph from './userProfile/DemoGraph';
import Education from './userProfile/Education';
import JobPreference from './userProfile/JobPreference';
import Skill from './userProfile/Skill';
import SocialLinks from './userProfile/SocialLinks';
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
            <Skill
              currentSkill={currentSkill}
              setCurrentSkill={setCurrentSkill}
              addSkill={addSkill}
              skills={skills}
              removeSkill={removeSkill}
            />
            {/* Job Preferences */}
            <JobPreference />
            {/* Social Links */}
            <SocialLinks />
            {/* Demographics Section */}
            <DemoGraph />
          </motion.div>
        </AutoSaveForm>
      </div>
    </div>
  );
}
