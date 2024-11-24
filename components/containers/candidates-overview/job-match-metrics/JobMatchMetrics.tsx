'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import SplitType from 'split-type';

const JobMatchMetrics = () => {
  useLayoutEffect(() => {
    const title = new SplitType('.metrics');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#metricsBox',
          // scrub: true,
          // start: "top 1%",
          // end: "bottom top",
          // markers: false
        },
      })
      .from('.metrics .char', {
        // scrollTrigger: "#metricsBox",
        y: 100,
        stagger: 0.05,
        duration: 0.5,
        rotate: 25,
        ease: 'back.out(1.7)',
      });
  }, []);

  return (
    <div className="bg-light_gray p-6">
      <div className="container py-6 lg:px-16 xl:px-20">
        <div className="mb-7 text-center">
          <span className="mb-6 inline-block font-bold text-theme1">
            Careers
          </span>
          <h3 className="text-3xl font-medium tracking-[-1.5px] text-white md:text-4xl lg:mx-auto lg:max-w-2xl xl:max-w-3xl xl:text-5xl">
            Were on a mission to build the best developer platform
          </h3>
          <p className="text-foreground-lighter mx-auto my-5 max-w-sm text-sm text-text6 sm:max-w-md md:max-w-lg md:text-base">
            Explore remote possibilities and join our team to help us achieve
            it.
          </p>
          <Button className="mt-3 h-0 border-2 border-transparent bg-theme1 py-4 text-white hover:border-theme1 hover:bg-transparent">
            Open Position
          </Button>
        </div>
        <hr className="border-[rgba(255,255,255,.1)]" />
        <div className="mt-5 flex flex-wrap justify-between text-theme1">
          <div className="text-center">
            <h3
              id="metricsBox"
              className="metrics text-blue-midnight_blue text-[5rem] font-bold"
            >
              8M+
            </h3>
            <p className="text-[1rem] font-semibold text-text5">Matches Made</p>
          </div>
          <div className="text-center">
            <h3 className="metrics text-blue-midnight_blue text-[5rem] font-bold">
              150K+
            </h3>
            <p className="text-[1rem] font-semibold text-text5">Tech Jobs</p>
          </div>
          <div className="text-center">
            <h3 className="metrics text-blue-midnight_blue text-[5rem] font-bold leading-tight">
              10M+
            </h3>
            <p className="text-[1rem] font-semibold text-text5">
              Startup Ready Candidates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchMetrics;
