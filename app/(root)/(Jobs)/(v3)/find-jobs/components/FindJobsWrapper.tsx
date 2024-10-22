'use client';
import { useState } from 'react';
import ExtraInformation from './ExtraInformation';
import Filtering from './Filtering';
import JobListings from './JobListings';
import JobModal from './JobModal';

const FindJobsWrapper = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [showEarlyApplyModal, setShowEarlyApplyModal] = useState<any>(false);

  return (
    <div className="relative mt-10">
      <JobModal
        {...{
          showJobModal,
          setShowJobModal,
          selectedJob,
          setShowEarlyApplyModal,
        }}
      />
      <div className="container">
        <div className="mb-5 border-b border-b-[rgba(255,255,255,0.08)]">
          <h3 className="py-2 text-4xl font-bold text-white">Explore jobs</h3>
        </div>
        <Filtering
        //   {...{ showJobModal, setShowJobModal, setSelectedJob, selectedJob }}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-9">
            <JobListings
              {...{
                searchTerm,
                setSearchTerm,
                showJobModal,
                setShowJobModal,
                setSelectedJob,
                selectedJob,
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <ExtraInformation
              {...{
                selectedJob,
                setSelectedJob,
                showJobModal,
                setShowJobModal,
                searchTerm,
                setSearchTerm,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobsWrapper;
