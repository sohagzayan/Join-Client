import React from 'react';
import PropTypes from 'prop-types';
import ProfileTab from '@/components/shared/profile-tab/ProfileTab';
import ProfileResume from '@/components/containers/profile-resume/ProfileResume';

const Resume = () => {
  return (
    <div>
      <div>
        <ProfileTab />
      </div>
      <div>
        <ProfileResume />
      </div>
    </div>
  );
};

export default Resume;
