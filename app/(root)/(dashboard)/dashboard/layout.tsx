'use client';
import { sidebarItems } from '@/constants/sidebaritems';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import DashboardTopBar from './components/DashboardTopBar';

export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const pathname = usePathname();

  const handleExpandSideBar = () => {
    setIsExpanded((prev) => !prev);
  };

  const sideBarItem = sidebarItems('candidate');

  return (
    <div className="h-screen min-h-[0px] flex-1 basis-0">
      <div className="flex h-full">
        <div className={`flex h-full w-14 cursor-pointer flex-col`}>
          <nav
            onMouseEnter={handleExpandSideBar}
            onMouseLeave={handleExpandSideBar}
            data-state={isExpanded ? 'expanded' : 'collapsed'}
            className={`bg-studio border-default transition-width hide-scrollbar group z-10 flex h-full w-14 flex-col justify-between overflow-y-auto overflow-x-hidden border-r bg-white py-2 duration-200 data-[state=expanded]:w-[13rem] data-[state=expanded]:shadow-xl`}
          >
            <ul className="flex flex-col justify-start gap-y-1 px-2">
              <Link href="/" className="mx-2 flex h-[40px] items-center">
                <Image
                  src="/assets/images/supabase-logo.svg"
                  height={40}
                  width={20}
                  alt="logo"
                />
              </Link>

              {sideBarItem.map((item) => (
                <>
                  <Link
                    href={item?.key}
                    className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 ${pathname == item.key ? 'bg-gray_light_400' : 'bg-transparent'} hover:bg-light_gray`}
                    key={item.key}
                  >
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded text-[20px]">
                      {item.icon}
                    </span>
                    <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                </>
              ))}
            </ul>
            <div className="flex flex-col justify-start gap-y-1 px-2">
              <Link
                href="/"
                className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item hover:bg-light_gray relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2`}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded">
                  <IoSettingsOutline />
                </span>

                <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                  Profile Settings
                </span>
              </Link>
              <Link
                href="/"
                className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item hover:bg-light_gray relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2`}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded">
                  <IoSearchOutline />
                </span>
                <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                  Search
                </span>
              </Link>
              <Link
                href="/"
                className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item hover:bg-light_gray relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2`}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded">
                  <LuUser2 />
                </span>
                <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                  dajor98633@bizatop.com
                </span>
              </Link>
            </div>
          </nav>
        </div>

        <div
          data-panel-group
          data-panel-group-direction="horizontal"
          className="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* <Header variant='primary' /> */}
          <div style={{ flex: '1 1 0', overflow: 'hidden' }} className="h-full">
            <main className="flex h-full w-full flex-1 flex-col overflow-x-hidden">
              <DashboardTopBar />

              <main
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: '100vh' }}
              >
                <div className="mx-auto my-16 w-full max-w-7xl space-y-16 overscroll-y-auto">
                  {children}
                </div>
              </main>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
// overflow-y-auto
