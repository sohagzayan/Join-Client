import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  History,
  StickyNote,
  UserRoundPlus,
} from 'lucide-react';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineRecommend } from 'react-icons/md';

interface SideProfileContentType {
  activeInsightsTab: number;
  setActiveInsightsTab: React.Dispatch<React.SetStateAction<number>>;
}

const tabData = [
  { id: 1, name: 'Edit', icon: <FiEdit size={18} /> },
  { id: 2, name: 'Note', icon: <StickyNote size={18} /> },
  { id: 3, name: 'Tests', icon: <BookOpenCheck size={18} /> },
  { id: 4, name: 'Resume', icon: <UserRoundPlus size={18} /> },
  { id: 5, name: 'Recommend', icon: <MdOutlineRecommend size={18} /> },
  { id: 6, name: 'History', icon: <History size={18} /> },
];

const ProfileInsightsMenu = ({
  activeInsightsTab,
  setActiveInsightsTab,
}: SideProfileContentType) => {
  const handleChangeTab = (id: number) => setActiveInsightsTab(id);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-end">
      {tabData?.map((tab) => (
        <motion.div
          key={tab.id}
          whileHover={{ scale: 1.1, rotate: 2 }} // Unique hover effect with slight rotation
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto"
          animate={{
            y: tab.id === activeInsightsTab ? [0, -2, 0] : 0, // Adds bounce effect for active tab
          }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => handleChangeTab(tab.id)}
            className={`flex w-full items-center gap-2 rounded-lg px-6 py-3 text-[16px] font-medium transition-all duration-300 md:w-auto ${tab.id === activeInsightsTab ? 'bg-[rgba(255,255,255,0.06)] text-theme1 shadow-lg' : 'bg-transparent text-gray-300'} ease-in-out hover:bg-[rgba(255,255,255,0.06)] hover:text-theme1`}
          >
            {tab?.icon} {tab?.name}
          </button>
          {tab.id === activeInsightsTab && (
            <motion.div
              layoutId="underline"
              className="bg-secondary mt-2 h-[3px] w-full rounded-full md:w-[100%]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileInsightsMenu;
