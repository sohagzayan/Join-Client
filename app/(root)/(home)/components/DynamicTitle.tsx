'use client';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

const dynamicValues = [
  "Discover What's Next!",
  'Find Your Dream Role!',
  'Step Into Your Future!',
  'Achieve Career Goals!',
];

const EnhancedDynamicTitle: React.FC = () => {
  const [index, setIndex] = useState(0);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const topTitleRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Active Animation for Top Title
    const timeline = gsap.timeline({ repeat: -1, delay: 1 });
    topTitleRefs.current.forEach((el, i) => {
      timeline.to(
        el,
        {
          scale: 1.1,
          rotate: 5,
          color: '#3b82f6', // Light blue tint
          duration: 1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        i * 0.3, // Stagger effect
      );
    });

    return () => {
      timeline.kill(); // Cleanup timeline
    };
  }, []);

  useEffect(() => {
    // Animate Dynamic Subtitle Characters
    if (charRefs.current.length) {
      gsap.fromTo(
        charRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
        },
      );
    }
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicValues.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleHover = (el: HTMLElement) => {
    gsap.to(el, {
      scale: 1.2,
      rotate: 10,
      color: '#4ade80', // Green glow
      textShadow: '0px 0px 15px #4ade80',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleHoverOut = (el: HTMLElement) => {
    gsap.to(el, {
      scale: 1,
      rotate: 0,
      color: '#ffffff',
      textShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className="text-center text-white">
      {/* Main Title with Active Animation */}
      <h1
        ref={titleRef}
        className="mb-2 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        <span
          ref={(el) => (topTitleRefs.current[0] = el!)}
          className="inline-block cursor-pointer"
          onMouseEnter={(e) => handleHover(e.currentTarget)}
          onMouseLeave={(e) => handleHoverOut(e.currentTarget)}
        >
          Dream
        </span>{' '}
        <span
          ref={(el) => (topTitleRefs.current[1] = el!)}
          className="inline-block cursor-pointer"
          onMouseEnter={(e) => handleHover(e.currentTarget)}
          onMouseLeave={(e) => handleHoverOut(e.currentTarget)}
        >
          Job
        </span>{' '}
        <span
          ref={(el) => (topTitleRefs.current[2] = el!)}
          className="relative cursor-pointer"
          onMouseEnter={(e) => handleHover(e.currentTarget)}
          onMouseLeave={(e) => handleHoverOut(e.currentTarget)}
        >
          Awaits!
          <div className="absolute bottom-0 left-0 w-full">
            <img
              src="/assets/images/slider-stoke-shape.svg"
              alt=""
              className="w-full"
            />
          </div>
        </span>
      </h1>

      {/* Dynamic Subtitle */}
      <h2 className="h-20 overflow-hidden text-3xl font-bold tracking-tight sm:h-24 sm:text-4xl md:h-20 md:text-5xl lg:h-20 lg:text-6xl">
        {dynamicValues[index].split('').map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => (charRefs.current[i] = el!)}
            className="inline-block cursor-pointer"
            onMouseEnter={() => handleHover(charRefs.current[i])}
            onMouseLeave={() => handleHoverOut(charRefs.current[i])}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      {/* Static Tagline */}
      <div ref={taglineRef} className="mt-4 text-xl text-blue-300 sm:text-2xl">
        Your journey to success starts here!
      </div>
    </div>
  );
};

export default EnhancedDynamicTitle;
