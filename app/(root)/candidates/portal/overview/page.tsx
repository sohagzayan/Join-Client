import ProfileBannerAvatar from '@/components/common/ProfileBannerAvatar/ProfileBannerAvatar';
import OverviewWrapper from './components/OverviewWrapper';

const OverviewPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-themeDark">
      <div>
        <ProfileBannerAvatar />
      </div>
      <div>
        <OverviewWrapper />
      </div>
    </div>
  );
};

export default OverviewPage;
