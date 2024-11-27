'use client';
import { motion } from 'framer-motion';
import { IoIosCamera } from 'react-icons/io';

const UserProfileCard = () => {
  return (
    <motion.div
      className="container mb-8 flex flex-col items-center pt-14 sm:flex-row sm:items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-4 sm:mb-0 sm:mr-6">
        <motion.img
          src="/candidate-1.webp"
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
      <div className="text-center text-white sm:text-left">
        <motion.h1
          className="mb-2 text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          John Does
        </motion.h1>
        <motion.p
          className="text-text5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Senior Software Engineer
        </motion.p>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
