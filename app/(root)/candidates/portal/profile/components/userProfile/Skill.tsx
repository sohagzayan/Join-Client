'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Trophy } from 'lucide-react';

import { InputField } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Skill = () => {
  const [skills, setSkills] = useState<string[]>([]); // State to store all skills
  const [currentSkill, setCurrentSkill] = useState('');

  // Add skill when Enter key is pressed
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

  // Remove skill from the list
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Handle Save button click
  const handleSave = () => {
    console.log('Skills:', skills); // Log skills as an array of strings
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
      <div className="flex w-full justify-end">
        <Button
          onClick={handleSave}
          className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
          type="button"
        >
          Save Experience
        </Button>
      </div>
    </Card>
  );
};

export default Skill;
