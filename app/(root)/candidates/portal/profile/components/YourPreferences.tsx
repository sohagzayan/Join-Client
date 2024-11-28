'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type Preferences = {
  theme: string;
  notifications: boolean;
};

type ProfileData = {
  name: string;
  location: string;
  role: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experiences: string[];
  skills: string[];
  achievements: string;
  preferences: Preferences;
};

const YourPreferences = () => {
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
    preferences: {
      theme: '',
      notifications: false,
    },
  });

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | Preferences,
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferencesChange = (
    key: keyof Preferences,
    value: string | boolean,
  ) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-6 p-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Theme</h3>
            <Select
              value={profileData.preferences.theme}
              onValueChange={(value) => handlePreferencesChange('theme', value)}
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
              checked={profileData.preferences.notifications}
              onCheckedChange={(checked) =>
                handlePreferencesChange('notifications', checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourPreferences;
