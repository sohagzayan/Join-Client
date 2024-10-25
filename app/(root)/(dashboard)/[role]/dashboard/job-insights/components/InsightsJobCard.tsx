'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobListing } from '@/data/models/JobInsights';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { FC } from 'react';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts';

interface InsightsJobCardProps {
  job: JobListing;
}

const InsightsJobCard: FC<InsightsJobCardProps> = ({ job }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <p className="text-muted-foreground text-sm">{job.location}</p>
        <p className="text-muted-foreground text-sm">{job.department}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="timeToFill">Time to Fill</TabsTrigger>
          </TabsList>
          <TabsContent value="views">
            <div className="mb-2 text-2xl font-bold">{job.views}</div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={job.viewsData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="applications">
            <div className="mb-2 text-2xl font-bold">{job.applications}</div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={job.applicationsData}>
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="timeToFill">
            <div className="mb-2 text-2xl font-bold">{job.timeToFill} days</div>
            <div className="bg-muted h-2.5 w-full rounded-full">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${(job.timeToFill / 50) * 100}%` }}
              ></div>
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between text-sm">
              <span>0 days</span>
              <span>50 days</span>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center">
            {job.views > 1000 ? (
              <ArrowUpIcon className="text-green-500 mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="text-red-500 mr-1 h-4 w-4" />
            )}
            {job.views > 1000 ? 'High visibility' : 'Low visibility'}
          </span>
          <span className="flex items-center">
            {job.applications > 30 ? (
              <ArrowUpIcon className="text-green-500 mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="text-red-500 mr-1 h-4 w-4" />
            )}
            {job.applications > 30 ? 'High interest' : 'Low interest'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsJobCard;
