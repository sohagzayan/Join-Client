import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
interface Job {
  title: string;
  rate: string;
  description: string;
}

const jobs: Job[] = [
  {
    title: 'Senior Ruby on Rails Engineer',
    rate: '$60/hr',
    description:
      'Lorem ipsum dolor sit amet, consect velit, vulputate eu pharetra nec.',
  },
  {
    title: 'Senior Product Designer',
    rate: '$45/hr',
    description:
      'Lorem ipsum dolor sit amet, consect velit, vulputate eu pharetra nec.',
  },
];

const Suggestion = () => {
  return (
    <section className="p-3">
      {/* Overview Section */}
      <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg">
        <Card className="mx-auto my-5 w-[90%] border-none">
          <CardHeader className="flex items-center justify-center pb-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-10 w-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-400">
              Track time on Hubstaff
            </h2>
            <p className="text-sm text-gray-500">
              Pay only for the hours worked
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button className="mb-2 w-full rounded bg-theme1 px-5 py-2">
              Sign Up
            </Button>
            <Link href="#" className="text-sm text-blue-500 hover:underline">
              Learn more...
            </Link>
          </CardFooter>
        </Card>
        <JobSection title="TOP JOBS" jobs={jobs} />
        <JobSection title="MOST VIEWED THIS WEEK" jobs={jobs} />
      </div>
    </section>
  );
};

function JobSection({ title, jobs }: { title: string; jobs: Job[] }) {
  return (
    <div>
      <Card className="border-none bg-transparent text-gray-400 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-sm font-semibold text-blue-600">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li
                className="mb-4 w-full cursor-pointer border border-black8 p-2 text-gray-400 shadow-2xl transition-all duration-100 hover:bg-black8"
                key={index}
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-400">{job.rate}</p>
                <p className="mt-1 text-sm text-gray-400">{job.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default Suggestion;
