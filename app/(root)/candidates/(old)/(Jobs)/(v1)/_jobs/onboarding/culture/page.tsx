'use client';
import LoadingCircle from '@/components/shared/loading-circle/LoadingCircle';
import MultiSelect from '@/components/shared/multi-select/MultiSelect';
import { Button } from '@/components/ui/button';
import {
  currencies,
  most_important_next_job,
  required_skills,
} from '@/utils/data';
import axios from 'axios';
import { useFormik } from 'formik';
import { Check, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import * as Yup from 'yup';

const Culture = () => {
  const [activeCurrenciesSymbol, setActiveCurrenciesSymbol] = useState<any>(
    currencies[0].symbol,
  );
  const [
    selectedMostInterestedWorkingWith,
    setSelectedMostInterestedWorkingWith,
  ] = useState<string[]>([]);
  const [selectedTechnologiesNotWilling, setSelectedTechnologiesNotWilling] =
    useState<string[]>([]);
  const [selectedMostImportantNextJob, setSelectedMostImportantNextJob] =
    useState<string[]>([]);

  const handleSelectMostInterestedWorkingWithRemove = (role: string) => {
    setSelectedMostInterestedWorkingWith(
      selectedMostInterestedWorkingWith.filter(
        (selected: any) => selected !== role,
      ),
    );
  };

  const handleSelectTechnologiesNotWillingRemove = (role: string) => {
    setSelectedTechnologiesNotWilling(
      selectedTechnologiesNotWilling.filter(
        (selected: any) => selected !== role,
      ),
    );
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      technology_interests: [],
      unpreferred_technologies: [],
      primary_motivators: '',
      future_career_aspirations: '',
      preferred_work_environment: '',
      most_important_to_you_for_next_job: [],
      remote_work_flexibility_preference: '',
      quiet_office_preference_priority: '',
      next_job_desires: '',
    },
    validationSchema: Yup.object({
      technology_interests: Yup.array().of(Yup.string()),
      unpreferred_technologies: Yup.array().of(Yup.string()),
      primary_motivators: Yup.string(),
      future_career_aspirations: Yup.string(),
      preferred_work_environment: Yup.string(),
      most_important_to_you_for_next_job: Yup.array().of(Yup.string()),
      remote_work_flexibility_preference: Yup.string(),
      quiet_office_preference_priority: Yup.string(),
      next_job_desires: Yup.string()
        .required("Please tell us what you're looking for in your next role.")
        .max(300, 'You over the 300 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log('values >', values);
        console.log('all values >', values);
        const res = await axios.post('/api/onboarding/culture', values);
        if (res.statusText) {
          router.push('/jobs/onboarding/resume');
          setLoading(false);
        }
        console.log('res', res);
        setLoading(false);
      } catch (error: any) {
        console.log('error > ', error.message);
        setLoading(false);
      }
    },
  });

  const technology_interests_roleValidation = (value: any) => {
    formik.setFieldValue('technology_interests', value);
  };

  const unpreferred_technologies_roleValidation = (value: any) => {
    formik.setFieldValue('unpreferred_technologies', value);
  };

  const handleMostImportantNextJob = (next: string) => {
    const valueToAdd = next.toLowerCase();
    const isValueSelected = selectedMostImportantNextJob.includes(valueToAdd);
    if (selectedMostImportantNextJob.length === 2 && !isValueSelected) {
      // If the maximum limit is reached and the value is not already selected, do nothing
      return;
    }

    if (isValueSelected) {
      // If the value is already selected, remove it from the array
      const excludesValue = selectedMostImportantNextJob.filter(
        (next) => next.toLowerCase() !== valueToAdd,
      );
      setSelectedMostImportantNextJob(excludesValue);
      formik.setFieldValue('most_important_to_you_for_next_job', excludesValue);
    } else {
      // If the value is not selected, add it to the array
      setSelectedMostImportantNextJob((prev) => [...prev, valueToAdd]);
      formik.setFieldValue('most_important_to_you_for_next_job', [
        ...selectedMostImportantNextJob,
        valueToAdd,
      ]);
    }
  };

  return (
    <div className="container mt-10 lg:px-16 xl:px-20">
      <div className="mx-auto w-[900px] rounded-[8px] border bg-white p-[30px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Which technologies are you{' '}
              <span className="text-primary">most</span> interested in working
              with?{' '}
            </h2>
            <div className="mt-2 flex items-center gap-4">
              <div>
                <ul className="mb-2 flex flex-wrap items-center gap-4">
                  {selectedMostInterestedWorkingWith.map((role: any) => (
                    <li
                      className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                      onClick={() =>
                        handleSelectMostInterestedWorkingWithRemove(role)
                      }
                      key={role + 160}
                    >
                      <CiCircleCheck strokeWidth={1.25} size={20} /> {role}
                    </li>
                  ))}
                </ul>
                <div className="w-[260px]">
                  <MultiSelect
                    allSelectList={required_skills}
                    placeholder="Select up to 5 technologies "
                    setSelected={setSelectedMostInterestedWorkingWith}
                    selected={selectedMostInterestedWorkingWith}
                    searchIcon={true}
                    maximumSelect={5}
                    validationFunc={technology_interests_roleValidation}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Which technologies are you{' '}
              <span className="text-red-500">not</span> willing to work with?
            </h2>
            <div className="mt-2 flex items-center gap-4">
              <div>
                <ul className="mb-2 flex flex-wrap items-center gap-4">
                  {selectedTechnologiesNotWilling.map((role: any) => (
                    <li
                      className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                      onClick={() =>
                        handleSelectTechnologiesNotWillingRemove(role)
                      }
                      key={role + 170}
                    >
                      <CiCircleCheck strokeWidth={1.25} size={20} /> {role}
                    </li>
                  ))}
                </ul>
                <div className="w-[260px]">
                  <MultiSelect
                    allSelectList={required_skills}
                    placeholder="Select up to 5 technologies "
                    setSelected={setSelectedTechnologiesNotWilling}
                    selected={selectedTechnologiesNotWilling}
                    searchIcon={true}
                    validationFunc={unpreferred_technologies_roleValidation}
                    maximumSelect={5}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What motivates you more?
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 md:flex-nowrap">
              <div className="flex items-center gap-2 rounded-full border p-2 px-4">
                <input
                  id="Solving technical problems"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'primary_motivators',
                        e.target.checked ? 'solving technical problems' : '',
                      );
                    }
                  }}
                  value="solving technical problems"
                  name="primary_motivators"
                  checked={
                    formik.values.primary_motivators ===
                    'solving technical problems'
                  }
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="Solving technical problems"
                >
                  Solving technical problems
                </label>
              </div>
              <div className="flex items-center gap-2 rounded-full border p-2 px-4">
                <input
                  id="building products"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                  value="building products"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'primary_motivators',
                        e.target.checked ? 'building products' : '',
                      );
                    }
                  }}
                  name="primary_motivators"
                  checked={
                    formik.values.primary_motivators === 'building products'
                  }
                />
                <label
                  className="text-foreground-light block text-sm"
                  htmlFor="building products"
                >
                  building products
                </label>
              </div>
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Over the next five years, what career track do you want to follow?
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 md:flex-nowrap">
              <div className="flex items-center gap-2 rounded-full border p-2 px-4">
                <input
                  id="individual contributor"
                  name="future_career_aspirations"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'future_career_aspirations',
                        e.target.checked ? 'individual contributor' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.future_career_aspirations ===
                    'individual contributor'
                  }
                  value="individual contributor"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block cursor-pointer text-sm"
                  htmlFor="individual contributor"
                >
                  Individual contributor
                </label>
              </div>
              <div className="flex items-center gap-2 rounded-full border p-2 px-4">
                <input
                  id="manager"
                  name="future_career_aspirations"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'future_career_aspirations',
                        e.target.checked ? 'manager' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.future_career_aspirations === 'manager'
                  }
                  value="manager"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light block cursor-pointer text-sm"
                  htmlFor="manager"
                >
                  Manager
                </label>
              </div>
            </div>
          </div>

          <div className="before:text-primary relative mb-6 before:absolute before:-left-4 before:top-0 before:content-['*']">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              What environment do you work better in?
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="clear_role"
                  name="preferred_work_environment"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_work_environment',
                        e.target.checked
                          ? 'clear role and set of responsibilities. Consistent feedback from management.'
                          : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.preferred_work_environment ===
                    'clear role and set of responsibilities. Consistent feedback from management.'
                  }
                  value="clear role and set of responsibilities. Consistent feedback from management. "
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="clear_role"
                >
                  Clear role and set of responsibilities. Consistent feedback
                  from management.
                </label>
              </div>
              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="employees_wear"
                  name="preferred_work_environment"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'preferred_work_environment',
                        e.target.checked
                          ? 'employees wear a lot of hats. Assignments often require employees to figure it out on their own.'
                          : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.preferred_work_environment ===
                    'employees wear a lot of hats. Assignments often require employees to figure it out on their own.'
                  }
                  value="employees wear a lot of hats. Assignments often require employees to figure it out on their own."
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="employees_wear"
                >
                  Employees wear a lot of hats. Assignments often require
                  employees to figure it out on their own.
                </label>
              </div>
            </div>
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Whats most important to you in your next job? (Max 2)
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {most_important_next_job.map((next) => {
                const isExits = selectedMostImportantNextJob.includes(
                  next.toLowerCase(),
                );
                return (
                  <div
                    onClick={() => handleMostImportantNextJob(next)}
                    key={next}
                    className={`flex cursor-pointer items-center gap-2 rounded-full p-2 px-4 font-semibold ${isExits ? 'bg-primary border-primary text-white' : 'text-blue-midnight_blue bg-light_gray border'}`}
                  >
                    {isExits ? (
                      <span className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-circle-check-big"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <path d="m9 11 3 3L22 4" />
                        </svg>
                      </span>
                    ) : (
                      <Circle
                        strokeWidth={1.25}
                        size={18}
                        className="text-blue-steel_blue"
                      />
                    )}

                    <label
                      className="text-foreground-light block cursor-pointer text-sm"
                      htmlFor={next}
                    >
                      {next}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              How important is it that your next job has a flexible remote work
              policy?{' '}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="very important"
                  name="remote_work_flexibility_preference"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'remote_work_flexibility_preference',
                        e.target.checked ? 'very important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.remote_work_flexibility_preference ===
                    'very important'
                  }
                  value="very important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="very important"
                >
                  Very important
                </label>
              </div>

              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="important"
                  name="remote_work_flexibility_preference"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'remote_work_flexibility_preference',
                        e.target.checked ? 'important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.remote_work_flexibility_preference ===
                    'important'
                  }
                  value="important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="important"
                >
                  Important
                </label>
              </div>

              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="not important"
                  name="remote_work_flexibility_preference"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'remote_work_flexibility_preference',
                        e.target.checked ? 'not important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.remote_work_flexibility_preference ===
                    'not important'
                  }
                  value="not important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="not important"
                >
                  Not important
                </label>
              </div>
            </div>
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              How important is it that you work in a quiet office?{' '}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="very important quiet_office"
                  name="quiet_office_preference_priority"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'quiet_office_preference_priority',
                        e.target.checked ? 'very important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.quiet_office_preference_priority ===
                    'very important'
                  }
                  value="very important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="very important quiet_office"
                >
                  Very important
                </label>
              </div>

              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="important quiet_office"
                  name="quiet_office_preference_priority"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'quiet_office_preference_priority',
                        e.target.checked ? 'important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.quiet_office_preference_priority ===
                    'important'
                  }
                  value="important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="important quiet_office"
                >
                  Important
                </label>
              </div>

              <div className="bg-light_gray flex items-center gap-2 rounded-full border p-2 px-4 font-semibold">
                <input
                  id="not important quiet_office"
                  name="quiet_office_preference_priority"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue(
                        'quiet_office_preference_priority',
                        e.target.checked ? 'not important' : '',
                      );
                    }
                  }}
                  checked={
                    formik.values.quiet_office_preference_priority ===
                    'not important'
                  }
                  value="not important"
                  type="checkbox"
                  className="border-light_gray h-4 w-4 rounded-full"
                />
                <label
                  className="text-foreground-light text-blue-midnight_blue block text-sm"
                  htmlFor="not important quiet_office"
                >
                  Not important
                </label>
              </div>
            </div>
          </div>

          <div className="relative mb-6">
            <h2 className="text-blue-midnight_blue text-base font-semibold">
              Describe what you are looking for in your next job
            </h2>
            <p className="text-sm">
              Startups tell us this is one of the first things they look at in a
              profile
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                className={`text-blue-midnight_blue -mb-2 text-sm ${formik.touched.next_job_desires && formik.errors.next_job_desires ? 'text-red-500' : null}`}
              >
                {' '}
                {formik.values.next_job_desires.length} / 300
              </span>
              <textarea
                onChange={formik.handleChange}
                value={formik.values.next_job_desires}
                className="text-foreground border-control group box-border block min-h-[120px] w-full rounded-md border px-4 py-2 text-sm shadow-sm transition-all"
                name="next_job_desires"
                id="next_job_desires"
                placeholder="e.g., What drives my work ethic is building products that are user centered. I hope to see real impact from the work that I take on. I am looking for a small to medium sized company near Boston, ideally working on design systems and/or building out product features while working closely with design and PM."
              ></textarea>
              {formik.touched.next_job_desires &&
              formik.errors.next_job_desires ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.next_job_desires}
                </p>
              ) : null}
            </div>
          </div>

          <div className="my-4">
            <p className="text-green-500 flex items-center gap-2 text-sm">
              {' '}
              <Check strokeWidth={1.25} size={20} />{' '}
              <strong>You are almost done!</strong> Complete profile and start
              searching for your dream job.
            </p>
          </div>

          <Button className="">
            {loading ? (
              <div>
                <LoadingCircle />
                Loading
              </div>
            ) : (
              'Save and continue'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Culture;
