import React from 'react';
import { InputField, SelectDropdown } from '@/components/common';
import TextArea from '@/components/common/text-area';
import { Github, Globe, Linkedin, Search, Twitter } from 'lucide-react';
import Image from 'next/image';

const roleOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'qa_engineer', label: 'QA Engineer' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'product_owner', label: 'Product Owner' },
  { value: 'hr_manager', label: 'HR Manager' },
  { value: 'sales_executive', label: 'Sales Executive' },
  { value: 'marketing_specialist', label: 'Marketing Specialist' },
];

const exYearOptions = [
  { value: '0', label: '< 1 year' },
  { value: '1', label: '1 year' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '5', label: '5 years' },
  { value: '6', label: '6 years' },
  { value: '7', label: '7 years' },
  { value: '8', label: '8 years' },
  { value: '9', label: '9 years' },
];

const pronounsOptions = [
  { value: 'He / Him', label: 'He / Him' },
  { value: 'She / Her', label: 'She / Her' },
  { value: 'They / Them', label: 'They / Them' },
  { value: 'self-describe', label: 'Self-describe' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
];

const genderIdentOptions = [
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'self-describe', label: 'Self-describe' },
  { value: 'prefer not to say', label: 'Prefer not to say' },
];

const ethnicityOptions = [
  { value: 'black_african_american', label: 'Black / African-American' },
  {
    value: 'east_asian',
    label: 'East Asian (including Chinese, Japanese, Korean, and Mongolian)',
  },
  { value: 'hispanic_latino', label: 'Hispanic or Latino/a/x' },
  { value: 'middle_eastern', label: 'Middle Eastern' },
  {
    value: 'native_american_alaskan_native',
    label: 'Native American or Alaskan Native',
  },
  { value: 'pacific_islander', label: 'Pacific Islander' },
  {
    value: 'south_asian',
    label:
      'South Asian (including Bangladeshi, Bhutanese, Indian, Nepali, Pakistani, and Sri Lankan)',
  },
  {
    value: 'southeast_asian',
    label:
      'Southeast Asian (including Burmese, Cambodian, Filipino, Hmong, Indonesian, Laotian, Malaysian, Mien, Singaporean, Thai, and Vietnamese)',
  },
  { value: 'white', label: 'White' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  { value: 'self_describe', label: 'Self-describe' },
];

const EditProfile = () => {
  return (
    <div>
      <div className="mx-auto mt-6 rounded-xl bg-[rgba(255,255,255,0.06)] p-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <div className="w-[90%] lg:w-[330px]">
              <h2 className="text-xl font-600 text-white">About</h2>
              <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
                Tell us about yourself so startups know who you are.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <InputField label="Your name" showLabel={true} />
            </div>
            <div className="mt-4">
              <InputField label="Where are you based?" showLabel={true} />
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 lg:col-span-8">
                  <SelectDropdown
                    options={roleOptions}
                    label="Select your primary role"
                    showLabel={true}
                  />
                </div>
                <div className="col-span-6 lg:col-span-4">
                  <SelectDropdown
                    options={exYearOptions}
                    label="Years of experience"
                    showLabel={true}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <SelectDropdown
                options={roleOptions}
                label="Open to the following roles"
                showLabel={true}
              />
            </div>
            <div className="mt-4">
              <TextArea label="Your bio" showLabel={true} />
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <h2 className="text-xl font-600 text-white">Social Profiles</h2>
            <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
              Where can people find you online?
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <InputField
                label="Website"
                showLabel={true}
                placeholder="https://"
                icon={Globe}
              />
            </div>
            <div className="mt-4">
              <InputField
                label="LinkedIn"
                showLabel={true}
                icon={Linkedin}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="mt-4">
              <InputField
                label="GitHub"
                showLabel={true}
                icon={Github}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="mt-4">
              <InputField
                label="Twitter"
                showLabel={true}
                icon={Twitter}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <h2 className="text-xl font-600 text-white">
              Your work experience
            </h2>
            <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
              What other positions have you held?
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <div className="grid grid-cols-12 gap-3 rounded-md bg-themeDark p-4">
                <div className="col-span-1">
                  <Image
                    src={'/assets/images/promotion.png'}
                    width={70}
                    height={70}
                    alt="office"
                  />
                </div>
                <div className="col-span-11 flex justify-between">
                  <div>
                    <h3 className="text-lg font-500 text-white">
                      As software engineer
                    </h3>
                    <p className="text-theme1">500 Global</p>
                    <p className="text-text6">Feb 2024 to Present</p>
                  </div>
                  <div>
                    <button className="text-xl text-theme1">Edit</button>
                  </div>
                </div>
              </div>
              <button className="mt-1 text-theme1">
                + Add work experience
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <h2 className="text-xl font-600 text-white">Education</h2>
            <p className="mb:mb-0 mb-3 text-text6 lg:mb-0">
              What schools have you studied at?
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <div className="grid grid-cols-12 gap-3 rounded-md bg-themeDark p-3">
                <div className="col-span-1">
                  <Image
                    src={'/assets/images/educational.png'}
                    width={70}
                    height={70}
                    alt="office"
                  />
                </div>
                <div className="col-span-11 flex justify-between">
                  <div>
                    <h3 className="text-lg font-500 text-white">
                      City College of New York
                    </h3>
                    <p className="text-text6">34 and fd, BA</p>
                    <p className="text-theme1">5.0/5.0 GPA</p>
                    <p className="text-text6">2024</p>
                  </div>
                  <div>
                    <button className="text-xl text-theme1">Edit</button>
                  </div>
                </div>
              </div>
              <button className="mt-1 text-theme1">+ Add education</button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <div className="w-[90%] lg:w-[330px]">
              <h2 className="text-xl font-600 text-white">Your Skills</h2>
              <p className="mb:mb-0 mb-3 text-text6 lg:mb-0">
                This will help startups hone in on your strengths.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-themeDark px-4 py-1 text-sm text-white">
                    python
                  </span>
                  <span className="rounded-lg bg-themeDark px-4 py-1 text-sm text-white">
                    javascript
                  </span>
                  <span className="rounded-lg bg-themeDark px-4 py-1 text-sm text-white">
                    nodejs
                  </span>
                  <span className="rounded-lg bg-themeDark px-4 py-1 text-sm text-white">
                    nextjs
                  </span>
                </div>
                <div className="mt-4">
                  <InputField icon={Search} placeholder="e.g. Python, React" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <div className="w-[90%] lg:w-[330px]">
              <h2 className="text-xl font-600 text-white">Achievements</h2>
              <p className="text-text6">
                Sharing more details about yourself will help you stand out
                more.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <div>
                <div className="mt-4">
                  <TextArea
                    icon={Search}
                    placeholder="It's perfectly fine to showcase your achievements! For example, I developed and launched three successful Facebook apps that collectively reached over 2 million users and generated more than $100k in revenue. I was responsible for everything from front-end to back-end development and all aspects in between."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-text1" />
        <div className="mb-32 grid grid-cols-12">
          <div className="col-span-12 md:col-span-2 lg:col-span-4">
            <div className="w-[90%] lg:w-[330px]">
              <h2 className="mb-2 text-xl font-600 text-white">Identity</h2>
              <p className="mb-3 text-text6">
                At Jobjoy, we{"'"}re dedicated to helping companies hire in a
                more inclusive and diverse way. As part of this mission, we
                encourage candidates to voluntarily share demographic
                information to help recruiters build a more well-rounded hiring
                pipeline.
              </p>
              <p className="mb-3 text-text6 md:mb-0 lg:mb-0">
                Providing this information is completely optional, and we{"'"}ll
                ensure your data is handled with the utmost care. Your responses
                regarding gender and ethnicity will not be visible on your
                profile, and displaying your pronouns is also entirely up to
                you.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <div>
              <div>
                <div className="mt-4">
                  <SelectDropdown
                    options={pronounsOptions}
                    label="Pronouns"
                    showLabel={true}
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-white">
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-6 w-11 rounded-full border bg-themeDark after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-theme1 after:transition-all after:content-[''] peer-checked:bg-theme1 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme1 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                  Display pronouns on my profile
                </div>
                <div className="mt-4">
                  <SelectDropdown
                    options={genderIdentOptions}
                    label="Gender Identity"
                    showLabel={true}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-500 text-white">
                    Race/Ethnicity
                  </h3>
                  <p className="mb-3 text-sm text-text6">
                    You can select multiple
                  </p>
                  <div>
                    {ethnicityOptions?.map((e, index) => (
                      <div key={e.label} className="space-x-4 text-white">
                        <input type="checkbox" />
                        <label htmlFor="">{e.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
