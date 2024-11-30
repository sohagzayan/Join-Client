'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

const BrandYourself = () => {
  useLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#brand_yourself_title',
        },
      })
      .fromTo(
        '#brand_yourself_title',
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
          trigger: '#brand_yourself_image',
        },
      })
      .fromTo(
        '#brand_yourself_image',
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
          trigger: '#brand_yourself_list',
        },
      })
      .fromTo(
        '#brand_yourself_list',
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
    <div id="brand_yourselfBox" className="bg-theme1 p-6">
      <div className="container py-6 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 items-center gap-20">
          <div className="align-middle">
            <div>
              <Image
                id="brand_yourself_image"
                src="/assets/images/brand288.png"
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
                id="brand_yourself_title"
                className="text-2xl font-medium tracking-[-1.5px] text-white sm:text-3xl xl:text-4xl"
              >
                Brand yourself for new opportunities
              </h2>
              <p className="mt-4 text-xs text-text5 sm:text-sm md:w-5/6 lg:w-full lg:text-base">
                Create a profile that highlights your unique skills and
                preferences, <br /> then apply to jobs with just one click
              </p>
              <div className="mt-10 max-w-[300px] sm:max-w-md lg:max-w-md">
                <div className="w-4/12 border-t-2 border-green"></div>

                <ul className="mt-2 flex list-disc flex-col gap-3 px-4 font-medium text-text5">
                  <li id="brand_yourself_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      One click apply
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Say goodbye to cover letters - your profile is all you
                      need. One click to apply then youre done.
                    </p>
                  </li>
                  <li id="brand_yourself_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Set your preferences
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Streamline the interview process by setting your
                      expectations (salary, industry, culture, etc.) upfront.
                    </p>
                  </li>
                </ul>

                <Button className="hover:bg-blue-midnight_blue/90 mt-4 bg-white text-theme1">
                  Create your profile for free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandYourself;
