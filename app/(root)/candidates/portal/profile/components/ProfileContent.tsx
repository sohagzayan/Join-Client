import AddResume from './AddResume';
import EditProfile from './EditProfile';
import History from './History';
import Notes from './Notes';
import Recommend from './Recommend';
import SkillTest from './SkillTest';

interface SideProfileContentType {
  activeInsightsTab: number;
  setActiveInsightsTab: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileContent = ({
  activeInsightsTab,
  setActiveInsightsTab,
}: SideProfileContentType) => {
  const getActiveTabContent = (activeProfileTab: number) => {
    switch (activeProfileTab) {
      case 1:
        return <EditProfile />;
      case 2:
        return <Notes />;
      case 3:
        return <SkillTest />;
      case 4:
        return <AddResume />;
      case 5:
        return <Recommend />;
      case 6:
        return <History />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>{getActiveTabContent(activeInsightsTab)}</div>
    </div>
  );
};

export default ProfileContent;
