import HeaderController from '@/components/shared/header-controller/HeaderController';
import Image from 'next/image';

const DashboardTopBar = () => {
  return (
    <div className="border-default flex h-12 max-h-12 items-center justify-between border-b px-5 py-2">
      <nav className="relative flex w-full items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            width={100}
            height={100}
            alt="logo"
          />
        </div>
        <div className="flex items-center gap-2">
          <HeaderController />
        </div>
      </nav>
    </div>
  );
};

export default DashboardTopBar;
