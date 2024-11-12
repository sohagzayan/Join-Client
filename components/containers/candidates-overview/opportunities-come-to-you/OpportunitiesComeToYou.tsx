'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

const OpportunitiesComeToYou = () => {
  useLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#opportunities_come_to_you_title',
        },
      })
      .fromTo(
        '#find_work_title',
        {
          y: 200,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
        },
        {
          y: 0,
          duration: 0.7,
          opacity: 1,
          ease: 'back.out(1.7)',
        },
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#opportunities_come_to_you_image',
        },
      })
      .fromTo(
        '#opportunities_come_to_you_image',
        {
          y: 200,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
        },
        {
          y: 0,
          duration: 0.7,
          opacity: 1,
          ease: 'back.out(1.7)',
        },
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#opportunities_come_to_you_list',
        },
      })
      .fromTo(
        '#opportunities_come_to_you_list',
        {
          y: 200,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
        },
        {
          y: 0,
          duration: 0.7,
          opacity: 1,
          // stagger: 0.05,
          ease: 'back.out(1.7)',
        },
      );
  }, []);

  return (
    <div className="bg-themeDark p-6">
      <div className="container py-6 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 items-center gap-20">
          <div className="align-middle">
            <div>
              <Image
                id="opportunities_come_to_you_image"
                src="/assets/images/connect_founder.png"
                style={{ width: '100%', height: '100%' }}
                width={0}
                height={0}
                sizes="100wv"
                alt="Ranch Investor"
              />
            </div>
          </div>
          <div className="align-middle">
            <div>
              <h2
                id="opportunities_come_to_you_title"
                className="text-2xl font-medium tracking-[-1.5px] text-white sm:text-3xl xl:text-4xl"
              >
                Let the opportunities come to you
              </h2>

              <div className="mt-10 max-w-[300px] sm:max-w-md lg:max-w-md">
                <div className="w-4/12 border-t-2 border-theme1"></div>

                <ul className="mt-2 flex list-disc flex-col gap-2 px-4 font-medium text-text5">
                  <li id="opportunities_come_to_you_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Connect with founders
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Let founders pitch you directly on their opportunity.
                    </p>
                  </li>
                  <li id="opportunities_come_to_you_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Get featured
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Feature your profile even further and make 3x more
                      connections
                    </p>
                  </li>
                  <li id="opportunities_come_to_you_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Unique roles, exciting teams
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Discover unique jobs with future-defining teams
                    </p>
                  </li>
                </ul>

                <Button className="hover:bg-blue-midnight_blue/90 mt-4 border-2 border-transparent bg-theme1 text-white hover:border-theme1 hover:bg-transparent hover:text-theme1">
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesComeToYou;
