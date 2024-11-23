'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const dynamicValues = [
  "Discover What's Next!",
  'Find Your Dream Role!',
  'Step Into Your Future!',
  'Achieve Career Goals!',
];

const letterVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 50,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const EnhancedDynamicTitle: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicValues.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white">
      <h1 className="mb-2 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <motion.span
          className="inline-block"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
        >
          Dream
        </motion.span>{' '}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
        >
          Job
        </motion.span>{' '}
        <span className="relative">
          Awaits!
          <motion.div
            className="absolute bottom-0 left-0 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <img
              src="/assets/images/slider-stoke-shape.svg"
              alt=""
              className="w-full"
            />
          </motion.div>
        </span>
      </h1>
      <AnimatePresence mode="wait">
        <motion.h2
          className="h-20 overflow-hidden text-3xl font-bold tracking-tight sm:h-24 sm:text-4xl md:h-20 md:text-5xl lg:h-20 lg:text-6xl"
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dynamicValues[index].split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={letterVariants}
              custom={i}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.span
                className="inline-block"
                animate={isHovered ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </motion.span>
          ))}
        </motion.h2>
      </AnimatePresence>
      <motion.div
        className="mt-4 text-xl text-blue-300 sm:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Your journey to success starts here!
      </motion.div>
    </div>
  );
};

export default EnhancedDynamicTitle;
