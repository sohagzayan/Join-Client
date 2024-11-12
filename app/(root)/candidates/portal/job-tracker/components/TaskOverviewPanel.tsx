import { jobs } from '@/utils/data';
import { Briefcase, Calendar, MessageSquare } from 'lucide-react';

const TaskOverviewPanel = () => {
  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="rounded-lg bg-[rgba(255,255,255,0.06)] p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-600 text-white">Upcoming Interviews</h3>
            <Calendar className="text-theme1" size={24} />
          </div>
          <ul className="space-y-3">
            {jobs
              .filter((job) => job.status === 'Interview')
              .map((job) => (
                <li key={job.id} className="flex items-center justify-between">
                  <span className="text-text6">{job.title}</span>
                  <span className="text-sm text-text5">Tomorrow, 2:00 PM</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-lg bg-[rgba(255,255,255,0.06)] p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-600 text-white">Pending Tasks</h3>
            <Briefcase className="text-theme1" size={24} />
          </div>
          <ul className="space-y-3">
            {jobs
              .filter((job) => job.assignments > 0)
              .map((job) => (
                <li key={job.id} className="flex items-center justify-between">
                  <span className="text-text6">{job.title} - Assessment</span>
                  <span className="text-sm text-text5">Due in 3 days</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-lg bg-[rgba(255,255,255,0.06)] p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-600 text-white">Recent Activity</h3>
            <MessageSquare className="text-theme1" size={24} />
          </div>
          <ul className="space-y-3">
            {jobs
              .filter((job) => job.messages.length > 0)
              .map((job) => (
                <li key={job.id} className="flex items-center justify-between">
                  <span className="text-text6">
                    New message from {job.company}
                  </span>
                  <span className="text-sm text-text5">2 hours ago</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewPanel;
