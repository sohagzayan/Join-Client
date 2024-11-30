'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  MapPin,
  Plus,
  Trash2,
  Trophy,
  Upload,
} from 'lucide-react';
import { useState } from 'react';

import { InputField } from '@/components/common';
import TextArea from '@/components/common/text-area';
import { Badge } from '@/components/ui/badge';
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
import { Switch } from '@/components/ui/switch';
import { ProfileFormData } from '@/data/models/profile';
import { revalidatePath } from 'next/cache';
import { AutoSaveForm } from './AutoSaveForm';

export default function ProfileForm() {
  const [workExperience, setWorkExperience] = useState([{ id: '1' }]);
  const [education, setEducation] = useState([{ id: '1' }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isDark, setIsDark] = useState(false);

  async function saveProfile(data: Partial<ProfileFormData>) {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically save to your database
      console.log('Saving profile data:', data);

      revalidatePath('/profile');
      return { success: true };
    } catch (error) {
      console.error('Error saving profile:', error);
      return { success: false, error: 'Failed to save profile' };
    }
  }

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { id: String(workExperience.length + 1) },
    ]);
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperience(workExperience.filter((exp) => exp.id !== id));
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
                        <SelectItem value="frontend">
                          Frontend Developer
                        </SelectItem>
                        <SelectItem value="backend">
                          Backend Developer
                        </SelectItem>
                        <SelectItem value="fullstack">
                          Fullstack Developer
                        </SelectItem>
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

            {/* Work Experience Section */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <h2 className="text-2xl font-bold">Work Experience</h2>
                  </div>
                  <Button
                    onClick={addWorkExperience}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>

                <AnimatePresence>
                  {workExperience.map((exp) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Company</Label>
                          <InputField
                            placeholder="Company name"
                            className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>Job Title</Label>
                          <InputField
                            placeholder="Your role"
                            className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <InputField
                            type="month"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <InputField
                            type="month"
                            placeholder="Present"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Describe your responsibilities and achievements..."
                          className="h-32 rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <h2 className="text-2xl font-bold">Education</h2>
                  </div>
                  <Button onClick={addEducation} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>

                <AnimatePresence>
                  {education.map((edu) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>School</Label>
                          <InputField
                            placeholder="University/College name"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bachelors">
                                Bachelor{"'"}s
                              </SelectItem>
                              <SelectItem value="masters">
                                Master{"'"}s
                              </SelectItem>
                              <SelectItem value="phd">Ph.D.</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Field of Study</Label>
                          <InputField
                            placeholder="Major/Concentration"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>GPA (Optional)</Label>
                          <InputField
                            placeholder="e.g. 3.8"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <InputField
                            type="month"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <InputField
                            type="month"
                            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

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
