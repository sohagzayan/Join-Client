'use client';
import { Divider } from '@/components/common';
import SocialLogin from '@/components/common/auth/social-login';
import MiniLoadingCircle from '@/components/shared/mini-loading-circle/MiniLoadingCircle';
import { Button } from '@/components/ui/button';
import { RegisterRequest, RegisterResponse } from '@/data/models/auth';
import { useRegisterMutation } from '@/redux/features/auth/authentication';
import { registerValidationAsCandidateSchema } from '@/utils/validation-schemas';
import { Formik, FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'sonner';

interface SignUpFormType {
  selectRole: string | null;
}

const SignUpForm = ({ selectRole }: SignUpFormType) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [termsCondition, setTermsCondition] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const handleTermsChange = (e: any) => {
    setTermsCondition(e.target.checked);
  };

  // Function to evaluate password strength
  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // Function to dynamically set the strength bar class
  const getStrengthBarClass = () => {
    switch (passwordStrength) {
      case 1:
        return 'bg-[#FF0000] w-1/4'; // Weak (Red)
      case 2:
        return 'bg-[#FFD700] w-1/2'; // Medium (Yellow)
      case 3:
        return 'bg-[#008000] w-3/4'; // Strong (Green)
      case 4:
        return 'bg-theme1 w-full'; // Very Strong (Teal)
      default:
        return 'bg-[#D3D3D3] w-1/4'; // Default (Light Gray)
    }
  };

  const onSubmit = async (values: any, actions: FormikHelpers<any>) => {
    try {
      const redirect = searchParams.get('redirect');
      const { email, password, fullName } = values;
      const userInfo: RegisterRequest = {
        email,
        password,
        name: fullName,
        role: 'candidate',
      };
      const res: RegisterResponse = await register(userInfo).unwrap();
      console.log('res', res);
      if (res?.success) {
        toast.success(res.message);
        router.push(redirect || '/ab/account-security/login');
      }
    } catch (error: any) {
      console.log('error', error);
      toast.error(error?.data?.message, {
        duration: 4000,
      });
      actions.setErrors({ email: error?.data?.message || 'An error occurred' });
    }
    actions.setSubmitting(false);
  };

  const signInWithGoogle = async (event: any) => {
    try {
      event.preventDefault();
      const res = await signIn('google', { callbackUrl: '/' });
      console.log('res goolge auth > ', res);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', fullName: '', password: '', cPassword: '' }}
        validationSchema={registerValidationAsCandidateSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const isPasswordMatching = values.password === values.cPassword;
          const isFormDisabled = registerLoading || !isPasswordMatching;

          return (
            <div className=" ">
              <form
                onSubmit={(e) => {
                  e.stopPropagation();
                  handleSubmit(e);
                }}
              >
                <div className="mx-auto my-5 flex w-[90%] flex-1 flex-col justify-center md:w-[400px] lg:w-[500px]">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 mt-8 text-xl font-700 text-white">
                      Sign Up
                    </h3>
                    <p className="text-sm font-400 text-text6">
                      Use social media accounts
                    </p>
                  </div>

                  <div>
                    <div className="flex w-full items-center justify-center bg-transparent">
                      <SocialLogin />
                    </div>
                  </div>

                  <Divider text="Or with emails" />

                  <div className="mb-6">
                    <div className="relative">
                      <input
                        autoFocus={true}
                        autoComplete="fullName"
                        name="fullName"
                        id="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        type="text"
                        style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
                        className={`block w-full rounded-md p-3 ${errors.fullName ? 'border-red-600' : ''} rounded-md border-none py-1.5 text-sm font-400 text-white shadow-sm outline-none focus:ring-indigo-500 sm:text-base sm:leading-6`}
                        placeholder="Full Name"
                      />

                      {errors.fullName && (
                        <div className="absolute inset-y-0 right-0 top-5 flex items-center space-x-1 pl-3 pr-1">
                          <div className="text-red-600 pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2">
                            <MdErrorOutline size={18} />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal mt-1 text-sm text-rose-500 transition-all">
                      {errors.fullName}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="relative">
                      {/* <label htmlFor="email" className='block text-primary font-apercu-regular text-sm mb-1'>Email</label> */}
                      <input
                        autoFocus={true}
                        autoComplete="email"
                        name="email"
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
                        className={`block w-full rounded-md p-3 ${errors.fullName ? 'border-red-600' : ''} rounded-md border-none py-1.5 text-sm font-400 text-white shadow-sm outline-none focus:ring-indigo-500 sm:text-base sm:leading-6`}
                        placeholder="Email"
                      />

                      {errors.email && (
                        <div className="absolute inset-y-0 right-0 top-5 flex items-center space-x-1 pl-3 pr-1">
                          <div className="text-red-600 pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2">
                            <MdErrorOutline size={18} />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal mt-1 text-sm text-rose-500 transition-all">
                      {errors.email}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <input
                        autoFocus={true}
                        autoComplete="new-password"
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={(e) => {
                          evaluatePasswordStrength(e.target.value);
                          handleChange(e);
                        }}
                        style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
                        className={`block w-full rounded-md p-3 ${errors.fullName ? 'border-red-600' : ''} rounded-md border-none py-1.5 text-sm font-400 text-white shadow-sm outline-none focus:ring-indigo-500 sm:text-base sm:leading-6`}
                        placeholder="Password"
                      />

                      {errors.password && (
                        <div className="absolute inset-y-0 right-10 top-5 flex items-center space-x-1 pl-3 pr-1">
                          <div className="text-red-600 pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2">
                            <MdErrorOutline size={18} />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-y-0 right-0 top-0 flex items-center space-x-1 pl-3 pr-1">
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="font-regular text-foreground bg-button hover:bg-selection border-button hover:border-button-hover focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover relative !mr-1 inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-none px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
                        >
                          {showPassword ? (
                            <BsEyeSlash size={18} />
                          ) : (
                            <BsEye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="-mx-1 mt-2 flex">
                        <div className="relative mx-1 h-2 flex-auto rounded-full bg-gray-300 opacity-50">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthBarClass()}`}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-1 text-sm text-white">
                        {passwordStrength === 0
                          ? 'Enter a password'
                          : passwordStrength === 1
                            ? 'Weak password'
                            : passwordStrength === 2
                              ? 'Medium password'
                              : passwordStrength === 3
                                ? 'Strong password'
                                : 'Very strong password'}
                      </div>
                    </div>
                    <p className="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal mt-1 text-sm text-rose-500 transition-all">
                      {errors.password}
                    </p>
                  </div>

                  <div>
                    <p className="mb-4 text-sm text-text6">
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols.
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="relative">
                      {/* <label htmlFor="password" className='block text-primary font-apercu-regular text-sm mb-1'>Password</label> */}
                      <input
                        autoFocus={true}
                        autoComplete="cPassword"
                        id="cPassword"
                        name="cPassword"
                        type={showCPassword ? 'text' : 'password'}
                        value={values.cPassword}
                        onChange={handleChange}
                        style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
                        className={`block w-full rounded-md p-3 ${errors.fullName ? 'border-red-600' : ''} rounded-md border-none py-1.5 text-sm font-400 text-white shadow-sm outline-none focus:ring-indigo-500 sm:text-base sm:leading-6`}
                        placeholder="Password"
                      />

                      {errors.cPassword && (
                        <div className="absolute inset-y-0 right-10 top-5 flex items-center space-x-1 pl-3 pr-1">
                          <div className="text-red-600 pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2">
                            <MdErrorOutline size={18} />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-y-0 right-0 top-0 flex items-center space-x-1 pl-3 pr-1">
                        <button
                          type="button"
                          onClick={() => setShowCPassword((prev) => !prev)}
                          className="font-regular text-foreground bg-button hover:bg-selection border-button hover:border-button-hover focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover relative !mr-1 inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-none px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
                        >
                          {showCPassword ? (
                            <BsEyeSlash size={18} />
                          ) : (
                            <BsEye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal mt-1 text-sm text-rose-500 transition-all">
                      {errors.cPassword}
                    </p>
                  </div>

                  <div className="mb-6 flex cursor-pointer items-center gap-3">
                    {/* <input
                                        type="radio"
                                        id='terms-condition'
                                    // checked={termsCondition ? true : false}
                                    /> */}
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsCondition}
                      onChange={handleTermsChange}
                      className=""
                    />
                    <label
                      htmlFor="terms"
                      className="cursor-pointer text-sm text-text6"
                    >
                      I Agree &{' '}
                      <Link href="/" className="text-primaryRgb">
                        Terms and conditions.
                      </Link>
                    </label>
                  </div>

                  <Button
                    disabled={isFormDisabled}
                    type="submit"
                    className={`font-regular hover:bg-primary border-brand relative flex cursor-pointer items-center gap-2 space-x-2 rounded-full bg-theme1 text-center font-600 text-white shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 ${
                      registerLoading ? 'bg-theme1 opacity-40' : ''
                    }`}
                  >
                    {registerLoading && <MiniLoadingCircle width="20" />}
                    Register
                  </Button>

                  <div className="my-8 self-center text-sm font-light">
                    <span className="text-text6">Already a Member? </span>
                    <Link
                      href="/ab/account-security/login"
                      className="ml-1 font-600 text-theme1"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUpForm;
