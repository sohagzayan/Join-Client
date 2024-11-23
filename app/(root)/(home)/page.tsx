import { LiveStatusBar, WebsiteReviews } from '@/components/common';
import BottomNav from '@/components/shared/Nav/BottomNav';
import Footer from '@/components/shared/footer/Footer';
import BenefitsForJobSeekersAndRecruiters from './components/BenefitsForJobSeekersRecruiters';
import HeroSection from './components/HeroSection';
import MeetRecruiterCloud from './components/MeetRecruiterCloud';
import OurMission from './components/OurMission';
import SuccessHighlights from './components/SuccessHighlights';

export default function HomePage() {
  return (
    <main className="bg-themeDark">
      <HeroSection />
      <LiveStatusBar />
      <SuccessHighlights />
      <OurMission />
      <BenefitsForJobSeekersAndRecruiters />
      <MeetRecruiterCloud />
      <WebsiteReviews />
      <Footer />
      <BottomNav />
    </main>
  );
}
