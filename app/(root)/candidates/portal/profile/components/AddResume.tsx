import Image from 'next/image';

const AddResume = () => {
  return (
    <div className="mb-32">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-2 lg:col-span-4">
          <h2 className="text-xl font-600 text-white">
            Upload your recent resume or CV
          </h2>
          <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
            Upload your most up-to-date resume
          </p>
          <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
            File types: DOC, DOCX, PDF, TXT
          </p>
        </div>
        <div className="col-span-12 md:col-span-10 lg:col-span-8">
          <div>
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-theme1 p-3">
              <Image
                src={'/assets/images/resume.png'}
                width={80}
                height={80}
                alt="office"
                className="mb-1"
              />
              <h3 className="text-2xl font-600 text-white">Upload new file</h3>
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <input type="checkbox" />
              <label htmlFor="">I&#39;d like a free resume review</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResume;
