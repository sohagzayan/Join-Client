'use client';
import JobFilterSidebar from '@/components/containers/find_job_page/job-filter-sidebar/JobFilterSidebar';
import JobResults from '@/components/containers/find_job_page/job-results/JobResults';

const FindJob = ({ searchParams }: any) => {
  console.log('searchParams', searchParams);

  return (
    <div className="bg-light_gray">
      {/* <Header variant="primary" /> */}
      <div className="container mt-10 lg:px-16 xl:px-20">
        <section className="grid grid-cols-12 gap-4 md:flex-row">
          <div className="col-span-12 lg:col-span-3">
            <div className="">
              <JobFilterSidebar searchParamsObj={searchParams} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <JobResults searchParams={searchParams} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FindJob;
