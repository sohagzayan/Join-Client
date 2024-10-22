import React from 'react';
import PropTypes from 'prop-types';
import ProfileTab from '@/components/shared/profile-tab/ProfileTab';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WiEarthquake } from 'react-icons/wi';
import { IoMdClose } from 'react-icons/io';

const Overview = () => {
  return (
    <div>
      <div>
        <ProfileTab />
      </div>
      <div className="mt-5">
        <h3 className="text-blue-midnight_blue text-2xl font-medium">
          What recruiters will see
        </h3>
      </div>
      <div className="mt-3 rounded-md border p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/images/avatar.webp"
              width={64}
              height={64}
              className="rounded-full"
              alt="profile"
            />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium">Sohag Hossain Zayan </h3>
                <div className="bg-light_gray rounded-full px-2 py-1 text-sm">
                  <span>Active today</span>
                </div>
              </div>
              <p className="text-blue-midnight_blue text-sm">
                2 years of exp • Open to remote
              </p>
            </div>
          </div>
          <div>
            <Button className="bg-light_gray text-blue-midnight_blue hover:bg-light_gray h-auto p-1 text-sm">
              Resume
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-blue-midnight_blue text-sm">Looking for</h3>
          <p className="text-blue-midnight_blue mt-2 flex items-center gap-3 text-sm">
            <span>
              <WiEarthquake />
            </span>
            Describe what you are looking for in your next job
          </p>
        </div>
        <div className="mt-5">
          <h3 className="text-blue-midnight_blue text-lg font-medium">
            Ideal next opportunity
          </h3>
          <div className="mt-2">
            <div>
              <h3 className="text-blue-midnight_blue text-sm">Looking for</h3>
              <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                Flexible
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">Desired Role</h3>
              <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                Full-Stack Engineer
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">Remote Work</h3>
              <div className="flex items-center gap-2">
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  Full-Stack Engineer
                </span>
                <p className="text-sm">
                  Prefers remote work, but is open to work onsite
                </p>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">
                Desired Location
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  Dhaka (current)
                </span>
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  United States
                </span>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">
                Desired Tech Stack
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  Express.js
                </span>
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  Bootstrap
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <IoMdClose />
              <p className="text-sm">
                Prefers remote work, but is open to work onsite
              </p>
            </div>
            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">Remote Work</h3>
              <div className="flex items-center gap-2">
                <span className="bg-light_gray mt-1 inline-block px-2 py-1 text-sm">
                  51-200
                </span>
                <p className="text-sm">
                  Open to 1-10, 11-50, 201-500, 501-1000 or 1000+
                </p>
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-blue-midnight_blue text-sm">Wants</h3>
              <ul className="mt-2 grid list-disc grid-cols-2 gap-2 px-4 text-sm">
                <li>To build products</li>
                <li>Individual contributor track</li>
                <li>Company with clear roles</li>
                <li>Autonomy</li>
                <li>A flexible remote work policy</li>
                <li>Quiet office</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
