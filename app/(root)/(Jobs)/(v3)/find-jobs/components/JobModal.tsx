import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Flag,
  MapPin,
  Star,
} from 'lucide-react';

const JobModal = ({
  showJobModal,
  setShowJobModal,
  selectedJob,
  setShowEarlyApplyModal,
}: any) => {
  return (
    <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
      <div
        className={`fixed left-0 right-0 top-0 z-[999] h-full w-full bg-[#000] opacity-[.6] ${showJobModal ? 'pointer-events-auto visible' : 'pointer-events-none invisible'} transition-all duration-300 ease-out`}
      ></div>
      <DialogContent className="no-scrollbar z-[9999] h-[85vh] max-w-4xl overflow-y-auto border-2 border-[rgba(255,255,255,0.1)] bg-black7 text-gray-100">
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
              <TabsList className="grid w-full grid-cols-2 border border-[rgba(255,255,255,0.1)]">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-theme1"
                >
                  Job Details
                </TabsTrigger>
                <TabsTrigger
                  value="apply"
                  className="data-[state=active]:bg-theme1"
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
                      {selectedJob.benefits.map((benefit: any, index: any) => (
                        <li key={index}>{benefit}</li>
                      ))}
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
                    <RadioGroup>
                      <RadioGroupItem value="" defaultValue="no">
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
                      </RadioGroupItem>
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
  );
};

export default JobModal;
