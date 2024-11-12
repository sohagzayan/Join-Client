import { ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  messages: Message[];
  assignments: number;
  dueDate?: string;
  salary?: string;
  location: string;
};

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    status: 'Interview',
    messages: [
      {
        id: 1,
        sender: 'HR Manager',
        content:
          'Thank you for your application. We would like to schedule an interview.',
        timestamp: '2 days ago',
      },
      {
        id: 2,
        sender: 'You',
        content:
          'Thank you for considering my application. Im available for an interview next week.',
        timestamp: '1 day ago',
      },
    ],
    assignments: 1,
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'DesignHub',
    status: 'Applied',
    messages: [],
    assignments: 0,
    location: 'Remote',
    salary: '$90,000 - $110,000',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'DataWise',
    status: 'Offer',
    messages: [
      {
        id: 1,
        sender: 'Hiring Manager',
        content:
          'Were pleased to offer you the position of Data Scientist at DataWise.',
        timestamp: '3 days ago',
      },
    ],
    assignments: 2,
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'InnovateCo',
    status: 'Screening',
    messages: [],
    assignments: 0,
    location: 'Seattle, WA',
    salary: '$110,000 - $140,000',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    status: 'Applied',
    messages: [],
    assignments: 1,
    location: 'Austin, TX',
    salary: '$100,000 - $130,000',
  },
];

const ApplicationJourney = () => {
  return (
    <div className="">
      <div>
        <h2 className="mb-6 mt-6 text-2xl font-600 font-bold text-white">
          Application Journey
        </h2>
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {['Applied', 'Screening', 'Interview', 'Offer'].map(
            (stage, index) => (
              <div key={stage} className="w-full flex-1 md:w-auto">
                <div
                  className="to-purple-600 relative overflow-hidden rounded-lg border p-4 text-white"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
                  }}
                >
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-customGradient p-2 text-white">
                    <span className="text-2xl font-bold">
                      {jobs.filter((job) => job.status === stage).length}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{stage}</h3>
                  <p className="text-sm opacity-80">
                    {index === 0 && 'Your journey begins'}
                    {index === 1 && 'Making progress'}
                    {index === 2 && 'Almost there'}
                    {index === 3 && 'Success awaits'}
                  </p>
                  {index < 3 && (
                    <ArrowRight
                      className="absolute bottom-2 right-2 text-white opacity-50"
                      size={24}
                    />
                  )}
                </div>
              </div>
            ),
          )}
        </div>
        <div
          style={{
            borderColor: 'rgba(255, 255, 255, 0.14)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
          }}
          className="b mt-6 rounded-lg border px-6 py-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-green2" size={20} />
                <span className="text-sm font-medium text-white">
                  2 Completed
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-amber-300" size={20} />
                <span className="text-sm font-medium text-white">
                  3 In Progress
                </span>
              </div>
              <div className="flex items-center">
                <XCircle className="mr-2 text-rose-500" size={20} />
                <span className="text-sm font-medium text-white">
                  1 Rejected
                </span>
              </div>
            </div>
            <button className="rounded-md bg-theme1 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-indigo-700">
              View All Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationJourney;
