import AssesmentQuestion from './Internship/AssesmentQuestion';
import InternShipForm from './Internship/InternShipForm';

const JobPost = () => {
  return (
    <section className="mt-5 h-full w-full rounded-lg bg-black8 p-4 text-gray-300">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold">Post internship/job</h2>
        <p className="text-lg">
          Hire early talent with work experience up to 2 years
        </p>
      </div>
      {/* select role */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Opportunity type</h3>
        <div className="flex gap-4 rounded-lg border border-gray-700 p-7">
          <label className="flex cursor-pointer items-center">
            <input
              type="radio"
              name="opportunityType"
              value="internship"
              className="mr-2"
              defaultChecked
            />
            <span>Internship</span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input
              type="radio"
              name="opportunityType"
              value="job"
              className="mr-2"
            />
            <span>Job</span>
          </label>
        </div>
      </div>
      {/* job details  */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Internship Details</h3>
        <div className="mt-3 h-full w-full">
          {/* here */}
          <InternShipForm />
          <AssesmentQuestion />
        </div>
      </div>
    </section>
  );
};

export default JobPost;
