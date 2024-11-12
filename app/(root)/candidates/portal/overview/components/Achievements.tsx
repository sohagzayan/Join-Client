import { CiEdit } from 'react-icons/ci';

const Achievements = () => {
  return (
    <div>
      <div className="custom-container mt-10 rounded-lg bg-[rgba(255,255,255,0.06)] py-6">
        <div className="flex items-center justify-between px-2 lg:px-10">
          <h2 className="mb-2 rounded-md p-2 text-lg font-600 text-white lg:text-2xl">
            Achievements{' '}
          </h2>
          <button className="flex items-center gap-2 text-theme1 lg:text-lg">
            <CiEdit />
            Edit
          </button>
        </div>
        <div className="px-5 lg:px-10">
          <div className="">
            <p className="text-text6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              corrupti atque provident sunt quos ex impedit architecto nobis
              dicta libero omnis iusto labore illo cupiditate soluta reiciendis
              ratione id, fugiat suscipit perspiciatis, consequuntur quasi
              itaque vitae totam! Amet voluptatibus tempora, perspiciatis
              repudiandae laudantium earum recusandae impedit officiis aut sequi
              incidunt?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
