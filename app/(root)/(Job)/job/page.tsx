'use client';
import { useState } from 'react';
import JobHead from './components/JobHead';
import JobListings from './components/JobListings';

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState<any>('');
  return (
    <div className="bg-themeDark">
      <JobHead />
      <JobListings />
    </div>
  );
};

export default JobPage;
