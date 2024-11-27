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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import {
  Camera,
  FileText,
  Github,
  Globe,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProfileStepper from './ProfileStepper';

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const tabsRef = useRef(null);
  const highlightRef = useRef(null);

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

  useEffect(() => {
    const tabs = tabsRef.current?.querySelectorAll('.tab-trigger');
    const highlight = highlightRef.current;

    if (!tabs || !highlight) return;

    const updateHighlight = () => {
      const activeElement = tabsRef.current?.querySelector('.active-tab');
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        gsap.to(highlight, {
          x: offsetLeft,
          width: offsetWidth,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    // Update the highlight position whenever the active tab changes
    updateHighlight();
    window.addEventListener('resize', updateHighlight);

    return () => {
      window.removeEventListener('resize', updateHighlight);
    };
  }, [activeTab]);

  useEffect(() => {
    const tabs = tabsRef.current?.querySelectorAll('.tab-trigger');
    if (!tabs) return;

    gsap.fromTo(
      tabs,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      },
    );
  }, []);
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
      <ProfileStepper />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Edit Your Profile
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative w-full">
            <TabsList
              ref={tabsRef}
              className="no-scrollbar flex w-full gap-4 overflow-x-auto"
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE
                WebkitOverflowScrolling: 'touch', // Smooth scrolling for Safari
              }}
            >
              {[
                'personal',
                'social',
                'experience',
                'skills',
                'resume',
                'preferences',
              ].map((tab) => (
                <div
                  key={tab}
                  className={`tab-trigger cursor-pointer rounded-lg p-4 font-bold ${
                    activeTab === tab
                      ? 'active-tab text-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </TabsList>
            {/* Highlight bar */}
            <div
              ref={highlightRef}
              className="absolute bottom-0 h-1 rounded bg-blue-500"
              style={{ transition: 'transform 0.3s ease, width 0.3s ease' }}
            ></div>
          </div>

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
                  <CardContent className="space-y-6 p-6">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                      <Avatar className="group h-32 w-32 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Input
                          placeholder="Full Name"
                          value={profileData.name}
                          onChange={(e) =>
                            handleInputChange('name', e.target.value)
                          }
                          className="text-lg"
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
                      onValueChange={(value) =>
                        handleInputChange('role', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social">
                <Card>
                  <CardContent className="space-y-6 p-6">
                    {[
                      {
                        icon: Globe,
                        placeholder: 'https://yourwebsite.com',
                        field: 'website',
                      },
                      {
                        icon: Linkedin,
                        placeholder: 'LinkedIn profile URL',
                        field: 'linkedin',
                      },
                      {
                        icon: Github,
                        placeholder: 'GitHub profile URL',
                        field: 'github',
                      },
                      {
                        icon: Twitter,
                        placeholder: 'Twitter profile URL',
                        field: 'twitter',
                      },
                    ].map(({ icon: Icon, placeholder, field }) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Icon className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                        <Input
                          placeholder={placeholder}
                          value={profileData[field]}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                          className="flex-grow"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardContent className="space-y-6 p-6">
                    <ScrollArea className="h-[400px] pr-4">
                      {profileData.experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-muted relative mb-4 rounded-lg p-4"
                        >
                          <div className="space-y-4">
                            <Input
                              placeholder="Job Title"
                              value={exp.title}
                              onChange={(e) => {
                                const newExperiences = [
                                  ...profileData.experiences,
                                ];
                                newExperiences[index].title = e.target.value;
                                handleInputChange(
                                  'experiences',
                                  newExperiences,
                                );
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
                                handleInputChange(
                                  'experiences',
                                  newExperiences,
                                );
                              }}
                            />
                            <Input
                              placeholder="Period (e.g., Jan 2020 - Present)"
                              value={exp.period}
                              onChange={(e) => {
                                const newExperiences = [
                                  ...profileData.experiences,
                                ];
                                newExperiences[index].period = e.target.value;
                                handleInputChange(
                                  'experiences',
                                  newExperiences,
                                );
                              }}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </ScrollArea>
                    <Button onClick={addExperience} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
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
                    <Button
                      variant="outline"
                      onClick={addSkill}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Skill
                    </Button>
                    <Textarea
                      placeholder="List your key achievements..."
                      value={profileData.achievements}
                      onChange={(e) =>
                        handleInputChange('achievements', e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume">
                <Card>
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Resume</h3>
                        <p className="text-muted-foreground text-sm">
                          Upload your latest resume
                        </p>
                      </div>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Upload Resume
                      </Button>
                    </div>
                    {profileData.resume && (
                      <div className="bg-muted flex items-center justify-between rounded-lg p-4">
                        <span>{profileData.resume}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardContent className="space-y-6 p-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Theme</h3>
                      <Select
                        value={profileData?.preferences?.theme}
                        onValueChange={(value) =>
                          handleInputChange('preferences', {
                            ...profileData.preferences,
                            theme: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <p className="text-muted-foreground text-sm">
                          Receive email notifications
                        </p>
                      </div>
                      <Switch
                        checked={profileData?.preferences?.notifications}
                        onCheckedChange={(checked) =>
                          handleInputChange('preferences', {
                            ...profileData.preferences,
                            notifications: checked,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
