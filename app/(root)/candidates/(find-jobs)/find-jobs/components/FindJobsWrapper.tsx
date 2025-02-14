'use client';
import { useState } from 'react';
import JobSearch from './JobSearch';
import JobsBoard from './JobsBoard';

const FindJobsWrapper = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [showEarlyApplyModal, setShowEarlyApplyModal] = useState<any>(false);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="relative">
      <div className="container py-10">
        <div className="mb-5 border-b border-b-[rgba(255,255,255,0.08)]">
          <h3 className="py-2 text-4xl font-bold text-white">Explore jobs</h3>
        </div>
        <JobSearch />
        <div className="">
          <div className="">
            <JobsBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobsWrapper;
