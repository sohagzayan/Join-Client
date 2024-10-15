'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jobs_news } from '@/utils/data';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Eye,
  Flag,
  MapPin,
  Search,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AdvancedJobFindingPage() {
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showFilters, setShowFilters] = useState<any>(false);
  const [showJobModal, setShowJobModal] = useState<any>(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    jobType: [],
    experienceLevel: [],
    salary: [0, 200],
    location: '',
    datePosted: '',
    remoteOnly: false,
  });
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [showEarlyApplyModal, setShowEarlyApplyModal] = useState<any>(false);
  const jobsPerPage = 10;
  const searchInputRef = useRef<any>(null);

  const jobs = jobs_news;

  // Add 19 more job listings to have at least 20
  for (let i = 2; i <= 20; i++) {
    jobs.push({
      id: i,
      title: `Job Title ${i}`,
      company: `Company ${i}`,
      location: `City ${i}, State • ${i % 2 === 0 ? 'Remote' : 'On-site'}`,
      salary: `$${50 + i * 5}k - $${100 + i * 5}k`,
      type: i % 2 === 0 ? 'Full-time' : 'Part-time',
      experience: `${i}-${i + 2} years`,
      skills: ['Skill A', 'Skill B', 'Skill C'],
      description: `This is the description for Job ${i}...`,
      postedDate: new Date(2023, 5, i).toISOString().split('T')[0],
      companyRating: 3 + Math.random() * 2,
      schedule: 'Monday to Friday',
      primaryResponsibilities: [
        `Responsibility 1 for Job ${i}`,
        `Responsibility 2 for Job ${i}`,
        `Responsibility 3 for Job ${i}`,
      ],
      fullJobDescription: `This is the full job description for Job ${i}. It includes detailed information about the role, responsibilities, and expectations.`,
      benefits: [
        'Competitive salary',
        'Health insurance',
        '401(k) with company match',
        'Paid time off',
        'Professional development opportunities',
      ],
      requiredQualifications: [
        `Qualification 1 for Job ${i}`,
        `Qualification 2 for Job ${i}`,
        `Qualification 3 for Job ${i}`,
      ],
      preferredQualifications: [
        `Preferred Qualification 1 for Job ${i}`,
        `Preferred Qualification 2 for Job ${i}`,
      ],
      telecommutingRequirements:
        i % 2 === 0
          ? 'This position allows for full remote work.'
          : 'This position requires on-site presence.',
      softSkills: [
        'Communication',
        'Teamwork',
        'Problem-solving',
        'Adaptability',
        'Time management',
      ],
      applicationDeadline: new Date(2023, 6, 15 + i)
        .toISOString()
        .split('T')[0],
    });
  }

  const topJobs = jobs.slice(0, 5);
  const mostViewedJobs = jobs.slice(5, 10);
  const peopleAlsoSearched = [
    'Software Engineer',
    'Data Analyst',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
  ];

  useEffect(() => {
    setSelectedJob(jobs[0]);
  }, []);

  const filteredJobs = jobs.filter(
    (job: any) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill: any) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const handleFilterChange = (filterType: any, value: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleSearchFocus = () => {
    searchInputRef.current.style.width = '105%';
  };

  const handleSearchBlur = () => {
    searchInputRef.current.style.width = '100%';
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-900 p-4 text-gray-100">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full rounded-md border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Input
            type="text"
            placeholder="City, state, or zip code"
            className="w-64 border-gray-700 bg-gray-800 text-gray-100"
            value={selectedFilters.location}
            onChange={(e: any) =>
              handleFilterChange('location', e.target.value)
            }
          />
          <Select
            onValueChange={(value) => handleFilterChange('jobType', [value])}
          >
            <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleFilterChange('datePosted', value)}
          >
            <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
              <SelectValue placeholder="Date Posted" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="3d">Last 3 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              handleFilterChange('salary', value.split('-').map(Number))
            }
          >
            <SelectTrigger className="w-48 border-gray-700 bg-gray-800 text-gray-100">
              <SelectValue placeholder="Salary Estimate" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
              <SelectItem value="0-50">$0 - $50,000</SelectItem>
              <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
              <SelectItem value="100-150">$100,000 - $150,000</SelectItem>
              <SelectItem value="150-200">$150,000+</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2 border-gray-700 bg-gray-800 text-gray-100"
          >
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            {showFilters ? 'Hide Filters' : 'Show More Filters'}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Experience Level
                  </label>
                  <div className="space-y-2">
                    {['Entry Level', 'Mid Level', 'Senior Level'].map(
                      (level) => (
                        <div key={level} className="flex items-center">
                          <Checkbox
                            id={`experience-${level}`}
                            checked={selectedFilters.experienceLevel.includes(
                              level,
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleFilterChange('experienceLevel', [
                                  ...selectedFilters.experienceLevel,
                                  level,
                                ]);
                              } else {
                                handleFilterChange(
                                  'experienceLevel',
                                  selectedFilters.experienceLevel.filter(
                                    (l: any) => l !== level,
                                  ),
                                );
                              }
                            }}
                            className="border-gray-600"
                          />
                          <label
                            htmlFor={`experience-${level}`}
                            className="ml-2 text-sm text-gray-300"
                          >
                            {level}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="remote-only"
                    checked={selectedFilters.remoteOnly}
                    onCheckedChange={(checked) =>
                      handleFilterChange('remoteOnly', checked)
                    }
                  />
                  <Label htmlFor="remote-only" className="text-gray-300">
                    Remote Only
                  </Label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
                        variant="secondary"
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

      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="h-[80vh] max-w-4xl overflow-y-auto bg-gray-800 text-gray-100">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-blue-400">
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedJob.company} • {selectedJob.location}
                  <div className="text-yellow-500 ml-2">
                    {[...Array(Math.floor(selectedJob.companyRating))].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="currentColor"
                          className="inline"
                        />
                      ),
                    )}
                    <span className="ml-1 text-gray-400">
                      {selectedJob.companyRating.toFixed(1)}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-gray-600"
                  >
                    Job Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="apply"
                    className="data-[state=active]:bg-gray-600"
                  >
                    Apply Now
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="space-y-6 text-gray-300">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} />
                        <span className="whitespace-nowrap">
                          {selectedJob.salary}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        <span>{selectedJob.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{selectedJob.schedule}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Job Description:</h3>
                      <div className="text-gray-400">
                        {selectedJob.fullJobDescription}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Primary Responsibilities:
                      </h3>
                      <ul className="list-disc space-y-1 pl-5">
                        {selectedJob.primaryResponsibilities.map(
                          (resp: any, index: any) => (
                            <li key={index}>{resp}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Required Qualifications:
                      </h3>
                      <ul className="list-disc space-y-1 pl-5">
                        {selectedJob.requiredQualifications.map(
                          (qual: any, index: any) => (
                            <li key={index}>{qual}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Preferred Qualifications:
                      </h3>
                      <ul className="list-disc space-y-1 pl-5">
                        {selectedJob.preferredQualifications.map(
                          (qual: any, index: any) => (
                            <li key={index}>{qual}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Benefits:</h3>
                      <ul className="list-disc space-y-1 pl-5">
                        {selectedJob.benefits.map(
                          (benefit: any, index: any) => (
                            <li key={index}>{benefit}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Telecommuting Requirements:
                      </h3>
                      <div className="text-gray-400">
                        {selectedJob.telecommutingRequirements}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Soft Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.softSkills.map((skill: any) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gray-600 text-gray-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedJob.coloradoResidentsOnly && (
                      <div>
                        <h3 className="mb-2 font-semibold">
                          Colorado Residents Only:
                        </h3>
                        <div className="text-gray-400">
                          {selectedJob.coloradoResidentsOnly}
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Application Deadline:
                      </h3>
                      <div className="text-gray-400">
                        {new Date(
                          selectedJob.applicationDeadline,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="apply">
                  <form className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="border-gray-600 bg-gray-700 text-gray-100"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="border-gray-600 bg-gray-700 text-gray-100"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="border-gray-600 bg-gray-700 text-gray-100"
                    />
                    <div>
                      <label
                        htmlFor="resume"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Upload Resume
                      </label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="border-gray-600 bg-gray-700 text-gray-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cover-letter"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="1" // Ensure id is string
                        placeholder="Tell us why you're a great fit for this role..."
                        rows={4}
                        className="border-gray-600 bg-gray-700 text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Are you willing to relocate?
                      </label>
                      <RadioGroup defaultValue="no">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="relocate-yes" />
                          <Label
                            htmlFor="relocate-yes"
                            className="text-gray-300"
                          >
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="relocate-no" />
                          <Label
                            htmlFor="relocate-no"
                            className="text-gray-300"
                          >
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Whats your expected salary range?
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-600 bg-gray-700 text-gray-100">
                          <SelectValue placeholder="Select salary range" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-600 bg-gray-700">
                          <SelectItem value="50k-75k">
                            $50,000 - $75,000
                          </SelectItem>
                          <SelectItem value="75k-100k">
                            $75,000 - $100,000
                          </SelectItem>
                          <SelectItem value="100k-125k">
                            $100,000 - $125,000
                          </SelectItem>
                          <SelectItem value="125k+">$125,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Submit Application
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <DialogFooter className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Flag className="mr-2 h-4 w-4" /> Report this job
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setShowEarlyApplyModal(true)}
                >
                  Early Apply
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showEarlyApplyModal} onOpenChange={setShowEarlyApplyModal}>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Early Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Get a head start on your application process. Early applicants
              often have a higher chance of being noticed by employers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                type="file"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Early Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
