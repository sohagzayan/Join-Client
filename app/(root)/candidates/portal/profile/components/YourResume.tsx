'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';

const YourResume = () => {
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
    resume: '',
  });

  return (
    <div>
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
    </div>
  );
};

export default YourResume;
