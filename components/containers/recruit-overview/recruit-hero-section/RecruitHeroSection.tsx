'use client';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';

const RecruitHeroSection = () => {
  useLayoutEffect(() => {
    gsap.from('.char', {
      y: 100,
      stagger: 0.05,
      duration: 0.5,
      rotate: 25,
      ease: 'back.out(1.7)',
    });
    gsap.fromTo(
      '#candidates_overview_hero_content',
      {
        y: 200,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      {
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
    );
    gsap.fromTo(
      '#candidates_overview_hero_btn',
      {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
    );
  }, []);
  return (
    <div className="container py-6 lg:px-16 xl:px-20">
      <div className="pb-[120px] pt-[9rem] text-center">
        <h1
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            lineHeight: '6rem',
          }}
          id="candidates_overview_title"
          className="candidates_overview_title text-[80px] font-bold text-white"
        >
          You have a job.
          <br />
          We have 10m+ job seekers.
        </h1>
        <div id="candidates_overview_hero_content" className="">
          <p className="py-6 text-[22px] text-text6">
            Millions of startup-ready candidates, uniquely specific filters for
            finding niche talent, and all the tools you need to hire. Sign up
            now & have everything set up in 10 minutes, for free.
          </p>
          <div className="flex items-center justify-center gap-5">
            <Button
              id="candidates_overview_hero_btn"
              className="border-2 border-transparent bg-theme1 text-white hover:border-theme1 hover:bg-transparent"
            >
              Sign up now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitHeroSection;
