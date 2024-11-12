'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BookOpen,
  LineChart,
  Network,
  TrendingUp,
} from 'lucide-react';

const Market = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
            <CardTitle>Job Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green" />
                  <span className="font-medium">Frontend Development</span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-100 border-green text-green"
                >
                  High Demand
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-yellow" />
                  <span className="font-medium">Data Science</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-yellow bg-yellow text-white"
                >
                  Growing
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5 text-theme1" />
                  <span className="font-medium">Cloud Engineering</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-theme1 bg-theme1 text-white"
                >
                  Stable
                </Badge>
              </div>
            </div>
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
          className="border text-white shadow-lg"
        >
          <CardHeader>
            <CardTitle>Salary Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-text6">
                Based on your profile and market data:
              </p>
              <h3 className="text-3xl font-bold text-theme1">
                $95,000 - $120,000
              </h3>
              <p className="text-sm text-text6">
                Annual salary range for your skills and experience
              </p>
            </div>
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
          className="border text-white shadow-lg"
        >
          <CardHeader>
            <CardTitle>Networking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-theme1" />
                  <span className="font-medium">Connections</span>
                </div>
                <span className="font-semibold">287</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-theme1" />
                  <span className="font-medium">Profile Views</span>
                </div>
                <span className="font-semibold">56 this week</span>
              </div>
            </div>
            <Button className="w-full bg-theme1 text-white hover:bg-indigo-700">
              Expand Your Network
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Market;
