import { Github, Globe, Linkedin } from 'lucide-react';

import { InputField } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';

const SocialLinks = () => {
  return (
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
  );
};

export default SocialLinks;
