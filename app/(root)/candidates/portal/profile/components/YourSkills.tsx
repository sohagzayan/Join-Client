'use client';

import TextArea from '@/components/common/text-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

type ProfileData = {
  name: string;
  location: string;
  role: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experiences: string[]; // Assuming experiences are strings; adjust if different
  skills: string[];
  achievements: string;
};

const YourSkills = () => {
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

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | string[],
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const skill = prompt('Enter a new skill:');
    if (skill && skill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {profileData.skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-destructive hover:text-destructive-foreground cursor-pointer px-3 py-1 text-sm transition-colors"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} <span className="ml-1">×</span>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Button variant="outline" onClick={addSkill} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Button>
          <TextArea
            placeholder="List your key achievements..."
            value={profileData.achievements}
            onChange={(e) => handleInputChange('achievements', e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default YourSkills;
