import ProfileEdit from './components/EditProfile';

const UserProfileEdit = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* <ProfileBannerAvatar /> */}
      <div className="mx-4 md:mx-8 lg:mx-10">
        <ProfileEdit />
      </div>
    </div>
  );
};

export default UserProfileEdit;
