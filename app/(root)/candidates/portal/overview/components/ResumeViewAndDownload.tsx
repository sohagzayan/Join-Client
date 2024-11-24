import { ArrowDownToLine, ScrollText } from 'lucide-react';

const ResumeViewAndDownload = () => {
  return (
    <div>
      <div className="custom-container mt-10 rounded-lg bg-[rgba(255,255,255,0.06)] py-6">
        <h2 className="mb-2 rounded-md p-2 px-10 text-lg font-600 text-white lg:text-2xl">
          Resume
        </h2>

        <div className="mt-4 flex flex-col justify-between gap-2 px-10 md:flex-row md:items-center lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 text-xl text-white">
            <ScrollText size={20} />
            <p>jerome-bell-resume.pdf</p>
          </div>
          <button className="flex items-center gap-3 rounded-md bg-theme1 px-4 py-2 text-white">
            Download <ArrowDownToLine size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewAndDownload;
