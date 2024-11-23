import CandidateProfileController from '@/components/common/CandidateProfileController/CandidateProfileController';
import UserProfileCard from '@/components/common/UserProfileCard/UserProfileCard';
import BottomNav from '@/components/shared/Nav/BottomNav';
export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip">
      <UserProfileCard />
      <CandidateProfileController />
      {children}
      <BottomNav />
    </div>
  );
}
