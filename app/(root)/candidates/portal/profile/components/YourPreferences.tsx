import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const preferenceSchema = z.object({
  jobSearchStatus: z.string().min(1, 'Please select a job search status'),
  usWorkAuth: z.boolean(),
  usVisaSponsorship: z.boolean(),
  jobType: z.string().min(1, 'Select a job type'),
  salary: z.number().positive('Salary must be greater than 0'),
  companySizes: z.array(z.boolean()).min(1, 'Select at least one company size'),
});

type PreferenceFormData = z.infer<typeof preferenceSchema>;

const YourPreferences: React.FC = () => {
  const { control, handleSubmit, register, formState } =
    useForm<PreferenceFormData>({
      resolver: zodResolver(preferenceSchema),
      defaultValues: {
        jobSearchStatus: 'Open to offers',
        usWorkAuth: false,
        usVisaSponsorship: false,
        jobType: 'Full-time Employee',
        salary: 70000,
        companySizes: [],
      },
    });

  const onSubmit = (data: PreferenceFormData) => {
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto rounded-lg p-6 text-white"
    >
      <h1 className="mb-6 text-xl font-bold text-gray-800">User Preferences</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Search Status */}
        <div>
          <label
            htmlFor="jobSearchStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Where are you in job search?
          </label>
          <select
            id="jobSearchStatus"
            className={clsx(
              'w-full rounded-md border p-2',
              formState.errors.jobSearchStatus
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            {...register('jobSearchStatus')}
          >
            <option value="Open to offers">Open to offers</option>
            <option value="Actively looking">Actively looking</option>
          </select>
          {formState.errors.jobSearchStatus && (
            <p className="text-red-500 mt-1 text-sm">
              {formState.errors.jobSearchStatus.message}
            </p>
          )}
        </div>

        {/* US Work Authorization */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            US Work Authorization
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                className="form-radio text-blue-500"
                {...register('usWorkAuth')}
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                className="form-radio text-blue-500"
                {...register('usWorkAuth')}
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Desired Salary */}
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            Desired Salary
          </label>
          <input
            type="number"
            id="salary"
            className={clsx(
              'w-full rounded-md border p-2',
              formState.errors.salary ? 'border-red-500' : 'border-gray-300',
            )}
            {...register('salary', { valueAsNumber: true })}
          />
          {formState.errors.salary && (
            <p className="text-red-500 mt-1 text-sm">
              {formState.errors.salary.message}
            </p>
          )}
        </div>

        {/* Company Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preferred Company Sizes
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Seed',
              'Early',
              'Mid-size',
              'Large',
              'Very Large',
              'Massive',
            ].map((size, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  {...register(`companySizes.${index}` as const)}
                />
                <span className="ml-2 text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white"
          >
            Save Preferences
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default YourPreferences;
