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

  const topJobs = jobs_news.slice(0, 3);
  const mostViewedJobs = jobs_news.slice(5, 10);

  const peopleAlsoSearched = [
    'Software Engineer',
    'Data Analyst',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
  ];

  return (
    <div className="sticky left-0 top-5">
      <div>
        <div className="mb-4 flex flex-col rounded-lg bg-[rgba(255,255,255,0.08)]">
          <Card className="border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-theme1">
                <TrendingUp className="mr-2" /> Top Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topJobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="cursor-pointer text-text4 hover:text-theme1"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.title} - {job.company}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-theme1">
                <Eye className="mr-2" /> Most Viewed This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mostViewedJobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="cursor-pointer text-text4 hover:text-theme1"
                    onClick={() => handleJobClick(job)}
                  >
                    {job.title} - {job.company}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-theme1">
                <Search className="mr-2" /> People Also Searched
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {peopleAlsoSearched.map((keyword, index) => (
                  <Badge
                    key={index}
                    className="cursor-pointer border border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] text-gray-200 text-theme1 hover:bg-gray-600"
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
