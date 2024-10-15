import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { jobs_news } from '@/utils/data';
import { Eye, Search, TrendingUp } from 'lucide-react';

const ExtraInformation = ({
  selectedJob,
  setSelectedJob,
  showJobModal,
  setShowJobModal,
  searchTerm,
  setSearchTerm,
}: any) => {
  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const topJobs = jobs_news.slice(0, 5);
  const mostViewedJobs = jobs_news.slice(5, 10);

  const peopleAlsoSearched = [
    'Software Engineer',
    'Data Analyst',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
  ];

  return (
    <div>
      <div>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <TrendingUp className="mr-2" /> Top Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topJobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="cursor-pointer text-gray-300 hover:text-blue-400"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.title} - {job.company}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Eye className="mr-2" /> Most Viewed This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mostViewedJobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="cursor-pointer text-gray-300 hover:text-blue-400"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.title} - {job.company}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Search className="mr-2" /> People Also Searched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {peopleAlsoSearched.map((keyword, index) => (
                  <Badge
                    key={index}
                    className="cursor-pointer bg-gray-700 text-gray-200 hover:bg-gray-600"
                    onClick={() => setSearchTerm(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExtraInformation;
