'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Bell, Edit2, Menu, Moon, Plus, Sun, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

// Types
type Skill = string;
type JobStatus = 'New' | 'Shortlisted' | 'Interviewed';

interface Candidate {
  id: string;
  name: string;
  role: string;
  image: string;
  skills: Skill[];
}

interface Column {
  id: JobStatus;
  title: string;
  candidateIds: string[];
}

// Mock data
const initialCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Irene Sacchi',
    role: 'Java Team Lead',
    image: '/placeholder.svg?height=40&width=40',
    skills: ['Java', 'Developer', '.NET', 'CSS'],
  },
  {
    id: 'candidate-2',
    name: 'John Doe',
    role: 'Frontend Developer',
    image: '/placeholder.svg?height=40&width=40',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  // Add more candidates as needed
];

const initialColumns: { [key in JobStatus]: Column } = {
  New: {
    id: 'New',
    title: 'New',
    candidateIds: ['candidate-1', 'candidate-2'],
  },
  Shortlisted: {
    id: 'Shortlisted',
    title: 'Shortlisted',
    candidateIds: [],
  },
  Interviewed: {
    id: 'Interviewed',
    title: 'Interviewed',
    candidateIds: [],
  },
};

const jobs: any = [
  {
    title: 'Manager',
    salary: '2000$',
    icon: <div className="h-6 w-6 rounded-md bg-blue-500" />,
  },
  // Other job objects...
];

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [columns, setColumns] = useState(initialColumns);
  const [selectedJob, setSelectedJob] = useState('Senior Java Developer');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = columns[source.droppableId as JobStatus];
    const finish = columns[destination.droppableId as JobStatus];

    if (start === finish) {
      const newCandidateIds = Array.from(start.candidateIds);
      newCandidateIds.splice(source.index, 1);
      newCandidateIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        candidateIds: newCandidateIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const startCandidateIds = Array.from(start.candidateIds);
      startCandidateIds.splice(source.index, 1);
      const newStart = {
        ...start,
        candidateIds: startCandidateIds,
      };

      const finishCandidateIds = Array.from(finish.candidateIds);
      finishCandidateIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        candidateIds: finishCandidateIds,
      };

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      });
    }
  };

  const Sidebar = React.memo(({ className = '' }: { className?: string }) => (
    <div
      className={`rounded-lg bg-white p-4 shadow dark:bg-gray-800 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Jobs</h2>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {jobs.map((job) => (
          <Button
            key={job.title}
            variant="ghost"
            className={`w-full justify-start ${
              selectedJob === job.title ? 'bg-blue-100 dark:bg-blue-900' : ''
            }`}
            onClick={() => setSelectedJob(job.title)}
          >
            <div className="flex items-center">
              {job.icon}
              <div className="ml-2 text-left">
                <div className="font-medium">{job.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {job.salary}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <Button className="mt-4 w-full" variant="outline">
        Manage jobs
      </Button>
    </div>
  ));

  Sidebar.displayName = 'Sidebar';

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job Board</h1>
          <div className="flex items-center space-x-4">
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-blue-600"
            />
            <span>
              {darkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{selectedJob}</h2>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button>
                  <Bell className="mr-2 h-4 w-4" />
                  Invite candidate
                </Button>
              </div>
            </div>
            <div className="mb-4 flex space-x-4">
              <Button variant="default">Kanban board</Button>
              <Button variant="outline">Job info</Button>
            </div>

            {/* Drag and Drop context */}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(columns).map((column) => (
                  <Droppable droppableId={column.id} key={column.id}>
                    {(provided) => (
                      <div
                        className="flex min-h-[200px] flex-col justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <h3 className="mb-2 text-lg font-semibold">
                          {column.title}
                        </h3>
                        <div className="flex-grow space-y-2">
                          {column.candidateIds.map((candidateId, index) => {
                            const candidate = candidates.find(
                              (cand) => cand.id === candidateId,
                            );
                            if (!candidate) return null;
                            return (
                              <Draggable
                                key={candidate.id}
                                draggableId={candidate.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`max-w-full overflow-hidden rounded-lg bg-white p-4 shadow dark:bg-gray-800 ${
                                      snapshot.isDragging ? 'shadow-lg' : ''
                                    }`}
                                  >
                                    <div className="mb-2 flex items-center">
                                      <img
                                        src={candidate.image}
                                        alt={candidate.name}
                                        className="mr-2 h-10 w-10 rounded-full"
                                      />
                                      <div>
                                        <div className="font-medium">
                                          {candidate.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                          {candidate.role}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {candidate.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
