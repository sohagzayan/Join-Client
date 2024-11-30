'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const menuItems = [
  { id: 'overview', label: 'Overview', path: '/candidates/portal/overview' },
  {
    id: 'profile',
    label: 'Profile',
    path: '/candidates/portal/profile',
    subMenu: [
      {
        label: 'Edit Profile',
        path: '/candidates/portal/profile/edit-profile',
      },
      { label: 'Note', path: '/candidates/portal/profile/note' },
      { label: 'Tests', path: '/candidates/portal/profile/tests' },
      { label: 'Resume', path: '/candidates/portal/profile/resume' },
      { label: 'Recommend', path: '/candidates/portal/profile/recommend' },
      { label: 'History', path: '/candidates/portal/profile/history' },
    ],
  },
  {
    id: 'preferences',
    label: 'Preferences',
    path: '/candidates/portal/preferences',
  },
  { id: 'analytics', label: 'Analytics', path: '/candidates/portal/analytics' },
  {
    id: 'job-tracker',
    label: 'Job tracker',
    path: '/candidates/portal/job-tracker',
  },
  {
    id: 'calender',
    label: 'Calender',
    path: '/candidates/portal/calender',
  },
];

const CandidateProfileController = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (itemId: string, path: string) => {
    setActiveMenuItem(itemId);
    setActiveSubMenu(null);
    if (path) router.push(path); // Navigate to the menu item's path
  };

  const handleSubMenuItemClick = (subItem: { label: string; path: string }) => {
    setActiveSubMenu(subItem.label);
    if (subItem.path) router.push(subItem.path); // Navigate to the sub-menu item's path
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActiveMenuItem(null); // Close the dropdown if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={dropdownRef}
      className="container mb-2 flex flex-wrap justify-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {menuItems.map((item) => (
        <div key={item.id} className="relative">
          <motion.button
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeMenuItem === item.id
                ? 'bg-theme1 text-white'
                : 'text-gray-600 hover:bg-theme1 hover:text-white'
            }`}
            onClick={() => handleMenuItemClick(item.id, item.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {item.subMenu && <IoIosArrowDown className="ml-1 inline-block" />}
          </motion.button>
          {activeMenuItem === item.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              layoutId="activeMenuItem"
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          {item.subMenu && activeMenuItem === item.id && (
            <AnimatePresence>
              <motion.div
                className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {item.subMenu.map((subItem) => (
                  <motion.button
                    key={subItem.label}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      activeSubMenu === subItem.label
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSubMenuItemClick(subItem)}
                    whileHover={{ backgroundColor: '#EBF8FF' }}
                  >
                    {subItem.label}
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default CandidateProfileController;
