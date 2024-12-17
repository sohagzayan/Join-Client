'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const DemoGraph = () => {
  const [pronouns, setPronouns] = useState('');
  const [showDemographics, setShowDemographics] = useState(false);

  const handleSave = () => {
    const demographicsData = {
      pronouns,
      showDemographics,
    };
    console.log('Demographics Data:', demographicsData);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Demographics</h2>
        <div className="space-y-6">
          {/* Pronouns Dropdown */}
          <div>
            <Label>Pronouns</Label>
            <Select onValueChange={(value) => setPronouns(value)}>
              <SelectTrigger className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]">
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                <SelectItem value="he/him">he/him</SelectItem>
                <SelectItem value="she/her">she/her</SelectItem>
                <SelectItem value="they/them">they/them</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display Demographics Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDemographics"
              checked={showDemographics}
              onChange={(e) => setShowDemographics(e.target.checked)}
              className="h-5 w-5 cursor-pointer rounded border-gray-500 bg-transparent text-blue-500 focus:ring focus:ring-blue-500"
            />
            <Label htmlFor="showDemographics" className="text-[#f5f5f5]">
              Display demographics on profile
            </Label>
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
          Save Demographics
        </button>
      </div>
    </Card>
  );
};

export default DemoGraph;
