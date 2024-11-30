import BrandYourself from '@/components/containers/candidates-overview/brand-yourself/BrandYourself';
import CandidatesHeroSection from '@/components/containers/candidates-overview/candidates-hero-section/CandidatesHeroSection';
import FindWork from '@/components/containers/candidates-overview/find-work/FindWork';
import JobMatchMetrics from '@/components/containers/candidates-overview/job-match-metrics/JobMatchMetrics';
import OpportunitiesComeToYou from '@/components/containers/candidates-overview/opportunities-come-to-you/OpportunitiesComeToYou';
import ReviewFromOurUsers from '@/components/containers/candidates-overview/review-from-our-users/ReviewFromOurUsers';
import Footer from '@/components/shared/footer/Footer';
import React from 'react';

const CandidatesOverview = () => {
  return (
    <div>
      <div>
        <CandidatesHeroSection />
        <JobMatchMetrics />
        <BrandYourself />
        <FindWork />
        <OpportunitiesComeToYou />
        <ReviewFromOurUsers />
        <Footer />
      </div>
    </div>
  );
};

export default CandidatesOverview;
