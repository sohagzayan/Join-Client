'use client';
import { useState } from 'react';
import ProfileContent from './ProfileContent';

const ProfileWrapper = () => {
  const [activeInsightsTab, setActiveInsightsTab] = useState<number>(1);

  return (
    <div className="relative">
      <div className="">
        <div className="my-8">
          {/* <ProfileInsightsMenu
            activeInsightsTab={activeInsightsTab}
            setActiveInsightsTab={setActiveInsightsTab}
          /> */}
        </div>
        <ProfileContent {...{ activeInsightsTab, setActiveInsightsTab }} />
      </div>
    </div>
  );
};

export default ProfileWrapper;
