'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building2, Clock, MapPin, Upload } from 'lucide-react';
import { useState } from 'react';

const jobCategories = [
  { icon: Briefcase, label: 'Full-time', count: '1.2k' },
  { icon: Building2, label: 'Remote', count: '854' },
  { icon: Clock, label: 'Contract', count: '430' },
];

const featuredJobs = [
  {
    title: 'Senior Product Designer',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    posted: '2 hours ago',
  },
  {
    title: 'Frontend Developer',
    company: 'Spotify',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $110k',
    posted: '5 hours ago',
  },
];

export default function JobFilter() {
  const [activeTab, setActiveTab] = useState('for-you');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Find Your Dream Job
          </h1>
          <p className="font-[500] text-text6">
            Discover opportunities that match your experience
          </p>
        </div>

        {/* Search and Location Section */}
        <div className="mx-auto mb-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <Card className="group rounded-md transition-all duration-150 focus-within:border focus-within:border-theme1">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="flex-1 bg-transparent text-sm text-white outline-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-md transition-all duration-150 focus-within:border focus-within:border-theme1">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 bg-transparent text-sm text-white outline-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Resume Section */}
        <div className="mb-8 text-center">
          <Button className="inline-flex items-center gap-2 rounded px-6 py-3 text-theme1">
            <Upload className="h-4 w-4" />
            <span>Upload your resume - let employers find you</span>
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="justify-left mb-6 flex gap-8">
          {[
            { id: 'for-you', label: 'For You' },
            { id: 'your-activity', label: 'Your Activity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
