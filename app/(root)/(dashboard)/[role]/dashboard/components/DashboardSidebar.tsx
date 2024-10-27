import navItems from '@/constants/nav-items';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSideBar = () => {
  const pathname = usePathname();
  const sideBarItems = navItems('recruiter');
  const uniqueGroups = Array.from(
    new Set(
      sideBarItems
        .filter((item) => 'group' in item)
        .map((item) => (item as any).group),
    ),
  );
  console.log();

  return (
    <div>
      {uniqueGroups.map((group) => (
        <div key={group} className="mb-4">
          {sideBarItems
            .filter((item) => 'group' in item && (item as any).group === group)
            .map((item) => (
              <Link
                href={item?.key}
                className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 ${
                  pathname === item.key ? 'bg-gray_light_400' : 'bg-transparent'
                } hover:bg-light_gray`}
                key={item.key}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded text-[20px]">
                  {item.icon}
                </span>
                <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                  {item.label}
                </span>
              </Link>
            ))}
          <div className="mt-2 border-b border-[rgba(255,255,255,0.14)]"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
