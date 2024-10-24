'use client';

// @ts-expect-error The error is expected because ApexOptions is not defined in the current scope.
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardChart = () => {
  // Total Employee Chart Options
  const totalEmployeeOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Others', 'Onboarding', 'Offboarding'],
    colors: ['#00E396', '#FEB019', '#008FFB'],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
            },
            total: {
              show: true,
              label: 'Total Emp',
              fontSize: '16px',
              fontWeight: 400,
              color: '#fff',
            },
          },
        },
      },
    },
    legend: { show: false },
  };

  // Job Summary Chart Options
  const jobSummaryOptions: ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Active Job', 'Inactive', 'Closed'],
    colors: ['#9C27B0', '#00D9E9', '#FF9800'],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
            },
            total: {
              show: true,
              label: 'Total Jobs',
              fontSize: '16px',
              fontWeight: 400,
              color: '#fff',
            },
          },
        },
      },
    },
    legend: { show: false },
  };

  // Team Performance Chart Options
  const teamPerformanceOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#00E396', '#FEB019'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: { style: { colors: '#fff' } },
    },
    yaxis: {
      min: 30,
      max: 60,
      labels: { style: { colors: '#fff' } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: {
        colors: '#FFFFFF',
      },
    },
    markers: { size: 5 },
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-black8 p-4 text-gray-300 shadow">
        <h2 className="mb-2 text-lg font-semibold">Total Employee</h2>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-300">All Time</span>
          <svg
            className="h-4 w-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <Chart
          options={totalEmployeeOptions}
          series={[71, 27, 23]}
          type="donut"
          height={250}
        />
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#00E396]"></span>
              Others
            </span>
            <span>71</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#FEB019]"></span>
              Onboarding
            </span>
            <span>27</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#008FFB]"></span>
              Offboarding
            </span>
            <span>23</span>
          </div>
        </div>
      </div>

      <div className="text- rounded-lg bg-black8 p-4 text-gray-300 shadow">
        <h2 className="mb-2 text-lg font-semibold">Job Summary</h2>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-300">All Time</span>
          <svg
            className="h-4 w-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <Chart
          options={jobSummaryOptions}
          series={[36, 13, 6]}
          type="donut"
          height={250}
        />
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#9C27B0]"></span>
              Active Job
            </span>
            <span>36</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#00D9E9]"></span>
              Inactive
            </span>
            <span>13</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full bg-[#FF9800]"></span>
              Closed
            </span>
            <span>6</span>
          </div>
        </div>
      </div>

      <div className="text- rounded-lg bg-black8 p-4 text-gray-300 shadow">
        <h2 className="mb-2 text-lg font-semibold">Team Performance</h2>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-300">Last 7 month</span>
          <svg
            className="h-4 w-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <Chart
          options={teamPerformanceOptions}
          series={[
            { name: 'Project Team', data: [42, 40, 45, 48, 47, 42, 50] },
            { name: 'Product Team', data: [38, 45, 40, 50, 45, 38, 41] },
          ]}
          type="line"
          height={250}
        />
      </div>
    </div>
  );
};

export default DashboardChart;
