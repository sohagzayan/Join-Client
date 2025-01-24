'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { useGetCurrentUserQuery } from '@/redux/features/auth/authentication';
import {
  useAddEducationsMutation,
  useDeleteEducationsMutation,
  useGetEducationsQuery,
  useUpdateEducationsMutation,
} from '@/redux/features/profile/addEducation/addEducationApi';
import { useGetProfileQuery } from '@/redux/features/profile/profileApi';
import { parseCookies } from 'nookies';
import { toast } from 'sonner';

// Define Education type
type EducationItem = {
  id: string;
  schoolName?: string;
  degree?: string;
  fieldOfStudy?: string;
  grade?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  candidateId?: string;
  isLocal?: boolean; // Only used locally to distinguish unsaved entries
};

const Education = () => {
  const cookies = parseCookies();
  const token = cookies['auth_token'];
  const { data: currentUser } = useGetCurrentUserQuery(
    token ? { token } : { token: '' },
    { skip: !token },
  );

  const { data: profileInfo } = useGetProfileQuery<any>({});
  const { data: educationInfo }: any = useGetEducationsQuery({});
  const [addEducationMutation] = useAddEducationsMutation();
  const [updateEducationMutation] = useUpdateEducationsMutation();
  const [deleteEducationMutation] = useDeleteEducationsMutation();

  const [education, setEducation] = useState<EducationItem[]>([]);

  useEffect(() => {
    if (educationInfo?.data) {
      const mappedEducation = educationInfo.data.map((edu: any) => ({
        id: edu.id,
        schoolName: edu.schoolName || '',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        grade: edu.grade || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        description: edu.description || '',
        candidateId: edu.candidateId || '',
        isLocal: false, // Mark fetched entries as not local
      }));
      setEducation(mappedEducation);
    }
  }, [educationInfo]);

  useEffect(() => {
    if (profileInfo?.data?.[0]?.id) {
      setEducation((prevEducation) =>
        prevEducation.map((edu) => ({
          ...edu,
          candidateId: profileInfo.data[0].id,
        })),
      );
    }
  }, [profileInfo]);

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: String(Date.now()), // Generate unique ID locally
        schoolName: '',
        degree: '',
        fieldOfStudy: '',
        grade: '',
        startDate: '',
        endDate: '',
        description: '',
        candidateId: profileInfo?.data?.[0]?.id || '',
        isLocal: true, // Mark as local (unsaved)
      },
    ]);
  };

  const updateEducationField = (
    id: string,
    field: keyof EducationItem,
    value: string,
  ) => {
    setEducation((prev) =>
      prev.map((edu) => {
        if (edu.id === id) {
          if (field === 'startDate' || field === 'endDate') {
            return {
              ...edu,
              [field]: new Date(value).toISOString(),
            };
          }
          return {
            ...edu,
            [field]: value,
          };
        }
        return edu;
      }),
    );
  };

  const saveEducation = async (educationId: string) => {
    try {
      const educationToSave = education.find((edu) => edu.id === educationId);

      if (!educationToSave) {
        toast.error('Education entry not found!');
        return;
      }

      // Exclude the `id` and `isLocal` fields from the request
      const { id, isLocal, ...dataToSave } = educationToSave;

      if (isLocal) {
        // POST request for new entries
        const response: any = await addEducationMutation({ data: dataToSave });
        toast.success('Education added successfully!');
        // Replace the local entry with the backend response
        setEducation((prev) =>
          prev.map((edu) =>
            edu.id === educationId
              ? { ...response.data, isLocal: false } // Use backend-generated ID
              : edu,
          ),
        );
      } else {
        // PATCH request for existing entries
        await updateEducationMutation({
          educationId,
          data: dataToSave,
        });
        toast.success('Education updated successfully!');
      }
    } catch (error) {
      toast.error('Error saving education entry!');
      console.error(error);
    }
  };

  const deleteEducation = async (educationId: string) => {
    try {
      const educationToDelete = education.find((edu) => edu.id === educationId);

      if (!educationToDelete) {
        toast.error('Education entry not found!');
        return;
      }

      if (!educationToDelete.isLocal) {
        // Only delete from the backend for existing entries
        await deleteEducationMutation({ educationId });
        toast.success('Education deleted successfully!');
      }

      // Remove the entry from the local state
      setEducation((prev) => prev.filter((edu) => edu.id !== educationId));
    } catch (error) {
      toast.error('Error deleting education entry!');
      console.error(error);
    }
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
                    onClick={() => deleteEducation(edu.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>School Name</Label>
                  <InputField
                    placeholder="University/College name"
                    value={edu.schoolName || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'schoolName', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Select
                    value={edu.degree || undefined}
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
                  <Label>GPA</Label>
                  <InputField
                    placeholder="e.g. 3.8"
                    value={edu.grade || ''}
                    onChange={(e) =>
                      updateEducationField(edu.id, 'grade', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <InputField
                    type="date"
                    value={
                      edu.startDate
                        ? new Date(edu.startDate).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      updateEducationField(edu.id, 'startDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <InputField
                    type="date"
                    value={
                      edu.endDate
                        ? new Date(edu.endDate).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      updateEducationField(edu.id, 'endDate', e.target.value)
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <InputField
                    placeholder="Focused on machine learning, neural networks, etc."
                    value={edu.description || ''}
                    onChange={(e) =>
                      updateEducationField(
                        edu.id,
                        'description',
                        e.target.value,
                      )
                    }
                    className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
                  />
                </div>
              </div>
              <div className="flex w-full justify-end">
                <Button
                  onClick={() => saveEducation(edu.id)}
                  className="mb-3 mr-3 rounded-lg border-2 px-10 py-2"
                  type="button"
                >
                  Save Education
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default Education;
