'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

import { InputField } from '@/components/common';
import { Button } from '@/components/ui/button';
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

// Define Education type
type EducationItem = {
  id: string;
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  gpa?: string;
  startDate?: string;
  endDate?: string;
};

// Education component
const Education = () => {
  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: '1',
      school: '',
      degree: '',
      fieldOfStudy: '',
      gpa: '',
      startDate: '',
      endDate: '',
    },
  ]);

  // Add a new education entry
  const addEducation = () => {
    setEducation([...education, { id: String(Date.now()) }]);
  };

  // Remove an education entry
  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  // Update an education field
  const updateEducationField = (
    id: string,
    field: keyof EducationItem,
    value: string,
  ) => {
    setEducation((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
  };

  // Save Education Data
  const saveEducation = () => {
    console.log('Education Data:', education);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <Button
            onClick={addEducation}
            variant="outline"
            size="sm"
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>

        <AnimatePresence>
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-4 rounded-lg border p-4"
            >
              {education?.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>School</Label>
                  <InputField
                    placeholder="University/College name"
                    value={edu.school || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'school', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Select
                    onValueChange={(value) =>
                      updateEducationField(edu.id, 'degree', value)
                    }
                  >
                    <SelectTrigger className="bg-transparent">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-300">
                      <SelectItem value="bachelors">Bachelors</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">Ph.D.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <InputField
                    placeholder="Major/Concentration"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) =>
                      updateEducationField(
                        edu.id,
                        'fieldOfStudy',
                        e.target.value,
                      )
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <InputField
                    placeholder="e.g. 3.8"
                    value={edu.gpa || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'gpa', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <InputField
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'startDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <InputField
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'endDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
      <div className="flex w-full justify-end">
        <Button
          onClick={saveEducation}
          className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
          type="button"
        >
          Save Education
        </Button>
      </div>
    </Card>
  );
};

export default Education;
