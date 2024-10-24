'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Filter, Mail, RotateCcw, Search, X } from 'lucide-react';
import { useState } from 'react';

type Candidate = {
  id: string;
  name: string;
  jobTitle: string;
  location: string;
  salary: {
    amount: number;
    period: 'hour' | 'week' | 'month' | 'year';
  };
  avatar: string;
  jobPosition: string;
};

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Brooklyn Simmons',
    jobTitle: 'QA Tester',
    location: 'United States',
    salary: { amount: 1200, period: 'month' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Senior QA Engineer',
  },
  {
    id: '2',
    name: 'Courtney Henry',
    jobTitle: 'IT & Networking',
    location: 'United States',
    salary: { amount: 750, period: 'week' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Network Administrator',
  },
  {
    id: '3',
    name: 'Candidate',
    jobTitle: 'Full Services',
    location: 'United States',
    salary: { amount: 25, period: 'hour' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Full Stack Developer',
  },
  // Adding more candidates to demonstrate pagination
  {
    id: '4',
    name: 'Alex Johnson',
    jobTitle: 'Frontend Developer',
    location: 'Canada',
    salary: { amount: 90000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Senior Frontend Developer',
  },
  {
    id: '5',
    name: 'Emma Watson',
    jobTitle: 'UX Designer',
    location: 'United Kingdom',
    salary: { amount: 65000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Lead UX Designer',
  },
  {
    id: '6',
    name: 'Michael Brown',
    jobTitle: 'Backend Developer',
    location: 'Australia',
    salary: { amount: 110000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Senior Backend Developer',
  },
];

export default function CandidateShortlist() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterByJob, setFilterByJob] = useState('All Positions');
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5;

  const jobPositions = [
    'All Positions',
    ...new Set(candidates.map((c) => c.jobPosition)),
  ];

  const resetFilters = () => {
    setSearch('');
    setSortBy('newest');
    setFilterByJob('All Positions');
    setCurrentPage(1);
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      (filterByJob === 'All Positions' ||
        candidate.jobPosition === filterByJob) &&
      (candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        candidate.jobPosition.toLowerCase().includes(search.toLowerCase())),
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'salary-high-to-low')
      return b.salary.amount - a.salary.amount;
    if (sortBy === 'salary-low-to-high')
      return a.salary.amount - b.salary.amount;
    return 0; // 'newest' is default, assuming the array is already sorted by newest
  });

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sortedCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate,
  );

  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const formatSalary = (salary: { amount: number; period: string }) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(salary.amount)}/${salary.period}`;
  };

  const removeCandidate = (id: string) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidate Shortlist</h1>
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All
        </Button>
      </div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search candidates..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={filterByJob} onValueChange={setFilterByJob}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              {jobPositions.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="salary-high-to-low">
                Salary (High to Low)
              </SelectItem>
              <SelectItem value="salary-low-to-high">
                Salary (Low to High)
              </SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Candidates</DialogTitle>
                <DialogDescription>
                  Set additional filters for candidates.
                </DialogDescription>
              </DialogHeader>
              {/* Add more filter options here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-4">
        {currentCandidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{candidate.name}</CardTitle>
                <div className="text-muted-foreground text-sm">
                  {candidate.jobTitle}
                </div>
              </div>
              <Badge variant="secondary">{candidate.jobPosition}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    {candidate.location}
                  </span>
                  <span className="text-sm font-medium">
                    {formatSalary(candidate.salary)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" title="View Profile">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Send Message">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    title="Remove from Shortlist"
                    onClick={() => removeCandidate(candidate.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {sortedCandidates.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-xl font-semibold text-gray-500">
            No candidates found
          </p>
          <p className="text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
      {sortedCandidates.length > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
