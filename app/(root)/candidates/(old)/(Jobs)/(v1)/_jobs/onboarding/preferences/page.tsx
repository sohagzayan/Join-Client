'use client';
import React, { useEffect, useRef, useState } from 'react';
import { City, Country, State } from 'country-state-city';
import {
  countryList,
  currencies,
  job_profile,
  required_skills,
} from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import JobProfileSelect from '@/components/containers/find_job_page/job_profile_select/JobProfileSelect';
import RequiredSkills from '@/components/containers/dashboard-content/post-new-job/required-skills/RequiredSkills';
import MultiSelect from '@/components/shared/multi-select/MultiSelect';
import { CiCircleCheck, CiSearch } from 'react-icons/ci';
import { Search } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingCircle from '@/components/shared/loading-circle/LoadingCircle';

const Preferences = () => {
  const [activeCurrenciesSymbol, setActiveCurrenciesSymbol] = useState<any>(
    currencies[0].symbol,
  );
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const preferred_roleValidation = (value: any) => {
    formik.setFieldValue('preferred_role', value);
  };

  const handleSelectToleRemove = (role: string) => {
    const exclude = selectedRole.filter((selected: any) => selected !== role);
    setSelectedRole(exclude);
    preferred_roleValidation(exclude);
  };

  const formik = useFormik({
    initialValues: {
      job_search_status: '',
      preferred_job_type: '',
      desired_salary: '',
      desired_salary_info: currencies[0],
      preferred_role: null,
      preferred_work_locations: '',
      remote_work_flexibility: false,
    },
    validationSchema: Yup.object({
      job_search_status: Yup.string().required(
        'Please tell us where you are in your job search',
      ),
      preferred_job_type: Yup.string()
        .min(1, 'Min one job type should select')
        .required('Please let us know what kind of job youre looking for.'),
      desired_salary: Yup.string(),
      desired_salary_info: Yup.object()
        .shape({
          name: Yup.string(),
          symbol: Yup.string(),
        })
        .default(() => currencies[0]),
      preferred_role: Yup.array()
        .of(Yup.string())
        .required("Please choose the kind of role you're looking for."),
      preferred_work_locations: Yup.string(),
      remote_work_flexibility: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log('all values >', values);
        const res = await axios.post('/api/onboarding/preferences', values);
        console.log('res', res);
        if (res.statusText) {
          router.push('/jobs/onboarding/culture');
          setLoading(false);
        }
        setLoading(false);
      } catch (error: any) {
        console.log('error > ', error.message);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container mt-10 lg:px-16 xl:px-20">
      <div className="mx-auto w-[900px] rounded-[8px] border bg-white p-[30px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Where are you in your job search?
            </h2>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
              <div className="">
                <div className="flex items-center gap-2 rounded-full border p-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        formik.setFieldValue(
                          'job_search_status',
                          e.target.checked ? 'ready to interview' : '',
                        );
                      }
                    }}
                    id="job_search_status"
                    name="job_search_status"
                    value="ready to interview"
                    type="checkbox"
                    checked={
                      formik.values.job_search_status === 'ready to interview'
                    }
                    className="border-light_gray h-4 w-4 rounded-full"
                  />
                  <label
                    className="text-foreground-light block text-sm"
                    htmlFor="email"
                  >
                    Ready to interview
                  </label>
                </div>
                <div className="mx-2 mt-1 border-l px-2">
                  <span className="text-[12px] font-medium">This means:</span>
                  <p className="text-[12px]">
                    You’re actively looking for new work and ready to interview.
                    Your job profile will be visible by startups.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-2 rounded-full border p-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        formik.setFieldValue(
                          'job_search_status',
                          e.target.checked ? 'open to offer' : '',
                        );
                      }
                    }}
                    id="job_search_status"
                    name="job_search_status"
                    value="open to offer"
                    checked={
                      formik.values.job_search_status === 'open to offer'
                    }
                    type="checkbox"
                    className="border-light_gray h-4 w-4 rounded-full"
                  />
                  <label
                    className="text-foreground-light block text-sm"
                    htmlFor="email"
                  >
                    Open to offers
                  </label>
                </div>
                <div className="mx-2 mt-1 border-l px-2">
                  <span className="text-[12px] font-medium">This means:</span>
                  <p className="text-[12px]">
                    You’re not looking but open to hear about new opportunities.
                    Your job profile will be visible to startups.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-2 rounded-full border p-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        formik.setFieldValue(
                          'job_search_status',
                          e.target.checked ? 'closed to offers' : '',
                        );
                      }
                    }}
                    id="job_search_status"
                    name="job_search_status"
                    value="closed to offers"
                    checked={
                      formik.values.job_search_status === 'closed to offers'
                    }
                    type="checkbox"
                    className="border-light_gray h-4 w-4 rounded-full"
                  />
                  <label
                    className="text-foreground-light block text-sm"
                    htmlFor="email"
                  >
                    Closed to offers
                  </label>
                </div>
                <div className="mx-2 mt-1 border-l px-2">
                  <span className="text-[12px] font-medium">This means:</span>
                  <p className="text-[12px]">
                    You’re not looking and don’t want to hear about new
                    opportunities. Your job profile will be hidden to startups.
                  </p>
                </div>
              </div>
            </div>
            {formik.touched.job_search_status &&
            formik.errors.job_search_status ? (
              <p className="text-red-500 mt-1 text-sm">
                {formik.errors.job_search_status}
              </p>
            ) : null}
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What type of job are you interested in?
            </h2>
            <p className="text-[12px]">
              Choose just one for now. You can change this or add more types
              later
            </p>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border px-4 py-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_job_type',
                        e.target.checked ? 'full-time employee' : '',
                      );
                    }
                  }}
                  value="full-time employee"
                  checked={
                    formik.values.preferred_job_type === 'full-time employee'
                  }
                  id="preferred_job_type"
                  name="preferred_job_type"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Full-time Employee
                </label>
              </div>

              <div className="flex items-center gap-2 rounded-full border px-4 py-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_job_type',
                        e.target.checked ? 'contractor' : '',
                      );
                    }
                  }}
                  value="contractor"
                  id="preferred_job_type"
                  name="preferred_job_type"
                  checked={formik.values.preferred_job_type === 'contractor'}
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Contractor
                </label>
              </div>

              <div className="flex items-center gap-2 rounded-full border px-4 py-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_job_type',
                        e.target.checked ? 'intern' : '',
                      );
                    }
                  }}
                  value="intern"
                  id="preferred_job_type"
                  name="preferred_job_type"
                  type="checkbox"
                  checked={formik.values.preferred_job_type === 'intern'}
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Intern
                </label>
              </div>

              <div className="flex items-center gap-2 rounded-full border px-4 py-2">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_job_type',
                        e.target.checked ? 'co-founder' : '',
                      );
                    }
                  }}
                  value="co-founder"
                  id="preferred_job_type"
                  name="preferred_job_type"
                  checked={formik.values.preferred_job_type === 'co-founder'}
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="email"
                >
                  Co-founder
                </label>
              </div>
            </div>
            {formik.touched.preferred_job_type &&
            formik.errors.preferred_job_type ? (
              <p className="text-red-500 mt-1 text-sm">
                {formik.errors.preferred_job_type}
              </p>
            ) : null}
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What is your desired salary?
            </h2>
            <p className="text-[12px]">
              This information will never be shown on your public profile
            </p>
            <div className="mt-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <label htmlFor="">{activeCurrenciesSymbol}</label>
                  <input
                    name="desired_salary"
                    onChange={formik.handleChange}
                    value={formik.values.desired_salary}
                    type="text"
                    className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-[100px] rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
                  />
                </div>
                <select
                  onChange={(e) => {
                    // formik.handleChange(e);
                    formik.setFieldValue(
                      'desired_salary_info',
                      JSON.parse(e.target.value),
                    );

                    console.log('e', e.target.value);
                    console.log(
                      'JSON.parse(e.target.value',
                      JSON.parse(e.target.value),
                    );
                    setActiveCurrenciesSymbol(
                      JSON.parse(e.target.value).symbol,
                    );
                  }}
                  id="countries"
                  name="desired_salary_info"
                  className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  {currencies.map((c: any) => (
                    <option key={c.name + 140} value={JSON.stringify(c)}>
                      {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What kind of role are you looking for?
            </h2>
            <p className="text-[12px]">Tip: You can select more than one</p>
            <div className="mt-2 flex items-center gap-4">
              <div>
                <ul className="mb-2 flex flex-wrap items-center gap-4">
                  {selectedRole.map((role: any) => (
                    <li
                      className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                      onClick={() => handleSelectToleRemove(role)}
                      key={role + 150}
                    >
                      <CiCircleCheck strokeWidth={1.25} size={20} /> {role}
                    </li>
                  ))}
                </ul>
                <div className="w-[260px]">
                  <MultiSelect
                    validationFunc={preferred_roleValidation}
                    allSelectList={job_profile}
                    placeholder="Select a role.. "
                    setSelected={setSelectedRole}
                    selected={selectedRole}
                    searchIcon={true}
                  />
                  {formik.touched.preferred_role &&
                  formik.errors.preferred_role ? (
                    <p className="text-red-500 mt-1 text-sm">
                      {formik.errors.preferred_role}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What locations do you want to work in?
            </h2>
            <div className="mt-2 w-[260px]">
              <select
                onChange={formik.handleChange}
                name="preferred_work_locations"
                id="preferred_work_locations"
                className="peer/input text-foreground focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted bg-foreground/[.026] border-control group box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md"
              >
                {countryList.map((country) => (
                  <option key={country + 130}>{country}</option>
                ))}
              </select>
              {formik.touched.preferred_work_locations &&
              formik.errors.preferred_work_locations ? (
                <p className="text-red-500 mt-1 text-sm">
                  {formik.errors.preferred_work_locations}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <div className="relative mb-6 flex items-center gap-2">
              <input
                onChange={(e) => {
                  formik.setFieldValue(
                    'remote_work_flexibility',
                    e.target.checked ? true : false,
                  );
                  console.log('e.target.checked', e.target.checked);
                }}
                checked={formik.values.remote_work_flexibility}
                value="true"
                type="checkbox"
                name=""
                id="open_to_working_remotely"
                className="h-4 w-4"
              />
              <label
                htmlFor="open_to_working_remotely"
                className="text-blue-midnight_blue text-sm"
              >
                Im open to working remotely
              </label>
            </div>
            {formik.touched.remote_work_flexibility &&
            formik.errors.remote_work_flexibility ? (
              <p className="text-red-500 mt-1 text-sm">
                {formik.errors.remote_work_flexibility}
              </p>
            ) : null}
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

export default Preferences;
