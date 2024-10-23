type Skill = string;
type JobStatus = 'Sourced' | 'In_Progress' | 'Interview' | 'Hired';

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
