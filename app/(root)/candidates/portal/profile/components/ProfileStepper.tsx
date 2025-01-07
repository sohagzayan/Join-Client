'use client';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import SocialInfo from './SocialInfo';
import YourResume from './YourResume';

const steps = ['Profile', 'Social', 'Resume', 'Preferences'];

const CandidateProfileManager = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef<any>(null);
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
    console.log('active tab', activeTab);
    switch (activeTab) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <SocialInfo />;
      case 2:
        return <YourResume />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      {/* Step Content */}
      <div className="rounded-lg shadow-md transition-all duration-300">
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
