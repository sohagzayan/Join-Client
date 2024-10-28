'use client';
import { Button } from '@/components/common';
import { useState } from 'react';
import AssesmentQuestion from './Internship/AssesmentQuestion';
import InternShipForm from './Internship/InternShipForm';

type OpportunityType = 'internship' | 'job';

const JobPost = () => {
  const [opportunityType, setOpportunityType] =
    useState<OpportunityType>('internship');

  const handleOpportunityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOpportunityType(event.target.value as OpportunityType);
  };

  return (
    <section className="mt-5 h-full w-full rounded-lg bg-black8 p-4 text-gray-300">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold">Post Internship/Job</h2>
        <p className="text-lg">
          Hire early talent with work experience up to 2 years
        </p>
      </div>

      {/* Select role */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Opportunity Type</h3>
        <div className="flex gap-4 rounded-lg border border-gray-700 p-7">
          <label className="flex cursor-pointer items-center">
            <input
              type="radio"
              name="opportunityType"
              value="internship"
              className="mr-2"
              checked={opportunityType === 'internship'}
              onChange={handleOpportunityChange}
            />
            <span>Internship</span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input
              type="radio"
              name="opportunityType"
              value="job"
              className="mr-2"
              checked={opportunityType === 'job'}
              onChange={handleOpportunityChange}
            />
            <span>Job</span>
          </label>
        </div>
      </div>

      {/* Job or Internship Details */}
      <div className="mt-6">
        <div className="mt-3 h-full w-full">
          <InternShipForm opportunityType={opportunityType} />
          <AssesmentQuestion />
          <div className="flex w-full items-center justify-end">
            <Button text="Post Job" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPost;
