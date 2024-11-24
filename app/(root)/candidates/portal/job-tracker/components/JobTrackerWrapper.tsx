import ApplicationJourney from './ApplicationJourney';
import AppliedJobs from './AppliedJobs';
import TaskOverviewPanel from './TaskOverviewPanel';

const JobTrackerWrapper = () => {
  return (
    <div>
      <ApplicationJourney />
      <TaskOverviewPanel />
      <AppliedJobs />
    </div>
  );
};

export default JobTrackerWrapper;
