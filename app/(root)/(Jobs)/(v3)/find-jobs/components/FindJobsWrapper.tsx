'use client';
import { useState } from 'react';
import ExtraInformation from './ExtraInformation';
import Filtering from './Filtering';
import JobListings from './JobListings';

const FindJobsWrapper = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState<any>('');

  return (
    <div>
      <div>
        <Filtering
        //   {...{ showJobModal, setShowJobModal, setSelectedJob, selectedJob }}
        />
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
    </div>
  );
};

export default FindJobsWrapper;
