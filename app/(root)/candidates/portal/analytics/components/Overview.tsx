'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Activity, BriefcaseIcon, Star, Users } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
);

const Overview = ({ applicationData, chartOptions }: any) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            className="border text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-600">
                Total Applications
              </CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-theme1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">44</div>
              <p className="text-green-500 text-xs">+10% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            className="border text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interview Invites
              </CardTitle>
              <Users className="h-4 w-4 text-theme1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-green-500 text-xs">+2 this week</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            className="border text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Views
              </CardTitle>
              <Activity className="h-4 w-4 text-theme1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">321</div>
              <p className="text-green-500 text-xs">+18% from last week</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card
            style={{
              borderColor: 'rgba(255, 255, 255, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
            }}
            className="border text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Job Match Score
              </CardTitle>
              <Star className="h-4 w-4 text-theme1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-text5">Based on your profile</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
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
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 text-white">
              <Bar data={applicationData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;
