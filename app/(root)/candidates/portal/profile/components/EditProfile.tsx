'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera,
  Github,
  Globe,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
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
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    updateProfileCompletion();
  }, [profileData]);

  const updateProfileCompletion = () => {
    const fields = Object.keys(profileData);
    const completedFields = fields.filter((field) => {
      if (Array.isArray(profileData[field])) {
        return profileData[field].length > 0;
      }
      return profileData[field] !== '';
    });
    const completionPercentage = (completedFields.length / fields.length) * 100;
    setProfileCompletion(Math.round(completionPercentage));
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { title: '', company: '', period: '' },
      ],
    }));
  };

  const removeExperience = (index) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    const skill = prompt('Enter a new skill:');
    if (skill) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (skill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="container mx-auto space-y-8 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="to-purple-600 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 p-8 text-white"
      >
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-20"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              {profileData.name || 'Your Name'}
            </h1>
            <p className="text-xl">{profileData.role || 'Your Role'}</p>
          </div>
        </div>
        <div className="relative z-10 mt-4">
          <p className="mb-2 text-lg">Profile Completion</p>
          <Progress value={profileCompletion} className="h-3 w-full" />
          <p className="mt-2 text-sm">{profileCompletion}% complete</p>
        </div>
        <motion.div
          className="absolute bottom-0 right-0 h-64 w-64"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <div className="h-full w-full rounded-full bg-white opacity-10"></div>
        </motion.div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="personal">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                    <Avatar className="group h-24 w-24 cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Camera className="text-white" />
                      </div>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Full Name"
                        value={profileData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                      />
                      <Input
                        placeholder="Location"
                        value={profileData.location}
                        onChange={(e) =>
                          handleInputChange('location', e.target.value)
                        }
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
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center space-x-2">
                    <Globe className="text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="https://yourwebsite.com"
                      value={profileData.website}
                      onChange={(e) =>
                        handleInputChange('website', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="LinkedIn profile URL"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        handleInputChange('linkedin', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Github className="text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="GitHub profile URL"
                      value={profileData.github}
                      onChange={(e) =>
                        handleInputChange('github', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Twitter className="text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="Twitter profile URL"
                      value={profileData.twitter}
                      onChange={(e) =>
                        handleInputChange('twitter', e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <ScrollArea className="h-[300px] pr-4">
                    {profileData.experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-muted mb-4 flex items-center justify-between rounded-lg p-4"
                      >
                        <div className="space-y-1">
                          <Input
                            placeholder="Job Title"
                            value={exp.title}
                            onChange={(e) => {
                              const newExperiences = [
                                ...profileData.experiences,
                              ];
                              newExperiences[index].title = e.target.value;
                              handleInputChange('experiences', newExperiences);
                            }}
                            className="font-semibold"
                          />
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => {
                              const newExperiences = [
                                ...profileData.experiences,
                              ];
                              newExperiences[index].company = e.target.value;
                              handleInputChange('experiences', newExperiences);
                            }}
                            className="text-muted-foreground text-sm"
                          />
                          <Input
                            placeholder="Period"
                            value={exp.period}
                            onChange={(e) => {
                              const newExperiences = [
                                ...profileData.experiences,
                              ];
                              newExperiences[index].period = e.target.value;
                              handleInputChange('experiences', newExperiences);
                            }}
                            className="text-muted-foreground text-sm"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </ScrollArea>
                  <Button onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardContent className="space-y-4 p-6">
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
                  <Button variant="outline" onClick={addSkill}>
                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                  <Textarea
                    label="Achievements"
                    placeholder="List your key achievements..."
                    value={profileData.achievements}
                    onChange={(e) =>
                      handleInputChange('achievements', e.target.value)
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
