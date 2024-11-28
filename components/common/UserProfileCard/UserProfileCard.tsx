'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Camera, ExternalLink, MapPin, Sparkles, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserProfileCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS'];

  // Profile completion percentage animation
  useEffect(() => {
    const profileProgress = 85; // Example progress percentage
    setProgress(profileProgress);
    springProgress.set(profileProgress);
  }, [springProgress]);

  // Gradient rotation animation
  const rotate = useMotionValue(0);
  const gradient = useTransform(rotate, [0, 360], ['0deg', '360deg']);

  useEffect(() => {
    const controls = animate(rotate, 360, {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    });
    return controls.stop;
  }, [rotate]);

  return (
    <div className="w-full p-4 md:p-8">
      <div className="relative">
        {/* Animated spotlight effect */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#071203] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Card */}
        <div
          className="group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 to-violet-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ rotate: gradient }}
          />

          {/* Profile Content */}
          <div className="relative flex flex-col items-center space-y-2">
            {/* Profile Image Container */}

            <div className="flex items-center gap-5">
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <div className="relative h-32 w-32 md:h-20 md:w-20">
                  <div className="animate-tilt absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-cyan-500 to-violet-500 opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-50" />
                  <motion.img
                    src="/candidate-1.webp"
                    alt="John Does"
                    className="ring-white/10 relative h-full w-full rounded-3xl object-cover ring-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Profile completion indicator */}
                  <motion.div
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-medium text-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Trophy className="h-4 w-4" />
                  </motion.div>
                </div>

                {/* Camera Button */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute -bottom-2 -right-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <label
                        htmlFor="profile-image"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-violet-500 shadow-lg transition-transform hover:scale-110"
                      >
                        <Camera className="h-4 w-4 text-white" />
                        <input
                          id="profile-image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2">
                  <h1 className="to-white/60 bg-gradient-to-r from-white bg-clip-text text-3xl font-light tracking-tight text-transparent md:text-4xl">
                    Jose <span className="font-medium">Does</span>
                  </h1>
                  <Sparkles className="text-yellow-500 h-5 w-5" />
                </div>
                <p className="text-sm font-light text-gray-400">
                  Senior Software Engineer
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex items-center gap-1.5 text-xs text-gray-400"
                >
                  <MapPin className="h-3 w-3" />
                  <span>San Francisco, CA</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-1 flex-col items-center text-center">
              {/* Profile Completion Bar */}
              <motion.div
                className="mt-4 w-full space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Profile Completion</span>
                  <motion.span
                    className="font-medium text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-rose-500 via-cyan-500 to-violet-500"
                    style={{
                      scaleX: springProgress.get() / 100,
                      transformOrigin: '0%',
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                  >
                    <div className="via-white/25 h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                className="mt-4 flex flex-wrap justify-center gap-1.5 md:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {skills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="border-white/10 bg-white/5 hover:bg-white/10 relative overflow-hidden rounded-full border text-xs font-light text-gray-300 backdrop-blur-sm transition-colors"
                  >
                    {skill}
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-500/20 via-cyan-500/20 to-violet-500/20"
                      animate={{
                        x: ['0%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: index * 0.2,
                      }}
                    />
                  </Badge>
                ))}
              </motion.div>

              {/* Action Button */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 group relative overflow-hidden rounded-full px-6 font-light text-white backdrop-blur-sm transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Portfolio
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-500/20 via-cyan-500/20 to-violet-500/20"
                    animate={{
                      x: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfileCard;

const animate = (
  value: any,
  target: number,
  options: { duration: number; repeat: number; ease: string },
) => {
  return {
    start: () => {
      value.set(target);
      return {
        stop: () => null,
      };
    },
    stop: () => null,
  };
};
