'use client';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import Experience from './Experience';
import PersonalInfo from './PersonalInfo';
import SocialInfo from './SocialInfo';
import YourPreferences from './YourPreferences';
import YourResume from './YourResume';
import YourSkills from './YourSkills';

const steps = [
  'Personal Info',
  'Social',
  'Experience',
  'Skills',
  'Resume',
  'Preferences',
];

const CandidateProfileManager = () => {
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

  const getContent = (activeTab: number) => {
    switch (activeTab) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <SocialInfo />;
      case 2:
        return <Experience />;
      case 3:
        return <YourSkills />;
      case 4:
        return <YourResume />;
      case 5:
        return <YourPreferences />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Menu Container */}
      <div
        ref={stepperRef}
        className="no-scrollbar relative flex items-center gap-4 overflow-x-auto rounded-full to-gray-800 p-2 shadow-md"
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
      <div className="mt-8 rounded-lg p-6 shadow-md transition-all duration-300">
        {getContent(activeStep)}
        <p className="mt-4 text-gray-600">
          This is the content for the <strong>{steps[activeStep]}</strong> menu
          item.
        </p>
      </div>
    </div>
  );
};

export default CandidateProfileManager;
