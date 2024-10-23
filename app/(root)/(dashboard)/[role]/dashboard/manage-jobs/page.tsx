'use client';
import { InputField } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  Bell,
  ChevronDown,
  Edit2,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';

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

interface Job {
  title: string;
  salary: string;
  icon: JSX.Element;
}

// Mock data
const initialCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Irene Sacchi',
    role: 'Java Team Lead',
    image: '/educational.png',
    skills: ['Java', 'Developer', '.NET', 'CSS'],
  },
  {
    id: 'candidate-2',
    name: 'John Doe',
    role: 'Frontend Developer',
    image: '/educational.png',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'candidate-3',
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    image: '/educational.png',
    skills: ['Figma', 'Sketch', 'Photoshop', 'CSS'],
  },
  {
    id: 'candidate-4',
    name: 'Michael Brown',
    role: 'Backend Developer',
    image: '/educational.png',
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL'],
  },
  {
    id: 'candidate-5',
    name: 'Lisa Taylor',
    role: 'Product Manager',
    image: '/educational.png',
    skills: ['Agile', 'Scrum', 'Project Management', 'Leadership'],
  },
  {
    id: 'candidate-6',
    name: 'James Wilson',
    role: 'QA Engineer',
    image: '/educational.png',
    skills: ['Testing', 'Cypress', 'Selenium', 'Automation'],
  },
];

const initialColumns: { [key in JobStatus]: Column } = {
  New: {
    id: 'New',
    title: 'New',
    candidateIds: [
      'candidate-1',
      'candidate-2',
      'candidate-3',
      'candidate-4',
      'candidate-5',
      'candidate-6',
    ],
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

const jobs: Job[] = [
  {
    title: 'Manager',
    salary: '2000$',
    icon: <div className="h-6 w-6 rounded-md bg-blue-500" />,
  },
];

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [columns, setColumns] = useState(initialColumns);
  const [selectedJob, setSelectedJob] = useState('Senior Java Developer');

  const [currentCompany, setCurrentCompany] =
    React.useState('TechRecruit Inc.');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [companies, setCompanies] = React.useState([
    'TechRecruit Inc.',
    'Global Staffing Solutions',
    'Talent Finders Ltd.',
  ]);

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Check if the destination is valid
    if (!destination) return;

    const sourceColumn = columns[source.droppableId as JobStatus];
    const destinationColumn = columns[destination.droppableId as JobStatus];

    const sourceItems = Array.from(sourceColumn.candidateIds);
    const destinationItems = Array.from(destinationColumn.candidateIds);

    // Remove item from the source column
    const [removed] = sourceItems.splice(source.index, 1);

    // Move the item to the new column or reorder within the same column
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
    } else {
      destinationItems.splice(destination.index, 0, removed);
    }

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        candidateIds: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        candidateIds: destinationItems,
      },
    });
  };

  const Sidebar = React.memo(() => (
    <div className="flex items-center space-x-5 rounded-lg border-2 border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-1 shadow">
      <div className=" ">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 py-2 font-semibold text-white"
              >
                {currentCompany}
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-16 w-64 border-2 border-[rgba(255,255,255,0.1)] bg-[#181C3B] p-0 text-white">
              <div className="p-2">
                <div className="relative mb-2">
                  <InputField
                    type="search"
                    icon={Search}
                    placeholder="Find company..."
                    // value={searchTerm}
                    // onChange={(e: any) => setSearchTerm(e.target.value)}
                    className="rounded-md border-2 border-[rgba(255,255,255,0.1)] bg-themeDark outline-none"
                  />
                </div>
                <div className="max-h-48 overflow-auto">
                  {filteredCompanies.map((company) => (
                    <Button
                      key={company}
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => {
                        setCurrentCompany(company);
                        setSearchTerm('');
                      }}
                    >
                      {company}
                      {company === currentCompany && (
                        <svg
                          className="text-primary h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" className="mt-2 w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Job
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <span className="rounded border border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] px-2 py-0.5 text-xs text-theme1">
            Free
          </span>
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-transparent bg-theme1 text-white"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ));

  Sidebar.displayName = 'Sidebar';

  return (
    <div className={`min-h-screen`}>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
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
        <div className="grid">
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
                  <div
                    key={column.id}
                    className="flex flex-col rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
                  >
                    <h3 className="mb-2 text-lg font-semibold">
                      {column.title}
                    </h3>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          className="flex-grow space-y-2"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
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
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
