import navItems from '@/constants/nav-items';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const DashboardSideBar = () => {
  const pathname = usePathname();
  const sideBarItems = navItems('recruiter');
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubMenu = (key: string) => {
    setExpandedMenu(expandedMenu === key ? null : key);
  };
  console.log('sideBarItems', sideBarItems);

  return (
    <div>
      {sideBarItems.map((item: any) => (
        <div key={item.key}>
          {item.subMenu ? (
            // Render this div if the item has a submenu
            <>
              <div className="submenu-container">
                <a
                  onClick={() => toggleSubMenu(item.key)}
                  // href={item?.key}
                  className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item relative flex h-10 w-10 items-center rounded transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 ${pathname == item.key ? 'bg-gray_light_400' : 'bg-transparent'} hover:bg-light_gray`}
                  key={item.key}
                >
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded text-[20px]">
                    {item.icon}
                  </span>
                  <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                    {item.label}
                  </span>
                </a>

                <motion.div
                  initial={false}
                  animate={expandedMenu === item.key ? 'open' : 'closed'}
                  variants={{
                    open: {
                      height: 'auto',
                      opacity: 1,
                      transition: { duration: 0.3 },
                    },
                    closed: {
                      height: 0,
                      opacity: 0,
                      transition: { duration: 0.3 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  {item.subMenu.map((subItem: any) => (
                    <Link
                      href={subItem?.key}
                      className={`text-foreground-lighter hover:text-foreground hover:bg-surface-200 !bg-selection !text-foreground group/item relative flex h-10 w-10 items-center rounded bg-themeDark transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 ${pathname == item.key ? 'bg-gray_light_400' : 'bg-transparent'} hover:bg-light_gray`}
                      key={item.key}
                    >
                      <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded text-[20px]">
                        {subItem.icon}
                      </span>
                      <span className="text-foreground-light group-hover/item:text-foreground group-aria-current/item:text-foreground absolute left-7 min-w-[128px] text-sm opacity-0 transition-all group-data-[state=expanded]:left-12 group-data-[state=expanded]:opacity-100">
                        {subItem.label}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </>
          ) : (
            // Render this div if the item does not have a submenu
            <div className="no-submenu">
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
            </div>
          )}
        </div>
      ))}

      {/* {sideBarItems.map((item) => (
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
      ))} */}
    </div>
  );
};

export default DashboardSideBar;
