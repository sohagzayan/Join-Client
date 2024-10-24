import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import Chart from './Chart';

const OverViews = () => {
  const stats = [
    {
      title: 'Permanent Employees',
      value: 3540,
      percentage: 5.14,
      status: 'increase',
    },
    {
      title: 'Contract Employees',
      value: 1150,
      percentage: 12.2,
      status: 'decrease',
    },
    {
      title: 'Freelance Employees',
      value: 500,
      percentage: 5.14,
      status: 'increase',
    },
    {
      title: 'Internship/Training',
      value: 93,
      percentage: 5.14,
      status: 'increase',
    },
  ];

  return (
    <div>
      <div className="mt-10 grid grid-cols-1 gap-6 rounded-lg bg-black8 p-3 text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="border-r pr-5 last:border-none">
            <h3 className="text-lg font-medium text-gray-300">{stat.title}</h3>
            <div className="text-4xl font-semibold text-gray-300">
              {stat.value}
            </div>
            <div className="mt-2 flex items-center text-sm">
              {stat.status === 'increase' ? (
                <ArrowUpIcon className="text-green-500 mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="text-red-500 mr-1 h-4 w-4" />
              )}
              <span
                className={`${
                  stat.status === 'increase' ? 'text-green-500' : 'text-red-500'
                } font-semibold`}
              >
                {stat.percentage}%
              </span>
              <span className="ml-1 text-gray-500">
                {stat.status === 'increase'
                  ? 'increased vs last month'
                  : 'decreased vs last month'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* chart  */}
      <div className="my-5">
        <Chart />
      </div>
    </div>
  );
};

export default OverViews;
