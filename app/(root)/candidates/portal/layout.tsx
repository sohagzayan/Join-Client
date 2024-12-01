import CandidateProfileController from '@/components/common/CandidateProfileController/CandidateProfileController';
import UserProfileCard from '@/components/common/UserProfileCard/UserProfileCard';
import BottomNav from '@/components/shared/Nav/BottomNav';
export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip bg-gradient-to-b from-gray-900 to-gray-800">
      <UserProfileCard />
      <CandidateProfileController />
      {children}
      <BottomNav />
    </div>
  );
}
