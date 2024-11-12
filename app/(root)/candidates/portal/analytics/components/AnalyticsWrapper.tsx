import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Applications from './Applications';
import Market from './Market';
import Overview from './Overview';
import Skills from './Skills';

const AnalyticsWrapper = () => {
  const applicationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications Sent',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const interviewPerformanceData = {
    labels: [
      'Technical Skills',
      'Communication',
      'Problem Solving',
      'Cultural Fit',
      'Leadership',
    ],
    datasets: [
      {
        label: 'Your Performance',
        data: [4.2, 3.8, 4.5, 4.0, 3.5],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)',
      },
      {
        label: 'Average Performance',
        data: [3.8, 3.5, 3.7, 3.9, 3.6],
        fill: true,
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        borderColor: 'rgb(244, 63, 94)',
        pointBackgroundColor: 'rgb(244, 63, 94)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(244, 63, 94)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="container px-4 md:px-0">
      <div>
        <div className="text-center">
          <h2 className="py-6 text-3xl font-600 text-white">
            Candidate Analytics Dashboard
          </h2>
        </div>
        <div>
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList
              style={{
                borderColor: 'rgba(255, 255, 255, 0.14)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
              }}
              className="grid w-full grid-cols-4 gap-4 rounded-lg border p-1 text-white"
            >
              <TabsTrigger
                className="data-[state=active]:bg-theme1 data-[state=active]:text-white"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-theme1 data-[state=active]:text-white"
                value="applications"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-theme1 data-[state=active]:text-white"
                value="skills"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-theme1 data-[state=active]:text-white"
                value="market"
              >
                Job Market
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="">
              <Overview
                chartOptions={chartOptions}
                applicationData={applicationData}
              />
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Applications />
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Skills
                interviewPerformanceData={interviewPerformanceData}
                applicationData={applicationData}
              />
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              <Market />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWrapper;
