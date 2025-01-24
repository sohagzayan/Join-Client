'use client';

import { InputField } from '@/components/common';
import TextArea from '@/components/common/text-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  useDeleteExperienceMutation,
  useGetAllExperiencesQuery,
  usePostExperienceMutation,
  useUpdateExperienceMutation,
} from '@/redux/features/profile/addExperience/addExperienceApi';
import { useGetProfileQuery } from '@/redux/features/profile/profileApi';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define WorkExperience type
type WorkExperience = {
  id: string;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  candidateId: number;
  isLocal?: boolean; // Only used locally to differentiate unsaved entries
};

const WorkExperienceComponent: React.FC = () => {
  const { data: experienceInfo, isLoading }: any = useGetAllExperiencesQuery(
    {},
  );
  const [postExperience] = usePostExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const { data: profileInfo } = useGetProfileQuery<any>({});

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);

  // Load existing experiences from backend
  useEffect(() => {
    if (experienceInfo?.data?.length > 0) {
      const mappedExperiences = experienceInfo.data.map((exp: any) => ({
        id: exp.id,
        companyName: exp.companyName || '',
        title: exp.title || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        description: exp.description || '',
        candidateId: exp.candidateId || 0,
        isLocal: false, // Mark fetched entries as not local
      }));
      setWorkExperience(mappedExperiences);
    } else {
      // If no experiences, show a default empty field
      setWorkExperience([
        {
          id: String(Date.now()), // Unique ID for default entry
          companyName: '',
          title: '',
          startDate: '',
          endDate: '',
          description: '',
          candidateId: profileInfo?.data?.[0]?.id || 0,
          isLocal: true, // Mark as local
        },
      ]);
    }
  }, [experienceInfo, profileInfo]);

  // Add a new experience entry
  const addWorkExperience = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior
    setWorkExperience((prev) => [
      ...prev,
      {
        id: String(Date.now()), // Use a unique ID locally
        companyName: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        candidateId: profileInfo?.data?.[0]?.id || 0,
        isLocal: true, // Mark as unsaved
      },
    ]);
  };

  // Update a field locally
  const handleInputChange = (
    id: string,
    field: keyof WorkExperience,
    value: string,
  ) => {
    setWorkExperience((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
            }
          : exp,
      ),
    );
  };

  // Save experience (either POST for new or PATCH for existing)
  const handleSaveExperience = async (experienceId: string) => {
    try {
      const experienceToSave = workExperience.find(
        (exp) => exp.id === experienceId,
      );

      if (!experienceToSave) {
        toast.error('Experience entry not found!');
        return;
      }

      // Convert `startDate` and `endDate` to ISO format
      const { id, isLocal, startDate, endDate, ...dataToSave } =
        experienceToSave;
      const payload = {
        ...dataToSave,
        startDate: startDate ? new Date(startDate).toISOString() : null, // Convert to ISO
        endDate: endDate ? new Date(endDate).toISOString() : null, // Convert to ISO
      };

      if (isLocal) {
        // POST request for new experiences
        const response: any = await postExperience({ data: payload });
        toast.success('Experience added successfully!');
        setWorkExperience((prev) =>
          prev.map((exp) =>
            exp.id === experienceId
              ? { ...response.data, isLocal: false } // Update with backend ID
              : exp,
          ),
        );
      } else {
        // PATCH request for existing experiences
        await updateExperience({
          experienceId,
          data: payload,
        });
        toast.success('Experience updated successfully!');
      }
    } catch (error) {
      toast.error('Error saving experience entry!');
      console.error(error);
    }
  };

  // Delete experience entry
  const removeWorkExperience = async (experienceId: string) => {
    try {
      const experienceToDelete = workExperience.find(
        (exp) => exp.id === experienceId,
      );

      if (!experienceToDelete) {
        toast.error('Experience entry not found!');
        return;
      }

      if (!experienceToDelete.isLocal) {
        // Delete only from the backend for existing entries
        await deleteExperience({ experienceId });
        toast.success('Experience deleted successfully!');
      }

      setWorkExperience((prev) =>
        prev.filter((exp) => exp.id !== experienceId),
      );
    } catch (error) {
      toast.error('Error deleting experience entry!');
      console.error(error);
    }
  };

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

        {isLoading && <p>Loading...</p>}

        <AnimatePresence>
          {workExperience.map((exp: WorkExperience) => (
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
                    type="button"
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
                    type="date"
                    value={
                      exp.startDate
                        ? new Date(exp.startDate).toISOString().split('T')[0] // Convert to 'YYYY-MM-DD'
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChange(exp.id, 'startDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <InputField
                    type="date"
                    value={
                      exp.endDate
                        ? new Date(exp.endDate).toISOString().split('T')[0] // Convert to 'YYYY-MM-DD'
                        : ''
                    }
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
              <div className="flex w-full justify-end pt-5">
                <Button
                  onClick={() => handleSaveExperience(exp.id)}
                  className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
                  type="button"
                >
                  Save Experience
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceComponent;
