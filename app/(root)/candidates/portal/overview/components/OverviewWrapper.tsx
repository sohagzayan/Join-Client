import Achievements from './Achievements';
import AllExperiences from './AllExperiences';
import AllPersonalInformation from './AllPersonalInformation';
import Education from './Education';
import ResumeViewAndDownload from './ResumeViewAndDownload';
import Skills from './Skills';

const OverviewWrapper = () => {
  return (
    <div>
      <div className="custom-container pb-10">
        <AllPersonalInformation />
        <ResumeViewAndDownload />
        <AllExperiences />
        <Education />
        <Skills />
        <Achievements />
      </div>
    </div>
  );
};

export default OverviewWrapper;
