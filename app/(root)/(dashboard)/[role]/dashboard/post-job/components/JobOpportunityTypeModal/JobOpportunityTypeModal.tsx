'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  Globe,
  Plus,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Form validation schema
const formSchema = z.object({
  opportunityType: z.enum(['internship', 'job']),
  jobTitle: z.string().min(3, 'Title must be at least 3 characters'),
  skills: z.string().min(2, 'Please enter at least one skill'),
  locationType: z.string().min(1, 'Please select a location type'),
  workTime: z.string().min(1, 'Please select work time'),
  openings: z.string().min(1, 'Please enter number of openings'),
  countryCode: z.string().default('+088'),
  alternatePhone: z.string().optional(),
  jobDescription: z
    .string()
    .min(10, 'Job description must be at least 10 characters'),
  jobResponsibilities: z
    .string()
    .min(10, 'Job responsibilities must be at least 10 characters'),

  // Internship specific fields
  startDateOption: z.string().optional(),
  startDate: z.date().optional(),
  duration: z.string().optional(),
  durationType: z.string().optional(),
  womenCareer: z.boolean().optional(),

  // Compensation
  stipendType: z.string(),
  stipendCurrency: z.string(),
  stipendAmount: z.string(),
  stipendPeriod: z.string(),

  // CTC
  ctcCurrency: z.string().optional(),
  ctcFrom: z.string().optional(),
  ctcTo: z.string().optional(),
  ctcPeriod: z.string().optional(),

  // Perks
  perks: z.array(z.string()).optional(),

  // Assessment questions
  assessmentQuestions: z
    .array(
      z.object({
        question: z.string().min(5, 'Question must be at least 5 characters'),
      }),
    )
    .optional(),
});

