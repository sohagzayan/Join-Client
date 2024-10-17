'use client';
import { InputField, SelectDropdown } from '@/components/common';
import TextArea from '@/components/common/text-area';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import React from 'react';

const JobModal = ({
  showJobModal,
  setShowJobModal,
  selectedJob,
  setShowEarlyApplyModal,
}: any) => {
  const [selectedRange, setSelectedRange] = React.useState(null);

  const salaryRanges = [
    { value: '50k-75k', label: '$50,000 - $75,000' },
    { value: '75k-100k', label: '$75,000 - $100,000' },
    { value: '100k-125k', label: '$100,000 - $125,000' },
    { value: '125k+', label: '$125,000+' },
  ];

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
                          className="border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] text-theme1"
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
                  <InputField
                    type="text"
                    placeholder="Full Name"
                    required
                    inputClassName="placeholder:text-white"
                    className="rounded-md border border-gray-600 bg-themeDark text-gray-100 text-white"
                  />

                  <InputField
                    type="text"
                    placeholder="Email Address"
                    required
                    inputClassName="placeholder:text-white"
                    className="rounded-md border border-gray-600 bg-themeDark text-gray-100 text-white"
                  />

                  <InputField
                    type="text"
                    placeholder="Phone Number"
                    required
                    inputClassName="placeholder:text-white"
                    className="rounded-md border border-gray-600 bg-themeDark text-gray-100 text-white"
                  />

                  <div>
                    <label
                      htmlFor="resume"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Upload Resume
                    </label>
                    <div>
                      <div>
                        <label
                          htmlFor="resume"
                          className="inline-block cursor-pointer rounded-md border border-gray-600 bg-themeDark px-4 py-2 text-white"
                        >
                          Choose File
                        </label>
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cover-letter"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Cover Letter
                    </label>
                    <TextArea
                      id="1" // Ensure id is string
                      placeholder="Tell us why you're a great fit for this role..."
                      rows={4}
                      className="text-whit w-full rounded-md border border-gray-600 bg-themeDark text-gray-100"
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <label className="block text-sm font-medium text-gray-300">
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
                    <SelectDropdown
                      options={salaryRanges}
                      className=""
                      selectedClassName="rounded-md"
                    />
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
            <DialogFooter className="">
              <Button
                variant="outline"
                className="border-red text-red hover:bg-red hover:text-white"
              >
                <Flag className="mr-2 h-4 w-4" /> Report this job
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
