'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';

// Animation Variants
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const bounceIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Skills = ({ interviewPerformanceData, chartOptions }: any) => {
  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      {/* Skills Assessment Card */}
      <motion.div variants={fadeInScale} transition={{ duration: 0.6 }}>
        <Card
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="border text-white shadow-lg"
        >
          <CardHeader>
            <CardTitle>Skills Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                { skill: 'React', value: 90, level: 'Expert' },
                { skill: 'Node.js', value: 75, level: 'Advanced' },
                { skill: 'Python', value: 60, level: 'Intermediate' },
                { skill: 'AWS', value: 40, level: 'Beginner' },
              ].map(({ skill, value, level }, index) => (
                <motion.div
                  key={index}
                  variants={fadeInLeft}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-center"
                >
                  <div className="w-36 font-medium">{skill}</div>
                  <Progress value={value} className="flex-1" />
                  <div className="w-20 text-right font-medium">{level}</div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interview Performance Card */}
      <motion.div variants={fadeInLeft} transition={{ duration: 0.8 }}>
        <Card
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="border text-white shadow-lg"
        >
          <CardHeader>
            <CardTitle>Interview Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="h-80"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Radar
                data={interviewPerformanceData}
                options={{
                  ...chartOptions,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommended Skills Card */}
      <motion.div variants={fadeInScale} transition={{ duration: 0.8 }}>
        <Card
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="border text-white shadow-lg"
        >
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="mb-4 flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              {[
                'TypeScript',
                'GraphQL',
                'Docker',
                'Kubernetes',
                'Machine Learning',
              ].map((skill, index) => (
                <motion.div key={index} variants={bounceIn}>
                  <Badge
                    variant="outline"
                    className={
                      index % 2 === 0
                        ? 'border-theme1 bg-theme1 text-white'
                        : 'bg-pink-100 border-theme1 text-theme1'
                    }
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
            <Button className="w-full bg-theme1 text-white hover:bg-indigo-700">
              Start Learning
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
