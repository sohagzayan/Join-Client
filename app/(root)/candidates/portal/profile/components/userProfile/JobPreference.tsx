'use client';

import { InputField } from '@/components/common';
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

const JobPreference = () => {
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [workType, setWorkType] = useState<'remote' | 'relocate' | ''>(
    'remote',
  );
  const [noticePeriod, setNoticePeriod] = useState('');

  const handleSave = () => {
    const jobPreferences = {
      salaryMin,
      salaryMax,
      workType,
      noticePeriod,
    };

    console.log('Job Preferences:', jobPreferences);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Job Preferences</h2>
        <div className="space-y-6">
          {/* Salary Expectations */}
          <div>
            <Label>Salary Expectations (Annual)</Label>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="number"
                placeholder="Minimum"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
              />
              <InputField
                type="number"
                placeholder="Maximum"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Work Type Preference */}
          <div>
            <Label>Work Type Preference</Label>
            <div className="mt-2 space-y-2">
              <div
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 ${
                  workType === 'remote' ? 'border-blue-500' : 'border-[#404142]'
                }`}
                onClick={() => setWorkType('remote')}
              >
                <span className="text-[#f5f5f5]">Remote Only</span>
              </div>
              <div
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 ${
                  workType === 'relocate'
                    ? 'border-blue-500'
                    : 'border-[#404142]'
                }`}
                onClick={() => setWorkType('relocate')}
              >
                <span className="text-[#f5f5f5]">Willing to Relocate</span>
              </div>
            </div>
          </div>

          {/* Notice Period */}
          <div>
            <Label>Notice Period</Label>
            <Select onValueChange={(value) => setNoticePeriod(value)}>
              <SelectTrigger className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="2-months">2 Months</SelectItem>
              </SelectContent>
            </Select>
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
          Save Job Preference
        </button>
      </div>
    </Card>
  );
};

export default JobPreference;
