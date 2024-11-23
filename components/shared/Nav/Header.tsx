'use client';
import { Logo } from '@/components/common';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeaderController from '../header-controller/HeaderController';
import NavItems from './NavItems';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollY(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
  }, []);

  // Check if it's an authentication page or other specific pages
  const isAuthPage =
    pathname.includes('/signup') ||
    pathname.includes('/login') ||
    pathname.includes('/reset-password') ||
    pathname.includes('/dashboard');

  const noNeedHeader = pathname.includes('/dashboard');

  const noStickyHeader = pathname.includes('/find-jobs');

  return (
    <>
      {!noNeedHeader && (
        <div
          style={{ backdropFilter: scrollY >= 70 ? 'blur(5px)' : '' }}
          className={`z-[999] border-b border-[rgba(255,255,255,0.08)] bg-themeDark2 px-4 transition-all duration-300 ${
            !noStickyHeader && scrollY >= 70
              ? 'header sticky left-0 top-0'
              : 'relative left-0 right-0 top-0 z-40'
          }`}
        >
          <div className="container relative flex h-[90px] items-center justify-between lg:px-16 xl:px-10">
            <div className="flex items-center gap-10">
              <Logo />
              {!isAuthPage && <NavItems />}
            </div>
            <div className="flex items-center gap-4">
              {!isAuthPage ? (
                <HeaderController />
              ) : (
                <div>
                  <h3 className="font-semibold text-theme1">
                    Here to hire talent?
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
