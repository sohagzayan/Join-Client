import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
}

interface ProfileData {
  name: string;
  location: string;
  role: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experiences: Experience[];
  skills: string[];
  achievements: string;
}

const Experience: React.FC = () => {
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

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { title: '', company: '', period: '' },
      ],
    }));
  };

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | Experience[],
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (
    index: number,
    key: keyof Experience,
    value: string,
  ) => {
    const newExperiences = [...profileData.experiences];
    newExperiences[index][key] = value;
    handleInputChange('experiences', newExperiences);
  };

  const removeExperience = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleExperienceChange(index, 'title', e.target.value)
                    }
                    className="font-semibold"
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleExperienceChange(index, 'company', e.target.value)
                    }
                  />
                  <Input
                    placeholder="Period (e.g., Jan 2020 - Present)"
                    value={exp.period}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleExperienceChange(index, 'period', e.target.value)
                    }
                  />
                </div>
                <Button
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
    </div>
  );
};

export default Experience;
