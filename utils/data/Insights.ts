import { JobListing } from '@/data/models/JobInsights';

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    department: 'Engineering',
    views: 1200,
    applications: 45,
    timeToFill: 28,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 2,
    title: 'Product Manager',
    location: 'New York, NY',
    department: 'Product',
    views: 980,
    applications: 32,
    timeToFill: 35,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 3,
    title: 'UX Designer',
    location: 'London, UK',
    department: 'Design',
    views: 750,
    applications: 28,
    timeToFill: 21,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
  {
    id: 4,
    title: 'Data Scientist',
    location: 'Berlin, Germany',
    department: 'Data',
    views: 620,
    applications: 18,
    timeToFill: 42,
    viewsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    })),
    applicationsData: Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 10),
    })),
  },
];
