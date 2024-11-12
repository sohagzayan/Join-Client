import JobTrackerWrapper from './components/JobTrackerWrapper';

const JobTrackerPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-themeDark">
      <div className="container mx-auto px-4">
        <JobTrackerWrapper />
      </div>
    </div>
  );
};

export default JobTrackerPage;
