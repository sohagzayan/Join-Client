'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { InputField } from '@/components/common';
import TextArea from '@/components/common/text-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// / Define WorkExperience type
type WorkExperience = {
  id: string;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  candidateId: number;
};

// Define Props for WorkExperienceComponent
type WorkExperienceComponentProps = {
  addWorkExperience: (e: React.FormEvent) => void;
  workExperience: WorkExperience[];
  removeWorkExperience: (id: string) => void;
  handleInputChange: (
    id: string,
    field: keyof WorkExperience,
    value: string,
  ) => void;
  handleSaveExperience: (e: React.FormEvent) => void;
};

const WorkExperienceComponent: React.FC<WorkExperienceComponentProps> = ({
  addWorkExperience,
  workExperience,
  removeWorkExperience,
  handleInputChange,
  handleSaveExperience,
}) => {
  // console.log(workExperience?.length, 'just for test');
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </div>
          <Button onClick={addWorkExperience} variant="outline" size="sm">
            Add Experience
          </Button>
        </div>

        <AnimatePresence>
          {workExperience.map((exp: any) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-4 rounded-lg border p-4"
            >
              <div className="flex justify-end">
                {workExperience?.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button" // Prevents the page reload
                    onClick={() => removeWorkExperience(exp.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Company</Label>
                  <InputField
                    placeholder="Company name"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleInputChange(exp.id, 'companyName', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Job Title</Label>
                  <InputField
                    placeholder="Your role"
                    value={exp.title}
                    onChange={(e) =>
                      handleInputChange(exp.id, 'title', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent pl-9 text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <InputField
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange(exp.id, 'startDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <InputField
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange(exp.id, 'endDate', e.target.value)
                    }
                    placeholder="Present"
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <TextArea
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) =>
                    handleInputChange(exp.id, 'description', e.target.value)
                  }
                  className="h-32 rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
      <div className="flex w-full justify-end">
        <Button
          onClick={handleSaveExperience}
          className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
        >
          Save Experience
        </Button>
      </div>
    </Card>
  );
};

export default WorkExperienceComponent;
