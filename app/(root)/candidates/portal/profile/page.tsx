import CandidateProfileManager from './components/ProfileStepper';

const UserProfileEdit = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <CandidateProfileManager />
      </div>
    </div>
  );
};

export default UserProfileEdit;
