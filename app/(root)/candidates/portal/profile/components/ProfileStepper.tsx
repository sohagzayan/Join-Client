'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { FiGlobe } from 'react-icons/fi'; // Replace this with your desired icon library

const steps = [
  'Personal',
  'Social',
  'Experience',
  'Skills',
  'Resume',
  'Preferences',
];

const ProfileMenu = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (!stepperRef.current || !highlightRef.current) return;

    const activeElement = stepperRef.current.children[activeStep];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;

      gsap.to(highlightRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [activeStep]);

  useEffect(() => {
    // Animate menu items on load
    const items = stepperRef.current?.children;
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Menu Container */}
      <div
        ref={stepperRef}
        className="no-scrollbar relative flex items-center gap-4 overflow-x-auto rounded-full bg-gray-100 p-2 shadow-md"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE
          WebkitOverflowScrolling: 'touch', // Smooth scrolling for Safari
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
              activeStep === index
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{
              transform: activeStep === index ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => setActiveStep(index)}
          >
            <FiGlobe
              className={`text-xl transition-all duration-300 ${
                activeStep === index ? 'text-white' : 'text-gray-400'
              }`}
            />
            {step}
          </div>
        ))}

        {/* Highlight Background */}
        <div
          ref={highlightRef}
          className="bg-purple-500 absolute left-0 top-0 h-full rounded-full transition-all duration-300"
          style={{
            width: '100px',
            transform: 'translateX(0)',
          }}
        ></div>
      </div>

      {/* Step Content */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-600">
          {steps[activeStep]} Content
        </h2>
        <p className="mt-4 text-gray-600">
          This is the content for the <strong>{steps[activeStep]}</strong> menu
          item.
        </p>
      </div>
    </div>
  );
};

export default ProfileMenu;
