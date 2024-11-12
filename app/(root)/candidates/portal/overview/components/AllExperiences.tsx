import { CiEdit } from 'react-icons/ci';

const AllExperiences = () => {
  return (
    <div>
      <div className="custom-container mt-10 rounded-lg bg-[rgba(255,255,255,0.06)] py-6">
        <div className="flex items-center justify-between px-2 lg:px-10">
          <h2 className="mb-2 rounded-md p-2 text-lg font-600 text-white lg:text-2xl">
            All Experiences
          </h2>
          <button className="flex items-center gap-2 text-theme1 lg:text-lg">
            <CiEdit />
            Edit
          </button>
        </div>
        <div className="px-5 lg:px-10">
          <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-400"></div>
            <div className="">
              <h2 className="text-lg font-600 text-white">Trendyol.com</h2>
              <p className="text-white">
                Front-End Developer -{' '}
                <span className="text-text6">
                  1 Year 2 months - Oct 2021, Dec 2022
                </span>
              </p>
            </div>
          </div>
          <hr className="mt-5 border-text1" />
          <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center lg:flex-row lg:items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-400"></div>
            <div className="">
              <h2 className="font-600 text-white md:text-lg lg:text-lg">
                Trendyol.com
              </h2>
              <p className="text-white">
                Front-End Developer -{' '}
                <span className="text-text6">
                  1 Year 2 months - Oct 2021, Dec 2022
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllExperiences;
