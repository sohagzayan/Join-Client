import { CiEdit } from 'react-icons/ci';

const Education = () => {
  return (
    <div>
      <div className="custom-container mt-10 rounded-lg bg-[rgba(255,255,255,0.06)] py-6">
        <div className="flex items-center justify-between px-2 lg:px-10">
          <h2 className="mb-2 rounded-md p-2 text-lg font-600 text-white lg:text-2xl">
            Education{' '}
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
              <h2 className="text-lg font-600 text-white">BA, 34, fd</h2>
              <p className="text-white">
                City College of New York
                <span className="text-text6">• 2024 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
