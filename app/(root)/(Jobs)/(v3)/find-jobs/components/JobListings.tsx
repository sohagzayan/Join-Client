import { SelectDropdown } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { jobs_news } from '@/utils/data';
import { useEffect, useState } from 'react';
import JobCard from './JobCard';

const JobListings = ({
  searchTerm,
  setSearchTerm,
  showJobModal,
  setShowJobModal,
  setSelectedJob,
  selectedJob,
}: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false); // Flag to check if component is mounted

  const jobsPerPage = 10;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const filteredJobs = jobs_news.filter(
    (job: any) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill: any) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setIsMounted(true); // Set the flag to true after mounting the component
    if (jobs_news.length > 0) {
      setSelectedJob(jobs_news[0]); // Set the default selected job after the component mounts
    }
  }, []);

  if (!isMounted) {
    // Prevent rendering on server-side or until the component has mounted
    return null;
  }

  const statusOptions = [
    { value: 'beginner', label: 'Relevance' },
    { value: 'intermediate', label: 'Date' },
    { value: 'expert', label: 'salary' },
  ];

  return (
    <div>
      <Card className="border-transparent">
        <CardHeader className="mb-5 flex flex-row items-center justify-between py-0">
          <CardTitle className="text-xl text-theme1">
            Job Listings ({filteredJobs.length})
          </CardTitle>
          <div>
            <SelectDropdown
              placeholder="Sort by"
              selectedClassName="rounded text-sm w-52 py-2 rounded-xl font-semibold"
              options={statusOptions}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {currentJobs.map((job: any) => (
              <JobCard
                key={job.id + 10}
                setSelectedJob={setSelectedJob}
                setShowJobModal={setShowJobModal}
                job={job}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(filteredJobs.length / jobsPerPage) },
            (_, i) => (
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ),
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobListings;
