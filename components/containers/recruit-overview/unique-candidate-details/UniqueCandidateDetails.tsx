'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

const UniqueCandidateDetails = () => {
  useLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#unique_candidate_details_title',
        },
      })
      .fromTo(
        '#unique_candidate_details_title',
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
          trigger: '#unique_candidate_details_image',
        },
      })
      .fromTo(
        '#unique_candidate_details_image',
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
          trigger: '#unique_candidate_details_list',
        },
      })
      .fromTo(
        '#unique_candidate_details_list',
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
    <div id="brand_yourselfBox" className="bg-theme2">
      <div className="container py-6 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 items-center gap-20">
          <div className="align-middle">
            <div>
              <h2
                id="unique_candidate_details_title"
                className="text-2xl font-medium tracking-[-1.5px] text-white sm:text-3xl xl:text-4xl"
              >
                Unique candidate details you cant find anywhere else
              </h2>
              <p className="mt-4 text-xs text-text5 sm:text-sm md:w-5/6 lg:w-full lg:text-base">
                Create a profile that highlights your unique skills and
                preferences, <br /> then apply to jobs with just one click
              </p>
              <div className="mt-10 max-w-[300px] sm:max-w-md lg:max-w-md">
                <div className="w-4/12 border-t-2 border-black"></div>

                <ul className="mt-2 flex list-disc flex-col gap-3 px-4 font-medium text-text5">
                  <li id="unique_candidate_details_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Job search status
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Well tell you if a candidate is ready to interview or open
                      to offers
                    </p>
                  </li>
                  <li id="unique_candidate_details_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Skills & experience
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      We give candidates the ability to showcase this in unique
                      ways, like detailing their biggest accomplishment
                    </p>
                  </li>
                  <li id="unique_candidate_details_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Timezones
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      You can filter by timezones and see exactly how many hours
                      ahead or behind a candidate is
                    </p>
                  </li>
                  <li id="unique_candidate_details_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Remote preferences
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      Search by candidates who are open to remote work and see
                      what kind of remote culture theyre looking for
                    </p>
                  </li>
                  <li id="unique_candidate_details_list">
                    <h5 className="text-blue-midnight_blue mb-1 font-semibold">
                      Assessments
                    </h5>
                    <p className="text-blue-midnight_blue text-sm">
                      See video and engineering assessments to help you evaluate
                      skills further
                    </p>
                  </li>
                </ul>
                <div className="mt-4">
                  <Button
                    id="candidates_overview_hero_btn"
                    className="bg-blue-midnight_blue text-white"
                  >
                    Find talent
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="align-middle">
            <div>
              <Image
                id="unique_candidate_details_image"
                src="/assets/images/assessmentsProfile.png"
                width={450}
                height={450}
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

export default UniqueCandidateDetails;
