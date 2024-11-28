import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface ProfileData {
  name: string;
  location: string;
  role: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experiences: string[]; // Assuming it's an array of strings
  skills: string[]; // Assuming it's an array of strings
  achievements: string;
}

interface SocialLink {
  icon: any; // Type for SVG icons
  placeholder: string;
  field: keyof ProfileData; // Ensure field matches ProfileData keys
}

const socialLink: SocialLink[] = [
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
];

const SocialInfo: React.FC = () => {
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

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange =
    (field: keyof ProfileData) => (e: ChangeEvent<HTMLInputElement>) => {
      handleInputChange(field, e.target.value);
    };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {socialLink.map(({ icon: Icon, placeholder, field }) => (
          <div key={field} className="flex items-center space-x-2">
            <Icon className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            <Input
              placeholder={placeholder}
              value={profileData[field]}
              onChange={handleChange(field)}
              className="flex-grow"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SocialInfo;
