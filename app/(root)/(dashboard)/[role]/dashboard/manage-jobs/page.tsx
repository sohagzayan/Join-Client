'use client';
import { Button } from '@/components/ui/button';
import { initialCandidates } from '@/utils/data';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Bell, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import JobSwitchCreateHandle from './components/JobSwitchCreateHandle';
import { QuickTemplate } from './components/QuickTemplate';

// Types
type Skill = string;
type JobStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Hired'
  | 'Rejected';

interface Column {
  id: JobStatus;
  title: string;
  candidateIds: string[];
}

const initialColumns: { [key in JobStatus]: Column } = {
  Applied: {
    id: 'Applied',
    title: 'Applied',
    candidateIds: [
      'candidate-1',
      'candidate-2',
      'candidate-3',
      'candidate-4',
      'candidate-5',
      'candidate-6',
    ],
  },
  Screening: {
    id: 'Screening',
    title: 'Screening',
    candidateIds: [],
  },
  Interview: {
    id: 'Interview',
    title: 'Interview',
    candidateIds: [],
  },
  Offer: {
    id: 'Offer',
    title: 'Offer',
    candidateIds: [],
  },
  Hired: {
    id: 'Hired',
    title: 'Hired',
    candidateIds: [],
  },
  Rejected: {
    id: 'Rejected',
    title: 'Rejected',
    candidateIds: [],
  },
};

export default function Job_manage() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [columns, setColumns] = useState(initialColumns);
  const [selectedJob, setSelectedJob] = useState('Senior Java Developer');

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

  return (
    <div className={`min-h-screen`}>
      <div className="mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="hidden lg:block">
            <JobSwitchCreateHandle />
          </div>
          <QuickTemplate />
        </div>
        <div className="grid">
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
            className="rounded-lg p-4 text-white shadow lg:col-span-3"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{selectedJob}</h2>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="border border-red text-red transition-all duration-150 ease-in-out hover:bg-red hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="border border-transparent bg-theme1 text-white hover:border-theme1 hover:bg-transparent hover:text-theme1"
                >
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
              <Button
                variant="outline"
                className="border border-theme1 text-theme1 transition-all duration-150 ease-in-out hover:bg-theme1 hover:text-white"
              >
                Job info
              </Button>
            </div>

            {/* Drag and Drop context */}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-6">
                {Object.values(columns).map((column) => (
                  <div
                    key={column.id}
                    className="flex min-h-[150px] flex-col rounded-lg bg-themeDark p-4 dark:bg-gray-700"
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
                                    className={`max-w-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] p-4 ${
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
                                          className="rounded border border-[rgba(0,123,255,0.2)] bg-[rgba(0,123,255,0.1)] px-2 py-1 text-xs text-theme1 dark:bg-gray-700"
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
