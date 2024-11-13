'use client';
import { Button } from '@/components/common';
import { UserHire, UserSeeker } from '@/components/icons/user/user';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface RoleSelectorType {
  selectRole: string | null;
  setSelectRole: React.Dispatch<React.SetStateAction<string | null>>;
  setConformPress: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleSelector = ({
  setSelectRole,
  selectRole,
  setConformPress,
}: RoleSelectorType) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const roleVariants = {
    selected: { scale: 1.1, transition: { type: 'spring', stiffness: 300 } },
    unselected: { scale: 1 },
  };

  const getButtonText = () => {
    if (selectRole === 'recruiter') {
      return 'Join as Recruiter';
    } else if (selectRole === 'seeker') {
      return 'Join as Candidate';
    } else {
      return 'Create an account';
    }
  };

  const handleConformPress = () => {
    setConformPress(true);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="mx-auto w-[700px]">
        <div>
          <h3 className="font-white mt-8 text-center text-3xl text-white">
            Join today to post jobs or find your next gig!
          </h3>
          <div className="mt-14">
            <div className="flex justify-center space-x-8">
              <motion.label
                className={`air3-radio-label air3-btn-box-check-icon w-[300px] cursor-pointer rounded-md border-2 border-[rgba(255,255,255,0.08)] p-3 text-left ${selectRole === 'recruiter' ? 'is-active bg-[rgba(255,255,255,0.05)]' : ''}`}
                variants={roleVariants}
                animate={selectRole === 'recruiter' ? 'selected' : 'unselected'}
              >
                <div className="flex justify-end">
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    className="air3-btn-box-input"
                    checked={selectRole === 'recruiter'}
                    onChange={() => setSelectRole('recruiter')}
                  />
                </div>
                <UserHire color="text-white" width="50" />
                <div className="air3-checkbox-fake-input">
                  <span className="air3-radio-icon"></span>
                </div>
                <div className="py-3">
                  <p className="text-white">
                    I{'’'}m a client, hiring for a job or project
                  </p>
                </div>
              </motion.label>

              <motion.label
                className={`air3-radio-label air3-btn-box-check-icon w-[300px] cursor-pointer rounded-md border-2 border-[rgba(255,255,255,0.08)] p-3 text-left ${selectRole === 'seeker' ? 'is-active bg-[rgba(255,255,255,0.05)]' : ''}`}
                variants={roleVariants}
                animate={selectRole === 'seeker' ? 'selected' : 'unselected'}
              >
                <div className="flex justify-end">
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    className="air3-btn-box-input"
                    checked={selectRole === 'seeker'}
                    onChange={() => setSelectRole('seeker')}
                  />
                </div>
                <UserSeeker color="text-white" width="50" />
                <div className="air3-checkbox-fake-input">
                  <span className="air3-radio-icon"></span>
                </div>
                <div className="py-3">
                  <p className="text-white">
                    I{'’'}m a candidate, Looking for a job
                  </p>
                </div>
              </motion.label>
            </div>
            <div className="mx-auto mt-10 flex w-[300px] flex-col text-center">
              <Button
                onClick={handleConformPress}
                text={getButtonText()}
                variant="secondary"
                className={`${!selectRole ? 'pointer-events-none border-transparent bg-[rgba(255,255,255,0.05)] opacity-50' : ''}`}
              />
              <p className="mt-3 text-sm text-text6">
                Already have an account?
                <Link
                  href="/ab/account-security/login"
                  className="ml-1 font-600 text-theme1"
                >
                  {' '}
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelector;
