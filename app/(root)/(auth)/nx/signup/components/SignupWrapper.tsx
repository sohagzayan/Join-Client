'use client';
import { useState } from 'react';
import RoleSelector from './RoleSelector';
import SignUpForm from './SignUpForm';

const SignupWrapper = () => {
  const [selectRole, setSelectRole] = useState<string | null>(null);
  const [conformPress, setConformPress] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col bg-themeDark">
      {selectRole && conformPress ? (
        <div className="flex-grow">
          <SignUpForm selectRole={selectRole} />
        </div>
      ) : (
        <div className="flex-grow">
          <RoleSelector
            setSelectRole={setSelectRole}
            selectRole={selectRole}
            setConformPress={setConformPress}
          />
        </div>
      )}
    </div>
  );
};

export default SignupWrapper;
