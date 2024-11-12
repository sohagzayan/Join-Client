'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

const FindWork = () => {
  useLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#find_work_title',
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
          trigger: '#find_work_image',
        },
      })
      .fromTo(
        '#find_work_image',
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
          trigger: '#find_work_list',
        },
      })
      .fromTo(
        '#find_work_list',
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
              <h2
                id="find_work_title"
                className="text-2xl font-medium tracking-[-1.5px] text-white sm:text-3xl xl:text-4xl"
              >
                Find work that works for you
              </h2>
              <p className="mt-4 text-xs text-text5 sm:text-sm md:w-5/6 lg:w-full lg:text-base">
                A personalized and private job search, with all the info you
                care about, all upfront
              </p>
              <div className="mt-10 max-w-[300px] sm:max-w-md lg:max-w-md">
                <div className="w-4/12 border-t-2 border-theme1"></div>

                <ul className="mt-2 flex list-disc flex-col gap-2 px-4 font-medium text-text5">
                  <li id="find_work_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Stay in the know
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      No guessing games. View salary and stock options before
                      you apply.
                    </p>
                  </li>
                  <li className="find_work_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Personalized search
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Personalized filters make it quick and easy to find the
                      jobs you care about
                    </p>
                  </li>
                  <li id="find_work_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Unique roles, exciting teams
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Discover unique jobs with future-defining teams
                    </p>
                  </li>
                </ul>

                <Button className="hover:bg-blue-midnight_blue/90 mt-4 border-2 border-transparent bg-theme1 text-white transition-all duration-200 ease-in-out hover:border-theme1 hover:bg-transparent hover:text-theme1">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
          <div className="align-middle">
            <div>
              <Image
                id="find_work_image"
                src="/assets/images/find_work.png"
                style={{ width: '100%', height: '100%' }}
                width={0}
                height={0}
                sizes="100wv"
                alt="Ranch Investor"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindWork;
