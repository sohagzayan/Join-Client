'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit2, ExternalLink, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type SocialProfile = {
  id: string;
  platform: string;
  username: string;
  url: string;
};

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
];

export default function ProfessionalSocialAccountManagement() {
  const [profiles, setProfiles] = useState<SocialProfile[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialProfile>();

  const onSubmit = (data: SocialProfile) => {
    if (editingId) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingId ? { ...data, id: editingId } : p,
        ),
      );
      setEditingId(null);
    } else {
      setProfiles([...profiles, { ...data, id: Date.now().toString() }]);
    }
    reset();
  };

  const startEditing = (profile: SocialProfile) => {
    setEditingId(profile.id);
    reset(profile);
  };

  const cancelEditing = () => {
    setEditingId(null);
    reset();
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-transparent p-4 text-gray-100 sm:p-3 md:p-8">
      <div className="mx-auto">
        <Card className="mb-8 shadow-xl">
          <CardContent>
            <Separator className="my-6" />
            <h3 className="mb-4 text-xl font-semibold">Social Profiles</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Controller
                    name="platform"
                    control={control}
                    rules={{ required: 'Platform is required' }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="border-gray-600 bg-gray-700">
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platformOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.platform && (
                    <p className="text-red-500 text-sm">
                      {errors.platform.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="border-gray-600 bg-gray-700"
                        placeholder="Enter your username"
                      />
                    )}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Profile URL</Label>
                <Controller
                  name="url"
                  control={control}
                  rules={{
                    required: 'URL is required',
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
                      message: 'Enter a valid URL',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="border-gray-600 bg-gray-700"
                      placeholder="https://example.com/profile"
                    />
                  )}
                />
                {errors.url && (
                  <p className="text-red-500 text-sm">{errors.url.message}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Add'} Profile
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEditing}
                    className="border-gray-600 bg-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
            <AnimatePresence>
              {profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2 flex items-center justify-between rounded-lg bg-gray-700 p-4"
                >
                  <div>
                    <h3 className="font-semibold">{profile.platform}</h3>
                    <p className="text-sm text-gray-300">{profile.username}</p>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center text-xs text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View Profile
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditing(profile)}
                      className="text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteProfile(profile.id)}
                      className="hover:text-red-400 text-gray-300 hover:bg-gray-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
