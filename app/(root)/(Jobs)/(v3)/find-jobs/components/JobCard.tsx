import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
  Percent,
  Star,
} from 'lucide-react';

const JobCard = ({ job, setSelectedJob, setShowJobModal }: any) => {
  const handleJobClick = (job: any) => {
    console.log('job', job);
    setSelectedJob(job);
    setShowJobModal(true);
  };

  return (
    <Card className="w-full border-transparent bg-[rgba(255,255,255,0.08)]">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white">
              Senior Clinical Administrative Coordinator
            </CardTitle>
            <p className="text-muted-foreground text-sm text-text6">
              Optum company
            </p>
          </div>
          <Badge variant="secondary" className="self-start text-xs text-green">
            Full-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-muted-foreground mb-2 grid grid-cols-2 gap-2 text-xs text-text6 sm:grid-cols-3">
          <div className="flex items-center">
            <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
            <span className="truncate">Phoenix, AZ • Remote</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
            <span className="truncate">$19.47 - $38.08/hr</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-1 h-3 w-3 flex-shrink-0" />
            <span>5+ years exp.</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 flex-shrink-0" />
            <span>3.3 rating</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
            <span className="truncate">Apply by Jul 15, 2023</span>
          </div>
          <div className="flex items-center">
            <Percent className="mr-1 h-3 w-3 flex-shrink-0" />
            <span>75% match</span>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {['Windows', 'Administrative Support', 'Healthcare'].map(
              (skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] text-xs text-theme1"
                >
                  {skill}
                </Badge>
              ),
            )}
          </div>
        </div>
        <div className="text-muted-foreground text-xs text-text6">
          <p>• Remote work: AZ or CO only</p>
          <p>• CO residents: $19.47 - $38.08/hr</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="border-2 border-theme1 text-theme1 transition-all duration-100 ease-in-out hover:bg-theme1 hover:text-white"
        >
          Quick Apply
        </Button>
        <Button
          onClick={() => handleJobClick(job)}
          size="sm"
          className="border-2 border-theme1 bg-theme1 text-white transition-all duration-100 ease-in-out hover:border-white hover:bg-white hover:text-theme1"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
