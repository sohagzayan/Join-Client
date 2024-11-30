'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  jobSearchStatus: z.string({
    required_error: 'Please select your job search status',
  }),
  usWorkAuth: z.boolean(),
  visaSponsorship: z.boolean(),
  jobType: z.string({
    required_error: 'Please select a job type',
  }),
  additionalTypes: z.array(z.string()).optional(),
  location: z.string().optional(),
  remoteWork: z.boolean().optional(),
  salary: z.object({
    currency: z.string(),
    amount: z.string().regex(/^\d+$/, 'Must be a valid number'),
  }),
  companySizes: z.array(
    z.object({
      size: z.string(),
      preference: z.enum(['ideal', 'yes', 'no']),
    }),
  ),
});

const companySizeOptions = [
  { label: 'Seed (1 - 10 employees)', value: 'seed' },
  { label: 'Early (11 - 50 employees)', value: 'early' },
  { label: 'Mid-size (51 - 200 employees)', value: 'midsize' },
  { label: 'Large (201 - 500 employees)', value: 'large' },
  { label: 'Very Large (501 - 1000 employees)', value: 'verylarge' },
  { label: 'Massive (1001+ employees)', value: 'massive' },
];

const profileStatus = [
  'Open to offers',
  'Actively looking',
  'Passively looking',
];

export default function JobPreferencesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobSearchStatus: 'open',
      usWorkAuth: false,
      visaSponsorship: false,
      jobType: 'fulltime',
      additionalTypes: [],
      remoteWork: false,
      salary: {
        currency: 'USD',
        amount: '70000',
      },
      companySizes: companySizeOptions.map((size) => ({
        size: size.value,
        preference: 'no',
      })),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto max-w-5xl p-4 text-white md:p-8"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <FormField
                  control={form.control}
                  name="jobSearchStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Where are you in job search?
                      </FormLabel>
                      <FormDescription>
                        Your current company will never see that you are looking
                        for a job.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-opacity-20 bg-gray-800 text-white">
                          <SelectItem value="open">Open to offers</SelectItem>
                          <SelectItem value="active">
                            Actively looking
                          </SelectItem>
                          <SelectItem value="passive">
                            Passively looking
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <FormField
                  control={form.control}
                  name="usWorkAuth"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base font-semibold">
                        US Work Authorization
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === 'true')
                          }
                          defaultValue={field.value ? 'true' : 'false'}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="true" id="auth-yes" />
                            <label htmlFor="auth-yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="false" id="auth-no" />
                            <label htmlFor="auth-no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        What type of job are you interested in?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-opacity-20 bg-gray-800 text-white">
                          <SelectItem value="fulltime">
                            Full-time Employee
                          </SelectItem>
                          <SelectItem value="contract">Contractor</SelectItem>
                          <SelectItem value="intern">Intern</SelectItem>
                          <SelectItem value="cofounder">Co-founder</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        What locations do you want to work in?
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                          <Input
                            placeholder="e.g. San Francisco"
                            className="border-opacity-20 bg-gray-800 pl-8 text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        What is your desired salary?
                      </FormLabel>
                      <FormDescription>
                        Let companies know how much you would like to earn
                        annually.
                      </FormDescription>
                      <div className="flex space-x-2">
                        <Select
                          onValueChange={(value) =>
                            field.onChange({ ...field.value, currency: value })
                          }
                          defaultValue={field.value.currency}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-opacity-20 bg-gray-800 text-white">
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Amount"
                            className="border-opacity-20 bg-gray-800 pl-8 text-white"
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                amount: e.target.value,
                              })
                            }
                            value={field.value.amount}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                <FormLabel className="mb-4 block text-base font-semibold">
                  Would you like to work at companies of these sizes?
                </FormLabel>
                <div className="grid gap-4">
                  {companySizeOptions.map((size, index) => (
                    <motion.div
                      key={size.value}
                      {...fadeInUp}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <span className="font-medium">{size.label}</span>
                      <RadioGroup
                        onValueChange={(value) => {
                          const newSizes = [...form.getValues('companySizes')];
                          newSizes[index] = {
                            size: size.value,
                            preference: value as 'ideal' | 'yes' | 'no',
                          };
                          form.setValue('companySizes', newSizes);
                        }}
                        defaultValue={form.getValues(
                          `companySizes.${index}.preference`,
                        )}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="ideal"
                            id={`${size.value}-ideal`}
                          />
                          <label htmlFor={`${size.value}-ideal`}>Ideal</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="yes"
                            id={`${size.value}-yes`}
                          />
                          <label htmlFor={`${size.value}-yes`}>Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`${size.value}-no`} />
                          <label htmlFor={`${size.value}-no`}>No</label>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button type="submit" className="cursor-pointer bg-theme1">
                  Save Preferences
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
