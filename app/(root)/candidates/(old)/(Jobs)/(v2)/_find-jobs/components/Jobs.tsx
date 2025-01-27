import { SelectDropdown } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, MessageSquare } from 'lucide-react';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date' },
  { value: 'salary', label: 'Salary' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'experience', label: 'Experience Level' },
  { value: 'location', label: 'Location' },
];

interface JobListingCardProps {
  title: string;
  rate: number;
  company: string;
  location: string;
  replyRate: number;
  description: string;
  tags: string[];
}

const JobListingCard = ({
  title,
  rate,
  company,
  location,
  replyRate,
  description,
  tags,
}: JobListingCardProps) => {
  return (
    <Card className="mb-4 w-full cursor-pointer border border-black8 text-gray-400 shadow-2xl transition-all duration-100 hover:bg-black8">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center justify-center gap-3">
              <CardTitle className="whitespace-nowrap text-sm font-semibold md:text-lg lg:text-lg">
                {title}
              </CardTitle>
              <span className="whitespace-nowrap rounded-full bg-[#56D48F] px-2 text-sm text-[#fff]">
                full-time
              </span>
            </div>
            <div className="text-muted-foreground mt-1 flex items-center text-sm">
              <Badge
                variant="secondary"
                className="mr-2 bg-blue-100 text-blue-600 hover:bg-blue-100"
              >
                {company}
              </Badge>
              <MapPin className="mr-1 h-4 w-4" />
              {location}
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">${rate}</span>
            <span className="text-muted-foreground text-sm">/hr</span>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-600 hover:bg-green-100 ml-2"
            >
              hourly
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-muted-foreground flex items-center text-sm">
          <MessageSquare className="mr-1 h-4 w-4" />
          <span>Reply rate: {replyRate}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Jobs = () => {
  const jobList = [
    {
      title: 'Senior PHP Developer',
      rate: 44,
      company: 'Epic Coders',
      location: 'Indianapolis, IN',
      replyRate: 82,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
      tags: ['UI', 'UX', 'android', 'javascript', 'sketch'],
    },
    {
      title: 'Full Stack Developer',
      rate: 55,
      company: 'Tech Solutions',
      location: 'Remote',
      replyRate: 90,
      description:
        'Design, develop, and maintain cutting-edge web applications using modern technologies and best practices.',
      tags: ['React', 'Node.js', 'CSS', 'HTML'],
    },
    {
      title: 'Mobile App Developer',
      rate: 60,
      company: 'App Experts',
      location: 'New York, NY',
      replyRate: 75,
      description:
        'Build and maintain high-performance mobile applications for iOS and Android platforms.',
      tags: ['iOS', 'Android', 'Flutter', 'React Native'],
    },
  ];

  return (
    <section className="w-full p-3">
      {/* top filter  */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm text-gray-400">RESULTS(24)</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Sort By</span>
          <div>
            <SelectDropdown
              selectedClassName="rounded text-sm text-gray-400"
              options={sortOptions}
            />
          </div>
        </div>
      </div>

      {/* job section  */}
      <div className="grid grid-cols-1 gap-4">
        {jobList.map((job) => (
          <JobListingCard
            key={job.title}
            title={job.title}
            rate={job.rate}
            company={job.company}
            location={job.location}
            replyRate={job.replyRate}
            description={job.description}
            tags={job.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Jobs;
