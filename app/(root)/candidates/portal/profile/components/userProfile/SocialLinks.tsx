'use client';

import { Github, Globe, Linkedin } from 'lucide-react';
import { useState } from 'react';

import { InputField } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';

const SocialLinks = () => {
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const handleSave = () => {
    const socialLinks = {
      linkedin,
      github,
      portfolio,
    };

    console.log('Social Links:', socialLinks);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Social Links</h2>
        <div className="space-y-4">
          {/* LinkedIn URL */}
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>

          {/* GitHub URL */}
          <div className="relative">
            <Github className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="GitHub URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>

          {/* Portfolio URL */}
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <InputField
              placeholder="Portfolio URL"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
            />
          </div>
        </div>
      </CardContent>

      {/* Save Button */}
      <div className="mb-2 mr-2 flex justify-end">
        <button
          onClick={handleSave}
          type="button"
          className="rounded-md border px-4 py-2 text-white"
        >
          Save Social Links
        </button>
      </div>
    </Card>
  );
};

export default SocialLinks;
