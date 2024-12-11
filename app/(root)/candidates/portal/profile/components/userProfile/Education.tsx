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

// Define Props for Education Component
type EducationProps = {
  education: EducationItem[];
  addEducation: () => void;
  removeEducation: (id: string) => void;
};

// Education component
const Education: React.FC<EducationProps> = ({
  education,
  addEducation,
  removeEducation,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>

        <AnimatePresence>
          {education.map((edu: EducationItem) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-4 rounded-lg border p-4"
            >
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>School</Label>
                  <InputField
                    placeholder="University/College name"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">Bachelor{"'"}s</SelectItem>
                      <SelectItem value="masters">Master{"'"}s</SelectItem>
                      <SelectItem value="phd">Ph.D.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <InputField
                    placeholder="Major/Concentration"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <InputField
                    placeholder="e.g. 3.8"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <InputField
                    type="month"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <InputField
                    type="month"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default Education;
