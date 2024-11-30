import BrandYourself from '@/components/containers/candidates-overview/brand-yourself/BrandYourself';
import CandidatesHeroSection from '@/components/containers/candidates-overview/candidates-hero-section/CandidatesHeroSection';
import FindWork from '@/components/containers/candidates-overview/find-work/FindWork';
import JobMatchMetrics from '@/components/containers/candidates-overview/job-match-metrics/JobMatchMetrics';
import AllTheToolsYouNeed from '@/components/containers/recruit-overview/all-the-tools-you-need/AllTheToolsYouNeed';
import RecruitHeroSection from '@/components/containers/recruit-overview/recruit-hero-section/RecruitHeroSection';
import StartupReadyCandidates from '@/components/containers/recruit-overview/startup-ready-candidates/StartupReadyCandidates';
import UniqueCandidateDetails from '@/components/containers/recruit-overview/unique-candidate-details/UniqueCandidateDetails';
import Footer from '@/components/shared/footer/Footer';
import React from 'react';

const RecruitOverview = () => {
  return (
    <div>
      <div>
        <RecruitHeroSection />
        <JobMatchMetrics />
        <StartupReadyCandidates />
        <UniqueCandidateDetails />
        <AllTheToolsYouNeed />
        <Footer />
      </div>
    </div>
  );
};

export default RecruitOverview;
