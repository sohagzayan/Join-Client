import { CiEdit } from 'react-icons/ci';

const Skills = () => {
  return (
    <div>
      <div className="custom-container mt-10 rounded-lg bg-[rgba(255,255,255,0.06)] py-6">
        <div className="flex items-center justify-between px-2 lg:px-10">
          <h2 className="mb-2 rounded-md p-2 text-lg font-600 text-white lg:text-2xl">
            Skills
          </h2>
          <button className="flex items-center gap-2 text-theme1 lg:text-lg">
            <CiEdit />
            Edit
          </button>
        </div>
        <div className="px-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-lg text-white">
            <div>Python</div>
            <div>React</div>
            <div>JavaScript</div>
            <div>Node</div>
            <div>Express</div>
            <div>Tailwindcss</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
