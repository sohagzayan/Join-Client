'use client';
import React, { useEffect, useRef, useState } from 'react';
import { City, Country, State } from 'country-state-city';
import { countryList, job_profile, onboarding_experience } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegCircle } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingCircle from '@/components/shared/loading-circle/LoadingCircle';
import { useSession } from 'next-auth/react';

const ExtendedProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();

  console.log('session me', session);

  const formik = useFormik({
    initialValues: {
      where_you_based: '',
      currentRole: '',
      experienceInRole: '',
      isStudentOrNewGrad: 'no',
      job_title: '',
      company: '',
      isEmployed: false,
      linkedinProfile: '',
      personalWebsite: '',
    },
    validationSchema: Yup.object({
      where_you_based: Yup.string().required(
        'Where you based field is required',
      ),
      currentRole: Yup.string().required('Current role field is required'),
      experienceInRole: Yup.string().required(
        'Experience in role field is required',
      ),
      isStudentOrNewGrad: Yup.string(),
      isEmployed: Yup.boolean(),
      job_title: Yup.string().when('isEmployed', (isEmployed: any, schema) => {
        if (isEmployed[0] === true) {
          return schema.notRequired();
        }
        return schema.required('job title  field is required');
      }),
      company: Yup.string().when('isEmployed', (isEmployed: any, schema) => {
        if (isEmployed[0] === true) {
          return schema.notRequired();
        }
        return schema.required('company field  is required');
      }),

      linkedinProfile: Yup.string().matches(
        /^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
        'Invalid LinkedIn profile URL',
      ),
      personalWebsite: Yup.string().url(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log('all values >', values);
        const res = await axios.post(
          '/api/onboarding/extended_profile',
          values,
        );
        if (res.statusText) {
          // router.push("/jobs/onboarding/preferences")
          update({
            ...res.data.user,
          });
          setLoading(false);
        }
        console.log('res  profile>', res);
        setLoading(false);
      } catch (error: any) {
        console.log('error > ', error.message);
        setLoading(false);
      }

      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container mt-10 lg:px-16 xl:px-20">
      <div className="mx-auto w-[900px] rounded-[8px] border bg-white p-[30px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Where are you based?
            </h2>
            <p className="text-foreground-light text-xs lg:text-sm">
              Broad skill sets. Growth mindset.
            </p>
            <div className="mt-2 w-[260px]">
              <select
                id="where_you_based"
                name="where_you_based"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.where_you_based}
                className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
              >
                <option value="" selected>
                  Select country
                </option>
                {countryList.map((country: string) => (
                  <option key={country + 100}>{country}</option>
                ))}
              </select>
              {formik.touched.where_you_based &&
              formik.errors.where_you_based ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.where_you_based}
                </div>
              ) : null}
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What best describes your current role?
            </h2>
            <div className="mt-2 w-[260px]">
              <select
                name="currentRole"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentRole}
                id="countries"
                className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
              >
                <option value="" selected>
                  Select role
                </option>
                {job_profile.map((country) => (
                  <option key={country}>{country + 110}</option>
                ))}
              </select>
              {formik.touched.currentRole && formik.errors.currentRole ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.currentRole}
                </div>
              ) : null}
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              How many years of experience do you have in your current role?
            </h2>
            <div className="mt-2 w-[260px]">
              <select
                name="experienceInRole"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experienceInRole}
                id="countries"
                className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
              >
                <option value="" selected>
                  Experience in current role
                </option>
                {onboarding_experience.map((country: string) => (
                  <option key={country + 120}>{country}</option>
                ))}
              </select>
              {formik.touched.experienceInRole &&
              formik.errors.experienceInRole ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.experienceInRole}
                </div>
              ) : null}
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Are you a student or new grad?
            </h2>
            <div className="mt-2 flex w-[260px] items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'isStudentOrNewGrad',
                        e.target.checked ? 'yes' : '',
                      );
                    }
                  }}
                  id="isStudentOrNewGradYes"
                  name="isStudentOrNewGrad"
                  type="checkbox"
                  value="yes"
                  checked={formik.values.isStudentOrNewGrad === 'yes'}
                  className={`hidden h-4 w-4`}
                />
                <label
                  htmlFor="isStudentOrNewGradYes"
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-1 ${formik.values.isStudentOrNewGrad === 'yes' ? 'bg-primary border-primary text-white' : 'text-blue-midnight_blue border'}`}
                >
                  {formik.values.isStudentOrNewGrad === 'yes' ? (
                    <FiCheckCircle />
                  ) : (
                    <FaRegCircle />
                  )}
                  Yes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'isStudentOrNewGrad',
                        e.target.checked ? 'no' : '',
                      );
                    }
                  }}
                  id="isStudentOrNewGradNo"
                  name="isStudentOrNewGrad"
                  value="no"
                  type="checkbox"
                  checked={
                    formik.values.isStudentOrNewGrad === 'no' ? true : false
                  }
                  className={`hidden h-4 w-4`}
                />
                <label
                  htmlFor="isStudentOrNewGradNo"
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-1 ${formik.values.isStudentOrNewGrad === 'no' ? 'bg-primary border-primary text-white' : 'text-blue-midnight_blue border'}`}
                >
                  {formik.values.isStudentOrNewGrad === 'no' ? (
                    <FiCheckCircle />
                  ) : (
                    <FaRegCircle />
                  )}
                  No
                </label>
              </div>
            </div>
            {formik.touched.isStudentOrNewGrad &&
            formik.errors.isStudentOrNewGrad ? (
              <div className="text-red-500 text-sm">
                {formik.errors.isStudentOrNewGrad}
              </div>
            ) : null}
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Where do you currently work?
            </h2>
            <p className="text-blue-steel_blue text-sm">
              Your company will never see that youre looking for a job
            </p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Job title
                </label>
                <input
                  name="job_title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.job_title}
                  id=""
                  type="text"
                  className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
                  placeholder="s.g. Design Director"
                />

                {formik.touched.job_title && formik.errors.job_title ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.job_title}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Company
                </label>
                <input
                  name="company"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                  id=""
                  type="text"
                  className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
                  placeholder="s.g. google"
                />
                {formik.touched.company && formik.errors.company ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.company}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isEmployed"
                  name="isEmployed"
                  onChange={formik.handleChange}
                  checked={formik.values.isEmployed}
                  // value={formik.values.isEmployed}
                  type="checkbox"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="isEmployed"
                  className="text-blue-midnight_blue text-sm"
                >
                  Im not currently employed
                </label>
              </div>
            </div>
          </div>

          <div className="bg-light_gray relative mb-6 p-6">
            <div className="mt-2 flex w-[260px] flex-col items-center gap-4">
              <div className="flex flex-col">
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Linkedin Profile
                </label>
                <input
                  name="linkedinProfile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.linkedinProfile}
                  id=""
                  type="text"
                  className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
                  placeholder="https://linkedin.com/in/"
                />
                {formik.touched.linkedinProfile &&
                formik.errors.linkedinProfile ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.linkedinProfile}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Your Website
                </label>
                <input
                  name="personalWebsite"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.personalWebsite}
                  id=""
                  type="text"
                  className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
                  placeholder="https://mypersonalwebsite.com"
                />
                {formik.touched.personalWebsite &&
                formik.errors.personalWebsite ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.personalWebsite}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <Button type="submit" className="">
            {loading ? (
              <div>
                <LoadingCircle />
                Loading
              </div>
            ) : (
              'Create you profile'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExtendedProfile;