export default function JobPostingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opportunityType: 'internship',
      jobTitle: '',
      skills: '',
      locationType: '',
      workTime: '',
      openings: '',
      countryCode: '+088',
      alternatePhone: '',
      jobDescription: '',
      jobResponsibilities: '',
      startDateOption: 'immediately',
      stipendType: 'fixed',
      stipendCurrency: '$',
      stipendAmount: '',
      stipendPeriod: 'month',
      ctcCurrency: '$',
      ctcPeriod: 'year',
      perks: [],
      assessmentQuestions: [{ question: '' }],
      womenCareer: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'assessmentQuestions',
  });

  const opportunityType = form.watch('opportunityType');
  const startDateOption = form.watch('startDateOption');

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Here you would typically send the data to your API
    alert('Form submitted successfully!');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: 20,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (!mounted) {
    return null;
  }

  // List of perks for checkbox selection
  const perkOptions = [
    { id: 'certificate', label: 'Certificate' },
    { id: 'flexibleHours', label: 'Flexible work hours' },
    { id: 'dressCode', label: 'Informal dress code' },
    { id: 'fiveDays', label: '5 days a week' },
    { id: 'recommendation', label: 'Letter of recommendation' },
    { id: 'snacks', label: 'Free snacks & beverages' },
    { id: 'healthInsurance', label: 'Health Insurance' },
    { id: 'lifeInsurance', label: 'Life Insurance' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="to-purple-500 mb-2 bg-gradient-to-r from-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent"
        >
          Post a New Opportunity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-center text-gray-400"
        >
          Fill in the details below to create your job listing
        </motion.p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Opportunity Type Selector */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden border-[#2a2d3d] bg-[#12141f]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-400" />
                      Opportunity Type
                    </CardTitle>
                    <CardDescription>
                      Select the type of opportunity you want to post
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="opportunityType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative flex h-16 w-full items-center rounded-lg bg-[#1a1d2d] p-2">
                            <motion.div
                              className="to-purple-600/30 absolute z-0 h-12 rounded-md bg-gradient-to-r from-blue-600/30 backdrop-blur-sm"
                              initial={{ x: 0, width: '50%' }}
                              animate={{
                                x: field.value === 'internship' ? 0 : '100%',
                                width: '50%',
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                            <div className="relative z-10 grid w-full grid-cols-2">
                              <button
                                type="button"
                                onClick={() => field.onChange('internship')}
                                className={`flex items-center justify-center gap-2 rounded-md py-2 transition-all ${
                                  field.value === 'internship'
                                    ? 'font-medium text-white'
                                    : 'text-gray-400'
                                }`}
                              >
                                {field.value === 'internship' && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 500,
                                    }}
                                  >
                                    <Check className="h-4 w-4" />
                                  </motion.div>
                                )}
                                <span>Internship</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => field.onChange('job')}
                                className={`flex items-center justify-center gap-2 rounded-md py-2 transition-all ${
                                  field.value === 'job'
                                    ? 'font-medium text-white'
                                    : 'text-gray-400'
                                }`}
                              >
                                {field.value === 'job' && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 500,
                                    }}
                                  >
                                    <Check className="h-4 w-4" />
                                  </motion.div>
                                )}
                                <span>Job</span>
                              </button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Basic Details */}
              <motion.div variants={itemVariants}>
                <Card className="border-[#2a2d3d] bg-[#12141f]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                      Basic Details
                    </CardTitle>
                    <CardDescription>
                      Enter the basic information about the {opportunityType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {opportunityType === 'internship'
                                ? 'Internship Title'
                                : 'Job Title'}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  opportunityType === 'internship'
                                    ? 'e.g., Frontend Development Intern'
                                    : 'e.g., Senior Frontend Developer'
                                }
                                className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Required Skills
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., React, JavaScript, CSS"
                                className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Separate multiple skills with commas
                            </FormDescription>
                            <FormMessage className="text-rose-600" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="locationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {opportunityType === 'internship'
                                ? 'Internship Type'
                                : 'Job Type'}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                <SelectItem value="in-office">
                                  In Office
                                </SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-rose-600" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="workTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Work Time
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                  <SelectValue placeholder="Select work time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                <SelectItem value="full-time">
                                  Full-time
                                </SelectItem>
                                <SelectItem value="part-time">
                                  Part-time
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-rose-600" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="openings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Number of Openings
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="e.g., 5"
                                className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-rose-600" />
                          </FormItem>
                        )}
                      />

                      <FormItem>
                        <FormLabel>Alternate Mobile Number</FormLabel>
                        <div className="flex">
                          <FormField
                            control={form.control}
                            name="countryCode"
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-24 rounded-r-none border-r-0 border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                    <SelectValue placeholder="+088" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                  <SelectItem value="+088">+088</SelectItem>
                                  <SelectItem value="+1">+1</SelectItem>
                                  <SelectItem value="+44">+44</SelectItem>
                                  <SelectItem value="+91">+91</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="alternatePhone"
                            render={({ field }) => (
                              <FormControl>
                                <Input
                                  placeholder="e.g., 9876543210"
                                  className="flex-grow rounded-l-none border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                  {...field}
                                />
                              </FormControl>
                            )}
                          />
                        </div>
                        <FormMessage className="text-rose-600" />
                      </FormItem>
                    </div>

                    {/* Job Description */}
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {opportunityType === 'internship'
                              ? 'Internship Description'
                              : 'Job Description'}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              //@ts-ignore
                              placeholder={`Describe the ${opportunityType} in detail, including the purpose and objectives.`}
                              className="min-h-[100px] border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-600" />
                        </FormItem>
                      )}
                    />

                    {/* Job Responsibilities */}
                    <FormField
                      control={form.control}
                      name="jobResponsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {opportunityType === 'internship'
                              ? 'Intern Responsibilities'
                              : 'Job Responsibilities'}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              //@ts-ignore
                              placeholder={`List the key responsibilities for this ${opportunityType}.`}
                              className="min-h-[100px] border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            You can use bullet points (•) to list
                            responsibilities
                          </FormDescription>
                          <FormMessage className="text-rose-600" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Internship Details */}
              <AnimatePresence mode="wait">
                {opportunityType === 'internship' && (
                  <motion.div
                    key="internship-details"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Card className="border-[#2a2d3d] bg-[#12141f]">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <ClipboardList className="h-5 w-5 text-blue-400" />
                          Internship Details
                        </CardTitle>
                        <CardDescription>
                          Specify the duration and start date of the internship
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="startDateOption"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>
                                  Internship Start Date
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-3"
                                  >
                                    <div className="flex items-center space-x-2 rounded-md border border-[#2a2d3d] bg-[#1a1d2d]/50 p-3">
                                      <RadioGroupItem
                                        value="immediately"
                                        id="immediately"
                                        className="border-blue-500 text-blue-500"
                                      />
                                      <Label
                                        htmlFor="immediately"
                                        className="flex-1 cursor-pointer"
                                      >
                                        Immediately (within next 30 days)
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-md border border-[#2a2d3d] bg-[#1a1d2d]/50 p-3">
                                      <RadioGroupItem
                                        value="later"
                                        id="later"
                                        className="border-blue-500 text-blue-500"
                                      />
                                      <Label
                                        htmlFor="later"
                                        className="flex-1 cursor-pointer"
                                      >
                                        Later
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-rose-600" />
                              </FormItem>
                            )}
                          />

                          {startDateOption === 'later' && (
                            <FormField
                              control={form.control}
                              name="startDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col pt-8">
                                  <FormControl>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full justify-start border-[#2a2d3d] bg-[#1a1d2d] text-left font-normal hover:bg-[#1a1d2d]/80"
                                        >
                                          {field.value ? (
                                            format(field.value, 'PPP')
                                          ) : (
                                            <span className="text-muted-foreground">
                                              Pick a date
                                            </span>
                                          )}
                                          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto border-[#2a2d3d] bg-[#1a1d2d] p-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          initialFocus
                                          className="bg-[#1a1d2d]"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  <FormMessage className="text-rose-600" />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <FormLabel>
                              Internship Duration
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 3"
                                        className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-600" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="durationType"
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                          <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                        <SelectItem value="months">
                                          Months
                                        </SelectItem>
                                        <SelectItem value="years">
                                          Years
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage className="text-rose-600" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="womenCareer"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#2a2d3d] bg-[#1a1d2d]/50 p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Women Career Restart</FormLabel>
                                  <FormDescription className="text-xs">
                                    Allow applications from women willing to
                                    start/restart their career.{' '}
                                    <span className="cursor-pointer text-blue-400 underline">
                                      Know more
                                    </span>
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-500"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Compensation Details */}
              <motion.div variants={itemVariants}>
                <Card className="border-[#2a2d3d] bg-[#12141f]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-400" />
                      Compensation Details
                    </CardTitle>
                    <CardDescription>
                      Specify the compensation and perks for this opportunity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <FormLabel>
                        {opportunityType === 'internship'
                          ? 'Stipend'
                          : 'Salary'}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="stipendType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap gap-3"
                              >
                                {[
                                  { value: 'fixed', label: 'Fixed' },
                                  {
                                    value: 'negotiable',
                                    label: 'Negotiable',
                                  },
                                  {
                                    value: 'performance-based',
                                    label: 'Performance based',
                                  },
                                  {
                                    value: 'unpaid',
                                    label: '  label: "Performance based',
                                  },
                                  { value: 'unpaid', label: 'Unpaid' },
                                ].map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2 rounded-full border border-[#2a2d3d] bg-[#1a1d2d]/50 px-4 py-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={option.value}
                                      className="border-blue-500 text-blue-500"
                                    />
                                    <Label
                                      htmlFor={option.value}
                                      className="cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-rose-600" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 sm:col-span-2">
                          <FormField
                            control={form.control}
                            name="stipendCurrency"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                      <SelectValue placeholder="$" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                    <SelectItem value="$">$</SelectItem>
                                    <SelectItem value="₹">₹</SelectItem>
                                    <SelectItem value="€">€</SelectItem>
                                    <SelectItem value="£">£</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-8">
                          <FormField
                            control={form.control}
                            name="stipendAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., 10000"
                                    className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-rose-600" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                          <FormField
                            control={form.control}
                            name="stipendPeriod"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                      <SelectValue placeholder="/month" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                    <SelectItem value="month">
                                      /month
                                    </SelectItem>
                                    <SelectItem value="year">/year</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {opportunityType === 'job' && (
                      <div className="space-y-4">
                        <FormLabel>
                          CTC (Cost to Company)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-3 sm:col-span-2">
                            <FormField
                              control={form.control}
                              name="ctcCurrency"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                        <SelectValue placeholder="$" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                      <SelectItem value="$">$</SelectItem>
                                      <SelectItem value="₹">₹</SelectItem>
                                      <SelectItem value="€">€</SelectItem>
                                      <SelectItem value="£">£</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-4">
                            <FormField
                              control={form.control}
                              name="ctcFrom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="From"
                                      className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                      type="number"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-rose-600" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-4">
                            <FormField
                              control={form.control}
                              name="ctcTo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="To"
                                      className="border-[#2a2d3d] bg-[#1a1d2d] focus:border-blue-500 focus:ring-blue-500/20"
                                      type="number"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-rose-600" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-2">
                            <FormField
                              control={form.control}
                              name="ctcPeriod"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="border-[#2a2d3d] bg-[#1a1d2d] focus:ring-blue-500/20">
                                        <SelectValue placeholder="/year" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                                      <SelectItem value="month">
                                        /month
                                      </SelectItem>
                                      <SelectItem value="year">
                                        /year
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="perks"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">
                                Perks (Optional)
                              </FormLabel>
                              <FormDescription>
                                Select the perks that come with this opportunity
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              {perkOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="perks"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 transition-colors hover:bg-[#1a1d2d]/50"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
                                                    ),
                                                  );
                                            }}
                                            className="border-[#2a2d3d] data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                                          />
                                        </FormControl>
                                        <FormLabel className="cursor-pointer font-normal">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Assessment Questions */}
              <motion.div variants={itemVariants}>
                <Card className="border-[#2a2d3d] bg-[#12141f]">
                  <CardHeader className="pb-3">
                    <div className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-blue-400" />
                        Assessment Questions
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => append({ question: '' })}
                              className="to-purple-600 hover:to-purple-700 border-0 bg-gradient-to-r from-blue-600 text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:shadow-lg"
                            >
                              <Plus className="mr-1 h-4 w-4" /> Add Question
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="border-[#2a2d3d] bg-[#1a1d2d]">
                            <p>Add custom questions for applicants</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Create custom questions to assess candidates during the
                      application process
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fields.length === 0 ? (
                      <Alert className="border-[#2a2d3d] bg-[#1a1d2d]/50">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-sm text-gray-400">
                          No assessment questions added yet. Click the Add
                          Question button to create your first question.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 25,
                            }}
                            className="relative"
                          >
                            <div className="to-purple-500 absolute -left-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 font-medium text-white shadow-lg">
                              {index + 1}
                            </div>
                            <div className="relative flex gap-2 rounded-lg border border-[#2a2d3d] bg-[#1a1d2d] p-4 pl-8">
                              <FormField
                                control={form.control}
                                name={`assessmentQuestions.${index}.question`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        //@ts-ignore
                                        placeholder="Enter your question here..."
                                        className="min-h-[80px] resize-none border-[#2a2d3d] bg-[#12141f] focus:border-blue-500 focus:ring-blue-500/20"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-rose-600" />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="hover:bg-red-500/20 hover:text-red-400 h-10 w-10 shrink-0 rounded-full transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex justify-end gap-4 pt-4"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-[#2a2d3d] bg-[#1a1d2d] text-gray-300 hover:bg-[#1a1d2d]/80"
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="to-purple-600 hover:to-purple-700 border-0 bg-gradient-to-r from-blue-600 text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:shadow-lg"
                >
                  Post Opportunity
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
