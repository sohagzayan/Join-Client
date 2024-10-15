import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jobs_news } from '@/utils/data';
import { Badge, Briefcase, DollarSign, MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const JobListings = ({
  searchTerm,
  setSearchTerm,
  showJobModal,
  setShowJobModal,
  setSelectedJob,
  selectedJob,
}: any) => {
  const [currentPage, setCurrentPage] = useState<any>(1);

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
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  useEffect(() => {
    setSelectedJob(jobs_news[0]);
  }, []);

  return (
    <div>
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-blue-400">
            Job Listings ({filteredJobs.length})
          </CardTitle>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px] border-gray-600 bg-gray-700 text-gray-100">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-gray-600 bg-gray-700">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job: any) => (
              <Card
                key={job.id}
                className="cursor-pointer border-gray-600 bg-gray-700 transition-colors hover:bg-gray-600"
                onClick={() => handleJobClick(job)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {job.company}
                    <div className="text-yellow-500 ml-2">
                      {[...Array(Math.floor(job.companyRating))].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="currentColor"
                          className="inline"
                        />
                      ))}
                      <span className="ml-1 text-gray-400">
                        {job.companyRating.toFixed(1)}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {job.salary}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill: any) => (
                      <Badge
                        key={skill}
                        // variant="secondary"
                        className="bg-gray-600 text-gray-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-400">
                  Posted on {new Date(job.postedDate).toLocaleDateString()}
                </CardFooter>
              </Card>
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
