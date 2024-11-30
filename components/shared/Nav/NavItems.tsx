'use client';
import { Menubar } from '@/components/ui/menubar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import navItems from '@/constants/nav-items';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  const pathname = usePathname();
  const currentUser = pathname.split('/')[1];
  console.log('currentUser', currentUser);
  const navItem = navItems(currentUser);

  return (
    <div className="hidden text-white lg:block">
      <Menubar className="border-none">
        <NavigationMenu>
          <NavigationMenuList>
            {navItem.map((menu: any) => (
              <div key={menu.key}>
                {menu.key ? (
                  <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="px-3 transition-all duration-200 ease-in-out [&>svg]:hidden">
                      <Link
                        href={menu.key}
                        className={`flex items-center gap-2 text-[16px] font-500 text-text5 transition-all duration-200 ease-in-out ${pathname === menu.key ? 'active-class' : ''}`}
                      >
                        <motion.span
                          className="flex items-center gap-2"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <motion.span
                            className={`text-theme1 transition-all duration-200 ease-in-out hover:text-theme1 ${pathname === menu.key ? 'text-active' : ''}`}
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {menu?.icon}
                          </motion.span>
                          <motion.span
                            className={`transition-all duration-200 ease-in-out hover:text-theme1 ${pathname === menu.key ? 'text-active' : 'text-white'}`}
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {menu.label}
                          </motion.span>
                        </motion.span>
                      </Link>
                    </NavigationMenuTrigger>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-1 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {menu.subMenu?.map((sub: any) => (
                          <li key={sub.key} title="Introduction">
                            <span className="text-blue-midnight_blue mb-1 font-bold">
                              {sub.label}
                            </span>
                            <p className="text-blue-midnight_blue">
                              {sub.details}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </div>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </Menubar>
    </div>
  );
};

export default NavItems;
