'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  MapPin,
  MoreHorizontal,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { Suspense, useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    rating: number;
    employees: string;
    industry: string;
    founded: string;
    description: string;
  };
  location: string;
  salary: string;
  posted: string;
  applicants: number;
  matchPercentage: number;
  workType: string[];
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  grade?: string;
  department?: string;
}

const jobs: Job[] = [
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
  {
    id: '529965',
    title: 'Senior Web Developer',
    company: {
      name: 'TechCorp Solutions',
      logo: '/placeholder.svg?height=50&width=50',
      rating: 4.7,
      employees: '1000-5000',
      industry: 'Information Technology',
      founded: '2005',
      description:
        'Leading technology solutions provider specializing in enterprise software.',
    },
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    posted: '2d ago',
    applicants: 45,
    matchPercentage: 95,
    workType: ['Remote', 'Full-time'],
    experience: '5+ years',
    description:
      'Join our dynamic team of developers working on cutting-edge web applications.',
    requirements: [
      'Expert in React and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong system design skills',
      'Experience with microservices architecture',
    ],
    responsibilities: [
      'Lead development of new features',
      'Mentor junior developers',
      'Architect scalable solutions',
      'Code review and technical documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
    ],
  },
] as const;

function JobCard({
  job,
  selected,
  onSelect,
}: {
  job: Job;
  selected: boolean;
  onSelect: () => void;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
        selected ? 'bg-accent border-primary' : 'bg-card hover:bg-accent/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img
            src={job.company.logo || '/placeholder.svg'}
            alt={`${job.company.name} logo`}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{job.company.name}</h3>
              <div className="text-muted-foreground flex items-center text-sm">
                <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4" />
                <span>{job.company.rating}</span>
              </div>
            </div>
            <h4 className="text-lg font-medium">{job.title}</h4>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          {isBookmarked ? (
            <BookmarkCheck className="text-primary h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary font-semibold">
                {job.matchPercentage}%
              </span>
            </div>
            <span className="text-sm font-medium">Match</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Users className="h-4 w-4" />
            <span>{job.applicants} applied</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {job.workType.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            <span>{job.posted}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function JobDetails({ job }: { job: Job }) {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-start gap-6">
        <img
          src={job.company.logo || '/placeholder.svg'}
          alt={`${job.company.name} logo`}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <div className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium">{job.company.name}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="fill-yellow-400 stroke-yellow-400 mr-1 h-4 w-4" />
                  <span>{job.company.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{job.salary}</div>
              <div className="text-muted-foreground text-sm">
                {job.experience}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.workType.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
            <Badge variant="outline" className="gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="space-y-1 rounded-lg border p-4">
          <div className="text-muted-foreground">Company Size</div>
          <div className="font-medium">{job.company.employees}</div>
        </div>
        <div className="space-y-1 rounded-lg border p-4">
          <div className="text-muted-foreground">Industry</div>
          <div className="font-medium">{job.company.industry}</div>
        </div>
        <div className="space-y-1 rounded-lg border p-4">
          <div className="text-muted-foreground">Founded</div>
          <div className="font-medium">{job.company.founded}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">About {job.company.name}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {job.company.description}
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Job Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Trophy className="h-5 w-5" />
            Requirements
          </h4>
          <ul className="text-muted-foreground list-inside list-disc space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Target className="h-5 w-5" />
            Responsibilities
          </h4>
          <ul className="text-muted-foreground list-inside list-disc space-y-2">
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold">Benefits</h4>
          <div className="grid grid-cols-2 gap-2">
            {job.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="justify-start">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-background sticky bottom-0 border-t pt-4">
        <Button className="w-full" size="lg">
          Apply Now
        </Button>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

function LoadingDetails() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-8 w-[300px]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-40" />
      <Skeleton className="h-60" />
    </div>
  );
}

export default function JobsBoard() {
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.5fr]">
          {/* Job Listings */}
          <div className={`${showMobileDetails ? 'hidden md:block' : ''}`}>
            <ScrollArea className="h-[calc(100vh-10px)]">
              <div className="space-y-4 pr-4">
                <Suspense
                  fallback={
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <LoadingCard key={i} />
                      ))}
                    </div>
                  }
                >
                  <AnimatePresence>
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        selected={selectedJob.id === job.id}
                        onSelect={() => {
                          setSelectedJob(job);
                          setShowMobileDetails(true);
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </Suspense>
              </div>
            </ScrollArea>
          </div>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`bg-background fixed inset-0 z-50 transition-transform duration-300 md:relative md:z-0 ${
              showMobileDetails
                ? 'translate-x-0'
                : 'translate-x-full md:translate-x-0'
            }`}
          >
            <div className="rounded-lg border md:sticky md:top-6">
              <div className="flex items-center justify-between border-b p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setShowMobileDetails(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-64px)] md:h-[calc(100vh-100px)]">
                <Suspense fallback={<LoadingDetails />}>
                  <JobDetails job={selectedJob} />
                </Suspense>
              </ScrollArea>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
