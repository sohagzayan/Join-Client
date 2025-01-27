'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
    ArrowLeft,
    Bookmark,
    Briefcase,
    Building2,
    Calendar,
    MoreVertical,
    Star,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  company: {
    name: string;
    logo: string;
    rating: number;
    size: string;
    type: string;
    sector: string;
    founded: number;
    revenue: string;
    ratings: {
      overall: number;
      career: number;
      compensation: number;
      culture: number;
      management: number;
      workLife: number;
    };
  };
  title: string;
  location: string;
  salary: {
    min: number;
    max: number;
    median: number;
  };
  description: string;
  postedAt: string;
  benefits: {
    rating: number;
    totalRatings: number;
    reviews: {
      rating: number;
      position: string;
      location: string;
      comment: string;
      date: string;
    }[];
  };
}

const mockJobs: Job[] = [
  {
    id: '1',
    company: {
      name: 'Seattle Bank',
      logo: '/placeholder.svg',
      rating: 2.8,
      size: '51 to 200 Employees',
      type: 'Company - Private',
      sector: 'Financial Services',
      founded: 1944,
      revenue: 'Unknown / Non-Applicable',
      ratings: {
        overall: 2.8,
        career: 2.5,
        compensation: 3.0,
        culture: 2.8,
        management: 2.6,
        workLife: 3.0,
      },
    },
    title: 'Software Engineer',
    location: 'Seattle, WA',
    salary: {
      min: 115000,
      max: 140000,
      median: 128000,
    },
    description: `Seattle Bank is a locally owned, digitally driven financial institution that provides personal, business and partner banking services and the website, CD Valet®. Our experienced team and open API, cloud-based core technology platform deliver a boutique bank experience for clients with interwoven personal and business financial needs.

    We are seeking a highly skilled Software Engineer to join our growing team. The ideal candidate will have strong experience with modern web technologies and a passion for building scalable financial applications.
    
    Key Responsibilities:
    - Develop and maintain web applications using React and TypeScript
    - Collaborate with cross-functional teams to deliver high-quality solutions
    - Participate in code reviews and technical discussions
    - Write clean, maintainable, and well-tested code`,
    postedAt: '2d',
    benefits: {
      rating: 4.7,
      totalRatings: 3,
      reviews: [
        {
          rating: 4,
          position: 'Former VP',
          location: 'Seattle, WA, Washington State',
          comment: 'Competitive compensation and good work-life balance',
          date: 'Jul 3, 2022',
        },
      ],
    },
  },
  {
    id: '2',
    company: {
      name: 'Seattle Bank 2',
      logo: '/placeholder.svg',
      rating: 2.8,
      size: '51 to 200 Employees',
      type: 'Company - Private',
      sector: 'Financial Services',
      founded: 1944,
      revenue: 'Unknown / Non-Applicable',
      ratings: {
        overall: 2.8,
        career: 2.5,
        compensation: 3.0,
        culture: 2.8,
        management: 2.6,
        workLife: 3.0,
      },
    },
    title: 'Software Engineer 2',
    location: 'Seattle, WA',
    salary: {
      min: 115000,
      max: 140000,
      median: 128000,
    },
    description: `Seattle Bank is a locally owned, digitally driven financial institution that provides personal, business and partner banking services and the website, CD Valet®. Our experienced team and open API, cloud-based core technology platform deliver a boutique bank experience for clients with interwoven personal and business financial needs.

    We are seeking a highly skilled Software Engineer to join our growing team. The ideal candidate will have strong experience with modern web technologies and a passion for building scalable financial applications.
    
    Key Responsibilities:
    - Develop and maintain web applications using React and TypeScript
    - Collaborate with cross-functional teams to deliver high-quality solutions
    - Participate in code reviews and technical discussions
    - Write clean, maintainable, and well-tested code`,
    postedAt: '2d',
    benefits: {
      rating: 4.7,
      totalRatings: 3,
      reviews: [
        {
          rating: 4,
          position: 'Former VP',
          location: 'Seattle, WA, Washington State',
          comment: 'Competitive compensation and good work-life balance',
          date: 'Jul 3, 2022',
        },
      ],
    },
  },
  // Add more mock jobs as needed
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState<Job>(mockJobs[0]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showStickyApply, setShowStickyApply] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowStickyApply(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    if (isMobileView) {
      setShowDetails(true);
    }
  };

  const handleBack = () => {
    setShowDetails(false);
  };

  const JobList = ({
    jobs,
    selectedJobId,
    onSelectJob,
  }: {
    jobs: Job[];
    selectedJobId: string;
    onSelectJob: (job: Job) => void;
  }) => (
    <div className="space-y-4 p-4">
      {jobs.map((job) => (
        <Card
          key={job.id}
          onClick={() => onSelectJob(job)}
          className={cn(
            'cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99]',
            selectedJobId === job.id ? 'border-primary shadow-md' : '',
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={job.company.logo || '/placeholder.svg'}
                    alt={`${job.company.name} logo`}
                    className="bg-background h-12 w-12 rounded-lg border object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{job.company.name}</span>
                    <div className="flex items-center">
                      <Star className="fill-primary text-primary h-4 w-4" />
                      <span className="ml-1 text-sm">{job.company.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {job.location}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {formatCurrency(job.salary.min)} -{' '}
                      {formatCurrency(job.salary.max)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-muted-foreground whitespace-nowrap text-sm">
                  {job.postedAt}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle bookmark
                  }}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const JobDetails = ({ job }: { job: Job }) => (
    <div className="relative mx-auto max-w-3xl">
      {showStickyApply && (
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 top-0 z-10 border-b p-4 backdrop-blur transition-all duration-200 animate-in fade-in slide-in-from-top">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <h2 className="truncate font-semibold">{job.title}</h2>
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Easy Apply
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6 p-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={job.company.logo || '/placeholder.svg'}
                    alt={`${job.company.name} logo`}
                    className="bg-background h-16 w-16 rounded-lg border object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{job.company.name}</span>
                    <div className="flex items-center">
                      <Star className="fill-primary text-primary h-4 w-4" />
                      <span className="ml-1">{job.company.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.location}</Badge>
                    <Badge variant="secondary">
                      {formatCurrency(job.salary.min)} -{' '}
                      {formatCurrency(job.salary.max)}
                    </Badge>
                    <Badge variant="secondary">{job.postedAt}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:flex-col">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button className="flex-1 sm:flex-none">
                  <Zap className="mr-2 h-4 w-4" />
                  Easy Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Base pay range</h2>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatCurrency(job.salary.min)} -{' '}
                {formatCurrency(job.salary.max)}
                <span className="text-muted-foreground ml-1 text-base font-normal">
                  /yr
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {formatCurrency(job.salary.median)}
                </span>
                <span className="text-muted-foreground">/yr Median</span>
              </div>
              <div className="text-muted-foreground text-sm">
                {job.location}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Company overview</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Users className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">Size</div>
                  <div>{job.company.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">Founded</div>
                  <div>{job.company.founded}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">Type</div>
                  <div>{job.company.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">Industry</div>
                  <div>{job.company.sector}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Company ratings</h2>
            <div className="space-y-4">
              {Object.entries(job.company.ratings).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">
                      {key === 'workLife' ? 'Work/Life Balance' : key}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                  <Progress value={value * 20} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {job.benefits.reviews.length > 0 && (
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Benefits</h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.floor(job.benefits.rating)
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted-foreground',
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{job.benefits.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({job.benefits.totalRatings} ratings)
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {job.benefits.reviews.map((review, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < review.rating
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted-foreground',
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {review.position} in {review.location}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="text-muted-foreground text-sm">
                      {review.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  if (isMobileView) {
    return (
      <div className="bg-background flex h-screen flex-col">
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20 border-b backdrop-blur">
          <div className="flex items-center gap-2 p-4">
            {showDetails ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            ) : null}
            <h1 className="flex-1 truncate text-lg font-semibold">
              {showDetails ? selectedJob.company.name : 'Job Search'}
            </h1>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div
            className={cn(
              'transition-[transform,opacity] duration-300',
              showDetails
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0',
            )}
          >
            {showDetails && <JobDetails job={selectedJob} />}
          </div>
          <div
            className={cn(
              'transition-[transform,opacity] duration-300',
              !showDetails
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0',
            )}
          >
            {!showDetails && (
              <JobList
                jobs={mockJobs}
                selectedJobId={selectedJob.id}
                onSelectJob={handleSelectJob}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-screen">
      <div className="flex w-[440px] flex-col overflow-hidden border-r">
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold">Job Search</h1>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <JobList
            jobs={mockJobs}
            selectedJobId={selectedJob.id}
            onSelectJob={handleSelectJob}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
}
