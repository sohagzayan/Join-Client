import OnboardingTabs from '@/components/containers/onboarding/onboarding-tabs/OnboardingTabs';
import Header from '@/components/shared/Nav/Header';
import MobileNav from '@/components/shared/Nav/MobileNav';
import Footer from '@/components/shared/footer/Footer';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-light_gray">
      <OnboardingTabs />
      <main>{children}</main>
    </div>
  );
}
