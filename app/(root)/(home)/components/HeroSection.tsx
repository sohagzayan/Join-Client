'use client';
import Marquee from '@/components/shared/Marquee/Marquee';
import { motion } from 'framer-motion';
import throttle from 'lodash/throttle';
import React, { useState } from 'react';
//@ts-ignore
import DynamicTitle from './DynamicTitle';
import QuickSearch from './QuickSearch';

const AnimatedHeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, 50); // Limit updates to every 50ms

  return (
    <motion.div
      className="relative z-0 min-h-screen overflow-x-clip bg-gradient-to-b from-gray-900 to-gray-800"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* <BackgroundAnimation mousePosition={mousePosition} /> */}

      <div className="container relative z-10 mx-auto px-4 py-10 sm:py-20">
        <AnimatedContent />
        <div className="sm:hidden">
          <AnimatedContent />
        </div>
      </div>

      <motion.div
        className="mt-10 sm:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Marquee />
      </motion.div>
    </motion.div>
  );
};

const AnimatedContent: React.FC = () => (
  <motion.div
    className="rounded-3xl p-4 backdrop-blur-lg backdrop-filter sm:p-8"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.8 }}
  >
    <motion.div
      className="mb-4 sm:mb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h2 className="mb-2 text-center text-xl font-bold text-white sm:mb-4 sm:text-2xl">
        Welcome to a new era of{' '}
        <span className="text-blue-400">innovation</span> with...
      </h2>
      <DynamicTitle />
    </motion.div>

    <motion.p
      className="mb-4 text-center text-base text-gray-300 sm:mb-8 sm:text-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Unlock endless opportunities and take the next step in your career
      journey. Whether you{"'"}re chasing your passion or exploring new paths,
      we{"'"}re here to help you find the perfect fit. Your dream job is just a
      click away—let{"'"}s make it happen together!
    </motion.p>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <QuickSearch />
    </motion.div>
  </motion.div>
);

interface BackgroundAnimationProps {
  mousePosition: { x: number; y: number };
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  mousePosition,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 50%)',
        }}
        animate={{
          backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
        }}
        transition={{ duration: 0.1 }}
      />
      <svg
        className="absolute bottom-0 left-0 h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <motion.path
          fill="rgba(59, 130, 246, 0.1)"
          fillOpacity="1"
          initial={{
            d: 'M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
          }}
          animate={{
            d: 'M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,234.7C672,203,768,149,864,138.7C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 10,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedHeroSection;
