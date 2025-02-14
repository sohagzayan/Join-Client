import JobDetail from '@/components/containers/job_detail/JobDetail';
import Header from '@/components/shared/Nav/Header';
import Footer from '@/components/shared/footer/Footer';

const JobDetailsPage = () => {
  return (
    <div className="relative">
      <Header />
      {/* <JobDetails /> */}
      <JobDetail />
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
