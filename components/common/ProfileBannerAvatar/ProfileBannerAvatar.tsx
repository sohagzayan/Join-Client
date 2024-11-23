'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosArrowDown, IoIosCamera } from 'react-icons/io';

const menuItems = [
  { id: 'overview', label: 'Overview' },
  {
    id: 'profile',
    label: 'Profile',
    subMenu: ['Personal Info', 'Work Experience', 'Education', 'Skills'],
  },
  { id: 'analytics', label: 'Analytics' },
  {
    id: 'applications',
    label: 'Applications',
    subMenu: ['Active', 'Archived', 'Drafts'],
  },
  { id: 'saved-jobs', label: 'Saved Jobs' },
  { id: 'messages', label: 'Messages' },
];

const ProfileBannerAvatar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
    setActiveSubMenu(null);
  };

  const handleSubMenuItemClick = (subItem: string) => {
    setActiveSubMenu(subItem);
  };

  return (
    <div className="container mx-auto w-full p-4">
      <motion.div
        className="mb-8 flex flex-col items-center sm:flex-row sm:items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-4 sm:mb-0 sm:mr-6">
          <motion.img
            src="/assets/users/avatar.jpg"
            alt="Profile Thumbnail"
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute bottom-0 right-0">
            <input id="profile-thumb-input" className="hidden" type="file" />
            <motion.label
              htmlFor="profile-thumb-input"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-2 text-white shadow-md transition-colors hover:bg-blue-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoIosCamera />
            </motion.label>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <motion.h1
            className="mb-2 text-2xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            John Doe
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Senior Software Engineer
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="mb-4 flex flex-wrap justify-center gap-2 sm:justify-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {menuItems.map((item) => (
          <div key={item.id} className="relative">
            <motion.button
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeMenuItem === item.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
              onClick={() => handleMenuItemClick(item.id)}
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
                  className="absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.subMenu.map((subItem) => (
                    <motion.button
                      key={subItem}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        activeSubMenu === subItem
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => handleSubMenuItemClick(subItem)}
                      whileHover={{ backgroundColor: '#EBF8FF' }}
                    >
                      {subItem}
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="rounded-lg bg-white p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-4 text-xl font-semibold">
          {activeSubMenu || activeMenuItem}
        </h2>
        <p className="text-gray-600">
          Content for {activeSubMenu || activeMenuItem} goes here.
        </p>
      </motion.div>
    </div>
  );
};

export default ProfileBannerAvatar;
