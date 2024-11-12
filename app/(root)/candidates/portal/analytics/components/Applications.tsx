'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { motion } from 'framer-motion';

const Applications = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
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
            <CardTitle>Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-36 font-medium">Applied</div>
                <Progress value={100} className="flex-1" />
                <div className="w-12 text-right font-medium">44</div>
              </div>
              <div className="flex items-center">
                <div className="w-36 font-medium">Reviewed</div>
                <Progress value={75} className="flex-1" />
                <div className="w-12 text-right font-medium">33</div>
              </div>
              <div className="flex items-center">
                <div className="w-36 font-medium">Interview Invited</div>
                <Progress value={25} className="flex-1" />
                <div className="w-12 text-right font-medium">11</div>
              </div>
              <div className="flex items-center">
                <div className="w-36 font-medium">Offer Received</div>
                <Progress value={5} className="flex-1" />
                <div className="w-12 text-right font-medium">2</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
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
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div>
                  <h3 className="font-semibold">Senior Frontend Developer</h3>
                  <p className="text-sm text-text6">TechCorp Inc.</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow">In Review</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div>
                  <h3 className="font-semibold">Full Stack Engineer</h3>
                  <p className="text-sm text-text6">InnovateSoft</p>
                </div>
                <Badge variant="secondary" className="bg-theme1 text-white">
                  Applied
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.06)] p-4">
                <div>
                  <h3 className="font-semibold">UX/UI Designer</h3>
                  <p className="text-sm text-text6">DesignMasters</p>
                </div>
                <Badge
                  variant="outline"
                  className="border-green bg-green text-white outline-transparent"
                >
                  Interview Scheduled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Applications;
