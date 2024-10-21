import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileTab from '@/components/shared/profile-tab/ProfileTab';
import AboutSection from '@/components/containers/profile-for-candidate/about-section/AboutSection';
import SocialProfilesSection from '@/components/containers/profile-for-candidate/social-profiles-section/SocialProfilesSection';
import YourWorkExperience from '@/components/containers/profile-for-candidate/your-work-experience/YourWorkExperience';
import EducationSection from '@/components/containers/profile-for-candidate/education-section/EducationSection';
import YourSkillsSection from '@/components/containers/profile-for-candidate/your-skills-section/YourSkillsSection';
import AchievementsSection from '@/components/containers/profile-for-candidate/achievements-section/AchievementsSection';
import IdentitySection from '@/components/containers/profile-for-candidate/Identity-section/IdentitySection';

const Edit = () => {
  return (
    <div className="">
      <div>
        <ProfileTab />
      </div>
      <div className="mt-5 border p-6">
        <AboutSection />
        <hr />
        <SocialProfilesSection />
        <hr />
        <YourWorkExperience />
        <hr />
        <EducationSection />
        <hr />
        <YourSkillsSection />
        <hr />
        <AchievementsSection />
        <hr />
        <IdentitySection />
      </div>
    </div>
  );
};

export default Edit;
