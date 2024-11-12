'use client';
import { SelectDropdown } from '@/components/common';
import { ScrollArea } from '@/components/ui/scroll-area';
import { jobs } from '@/utils/data';
import {
  Briefcase,
  FileText,
  MessageSquare,
  Send,
  XCircle,
} from 'lucide-react';
import { Fragment, useState } from 'react';

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

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Applied', label: 'Applied' },
  { value: 'Screening', label: 'Screening' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Offer', label: 'Offer' },
  { value: 'Rejected', label: 'Rejected' },
];

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

const AppliedJobs = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'messages' | 'assignments' | 'documents'
  >('overview');

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredJobs =
    filterStatus === 'all'
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  const statusColors: Record<string, string> = {
    Applied: 'bg-blue-100 text-blue-800',
    Screening: 'bg-yellow-100 text-yellow-800',
    Interview: 'bg-purple-100 text-purple-800',
    Offer: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  const handleSendMessage = () => {
    if (selectedJob && newMessage.trim()) {
      const updatedJobs = jobs.map((job) => {
        if (job.id === selectedJob.id) {
          return {
            ...job,
            messages: [
              ...job.messages,
              {
                id: job.messages.length + 1,
                sender: 'You',
                content: newMessage,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return job;
      });
      setSelectedJob(
        updatedJobs.find((job) => job.id === selectedJob.id) || null,
      );
      setNewMessage('');
    }
  };

  const renderJobDetails = () => {
    if (!selectedJob) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3 className="mb-2 text-lg font-600 text-white">Job Overview</h3>
            <p className="mb-4 text-text5">
              {selectedJob.company} - {selectedJob.location}
            </p>
            <p className="mb-4 text-text5">{selectedJob.salary}</p>
            <h4 className="mb-2 font-600 text-white">Application Timeline</h4>
            <div className="mb-6 flex items-center space-x-4">
              {['Applied', 'Screening', 'Interview', 'Offer'].map(
                (stage, index) => (
                  <Fragment key={stage}>
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        selectedJob.status === stage
                          ? 'bg-theme1 text-white'
                          : 'text-whie bg-text1'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div
                        className={`h-0.5 flex-grow ${
                          ['Applied', 'Screening', 'Interview'].indexOf(
                            selectedJob.status,
                          ) > index
                            ? 'bg-theme1'
                            : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </Fragment>
                ),
              )}
            </div>
            <h4 className="mb-2 font-600 text-white">Next Steps</h4>
            <ul className="list-inside list-disc text-text5">
              <li>Prepare for technical interview</li>
              <li>Research company culture</li>
              <li>Update portfolio with recent projects</li>
            </ul>
          </div>
        );
      case 'messages':
        return (
          <div>
            <h3 className="mb-4 text-lg font-600 text-white">Messages</h3>
            <div className="mb-4 max-h-64 space-y-4 overflow-y-auto">
              {selectedJob.messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg p-3 ${message.sender === 'You' ? 'ml-8 bg-indigo-100' : 'mr-8 bg-gray-100'}`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-xs text-text5">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow rounded-md border border-text1 bg-[rgba(255,255,255,0.06)] p-2"
              />
              <button
                onClick={handleSendMessage}
                className="rounded-md bg-indigo-500 p-2 text-white hover:bg-indigo-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div>
            <h3 className="mb-4 text-lg font-600 text-white">Assignments</h3>
            <div className="space-y-4">
              {[...Array(selectedJob.assignments)].map((_, index) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">
                      Technical Assessment {index + 1}
                    </span>
                    <span className="text-sm text-gray-500">
                      Due in {3 - index} days
                    </span>
                  </div>
                  <p className="mb-2 text-gray-700">
                    Complete the coding challenge and submit your solution.
                  </p>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-indigo-700">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'documents':
        return (
          <div>
            <h3 className="mb-4 text-lg font-600 text-white">
              Application Documents
            </h3>
            <div className="space-y-4">
              {['Resume', 'Cover Letter', 'Portfolio'].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-themeDark p-4"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 text-indigo-500" />
                    <span className="text-white">{doc}</span>
                  </div>
                  <div>
                    <button className="mr-2 text-theme1 hover:text-indigo-800">
                      View
                    </button>
                    <button className="text-theme1 hover:text-indigo-800">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="my-10">
      <div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-1/3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-600 text-white">Applied Jobs</h2>
              <div className="relative">
                {/* <SelectDropdown
                  options={statusOptions}
                  label="Open to the following roles"
                  showLabel={true}
                /> */}
                <SelectDropdown
                  options={statusOptions}
                  onSelect={(e: any) => setFilterStatus(e?.value)}
                />
              </div>
            </div>
            {/* border border-[rgba(255,255,255,0.14)] */}
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.14)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(30px)',
                      boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
                    }}
                    className={`cursor-pointer rounded-lg border p-4 transition duration-150 ease-in-out ${
                      selectedJob?.id === job.id
                        ? 'ring-2 ring-indigo-500'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <h3 className="text-lg font-600 text-white">{job.title}</h3>
                    <p className="text-text5">{job.company}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`rounded-full bg-theme1 px-2 py-1 text-xs font-medium text-white ${statusColors[job.status]}`}
                      >
                        {job.status}
                      </span>
                      <div className="flex items-center space-x-2">
                        {job.messages.length > 0 && (
                          <span className="flex items-center text-sm text-theme1">
                            <MessageSquare size={16} className="mr-1" />{' '}
                            {job.messages.length}
                          </span>
                        )}
                        {job.assignments > 0 && (
                          <span className="flex items-center text-sm text-theme1">
                            <Briefcase size={16} className="mr-1" />{' '}
                            {job.assignments}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="lg:w-2/3">
            {selectedJob ? (
              <div
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.14)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
                }}
                className="rounded-lg border p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-600 text-white">
                    {selectedJob.title}
                  </h2>
                  <span
                    className={`rounded-full bg-theme1 px-3 py-1 text-sm font-medium text-white ${statusColors[selectedJob.status]}`}
                  >
                    {selectedJob.status}
                  </span>
                </div>
                <div className="mb-6 flex space-x-1 md:space-x-4">
                  <button
                    className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ease-in-out md:text-[16px] ${activeTab === 'overview' ? 'bg-theme1 text-white' : 'text-text6 hover:bg-theme1 hover:text-white'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ease-in-out md:text-[16px] ${activeTab === 'messages' ? 'bg-theme1 text-white' : 'text-text6 hover:bg-theme1 hover:text-white'}`}
                    onClick={() => setActiveTab('messages')}
                  >
                    Messages
                  </button>
                  <button
                    className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ease-in-out md:text-[16px] ${activeTab === 'assignments' ? 'bg-theme1 text-white' : 'text-text6 hover:bg-theme1 hover:text-white'}`}
                    onClick={() => setActiveTab('assignments')}
                  >
                    Assignments
                  </button>
                  <button
                    className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ease-in-out md:text-[16px] ${activeTab === 'documents' ? 'bg-theme1 text-white' : 'text-text6 hover:bg-theme1 hover:text-white'}`}
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </button>
                </div>
                {renderJobDetails()}
              </div>
            ) : (
              <div
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.14)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0px 20px 50px rgba(1, 5, 43, 0.2)',
                }}
                className="rounded-lg border bg-white p-6 text-center"
              >
                <Briefcase size={48} className="mx-auto mb-4 text-theme1" />
                <p className="text-xl text-text5">
                  Select a job to view details
                </p>
              </div>
            )}
          </div>
          <div
            className={`fixed bottom-4 right-4 transition-all duration-300 ${showAIAssistant ? 'w-80' : 'w-12'}`}
          >
            <button
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700"
            >
              {showAIAssistant ? (
                <XCircle size={24} />
              ) : (
                <MessageSquare size={24} />
              )}
            </button>
            {showAIAssistant && (
              <div className="mb-16 rounded-lg bg-white p-4 shadow-xl">
                <h3 className="mb-2 text-lg font-600 text-white">
                  AI Assistant
                </h3>
                <div className="mb-4 h-48 overflow-y-auto rounded bg-gray-50 p-2">
                  <p className="text-sm text-gray-600">
                    Hello! I&#39;m your AI assistant. How can I help you with
                    your job search today?
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    className="flex-grow rounded-l-md border p-2"
                  />
                  <button className="rounded-r-md bg-indigo-500 p-2 text-white hover:bg-indigo-600">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
