'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye,
  Filter,
  Mail,
  RotateCcw,
  Search,
  Send,
  Users,
  X,
} from 'lucide-react';
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
  category: string;
  addedDate: Date;
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
    category: 'QA',
    addedDate: new Date(),
  },
  {
    id: '2',
    name: 'Courtney Henry',
    jobTitle: 'IT & Networking',
    location: 'United States',
    salary: { amount: 750, period: 'week' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Network Administrator',
    category: 'IT',
    addedDate: new Date(Date.now() - 86400000), // Yesterday
  },
  {
    id: '3',
    name: 'John Doe',
    jobTitle: 'Full Services',
    location: 'United States',
    salary: { amount: 25, period: 'hour' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Full Stack Developer',
    category: 'Development',
    addedDate: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '4',
    name: 'Alex Johnson',
    jobTitle: 'Frontend Developer',
    location: 'Canada',
    salary: { amount: 90000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Senior Frontend Developer',
    category: 'Development',
    addedDate: new Date(Date.now() + 86400000), // Tomorrow
  },
  {
    id: '5',
    name: 'Emma Watson',
    jobTitle: 'UX Designer',
    location: 'United Kingdom',
    salary: { amount: 65000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Lead UX Designer',
    category: 'Design',
    addedDate: new Date(Date.now() + 172800000), // 2 days from now
  },
  {
    id: '6',
    name: 'Michael Brown',
    jobTitle: 'Backend Developer',
    location: 'Australia',
    salary: { amount: 110000, period: 'year' },
    avatar: '/placeholder.svg?height=40&width=40',
    jobPosition: 'Senior Backend Developer',
    category: 'Development',
    addedDate: new Date(Date.now() - 432000000), // 5 days ago
  },
];

export default function EnhancedProfessionalCandidateShortlist() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterByJob, setFilterByJob] = useState('All Positions');
  const [filterByCategory, setFilterByCategory] = useState<string[]>([]);
  const [filterByTimeGroup, setFilterByTimeGroup] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<
    { name: string; candidates: string[] }[]
  >([]);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const candidatesPerPage = 5;

  const jobPositions = [
    'All Positions',
    ...new Set(candidates.map((c) => c.jobPosition)),
  ];
  const categories = [...new Set(candidates.map((c) => c.category))];

  const resetFilters = () => {
    setSearch('');
    setSortBy('newest');
    setFilterByJob('All Positions');
    setFilterByCategory([]);
    setFilterByTimeGroup('All');
    setCurrentPage(1);
    setSelectedCandidates([]);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const jobFilter =
      filterByJob === 'All Positions' || candidate.jobPosition === filterByJob;

    const categoryFilter =
      filterByCategory.length === 0 ||
      filterByCategory.includes(candidate.category);

    const searchFilter =
      search === '' ||
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      candidate.jobPosition.toLowerCase().includes(search.toLowerCase());

    return jobFilter && categoryFilter && searchFilter;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'salary-high-to-low')
      return b.salary.amount - a.salary.amount;
    if (sortBy === 'salary-low-to-high')
      return a.salary.amount - b.salary.amount;
    return b.addedDate.getTime() - a.addedDate.getTime(); // 'newest' is default
  });

  const getTimeGroup = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1 && diffDays <= 7) return 'Next 7 Days';
    if (diffDays < -1 && diffDays >= -7) return 'Last 7 Days';
    return 'Other';
  };

  const groupedCandidates = sortedCandidates.reduce(
    (acc, candidate) => {
      const group = getTimeGroup(candidate.addedDate);
      if (!acc[group]) acc[group] = [];
      acc[group].push(candidate);
      return acc;
    },
    {} as Record<string, Candidate[]>,
  );

  const filteredGroupedCandidates =
    filterByTimeGroup === 'All'
      ? groupedCandidates
      : { [filterByTimeGroup]: groupedCandidates[filterByTimeGroup] || [] };

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
    setSelectedCandidates(selectedCandidates.filter((cId) => cId !== id));
  };

  const toggleCandidateSelection = (id: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id],
    );
  };

  const createGroup = () => {
    if (groupName && selectedCandidates.length > 0) {
      setGroups([
        ...groups,
        { name: groupName, candidates: selectedCandidates },
      ]);
      setGroupName('');
      setSelectedCandidates([]);
    }
  };

  const sendCampaign = (groupName: string) => {
    const group = groups.find((g) => g.name === groupName);
    if (group) {
      const emails = group.candidates.map((id) => {
        const candidate = candidates.find((c) => c.id === id);
        return candidate ? candidate.name : '';
      });
      alert(`Sending campaign to ${groupName}: ${emails.join(', ')}`);
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-900 p-4 text-gray-100 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Professional Candidate Shortlist</h1>
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All
        </Button>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search candidates..."
            className="border-gray-700 bg-gray-800 pl-10 text-gray-100"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterByJob} onValueChange={setFilterByJob}>
          <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-100">
            <SelectValue placeholder="Filter by Job" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 bg-gray-800">
            {jobPositions.map((job) => (
              <SelectItem key={job} value={job}>
                {job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-100">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 bg-gray-800">
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
        <Select value={filterByTimeGroup} onValueChange={setFilterByTimeGroup}>
          <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-100">
            <SelectValue placeholder="Filter by Time" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 bg-gray-800">
            <SelectItem value="All">All Time</SelectItem>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Tomorrow">Tomorrow</SelectItem>
            <SelectItem value="Yesterday">Yesterday</SelectItem>
            <SelectItem value="Next 7 Days">Next 7 Days</SelectItem>
            <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Category Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Filter by Category</DialogTitle>
              <DialogDescription>
                Select categories to filter candidates.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filterByCategory.includes(category)}
                    onCheckedChange={(checked) => {
                      setFilterByCategory(
                        checked
                          ? [...filterByCategory, category]
                          : filterByCategory.filter((c) => c !== category),
                      );
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e: any) => setGroupName(e.target.value)}
            className="w-48 border-gray-700 bg-gray-800 text-gray-100"
          />
          <Button
            onClick={createGroup}
            disabled={!groupName || selectedCandidates.length === 0}
          >
            Create Group
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAllGroups(!showAllGroups)}
          >
            <Users className="mr-2 h-4 w-4" />
            View All Groups ({groups.length})
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {showAllGroups && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card key={group.name} className="border-gray-700 bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{group.name}</span>
                      <Badge variant="secondary">
                        {group.candidates.length} candidates
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => sendCampaign(group.name)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Campaign
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          alert(`Contacting all candidates in ${group.name}`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Contact All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Tabs defaultValue="All" className="mb-6">
        <TabsList className="bg-gray-800">
          {Object.keys(filteredGroupedCandidates).map((group) => (
            <TabsTrigger key={group} value={group}>
              {group}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(filteredGroupedCandidates).map(
          ([group, groupCandidates]) => (
            <TabsContent key={group} value={group}>
              <AnimatePresence>
                <motion.div className="space-y-4">
                  {groupCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="border-gray-700 bg-gray-800">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <Checkbox
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={() =>
                              toggleCandidateSelection(candidate.id)
                            }
                          />
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={candidate.avatar}
                              alt={candidate.name}
                            />
                            <AvatarFallback>
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle>{candidate.name}</CardTitle>
                            <div className="text-sm text-gray-400">
                              {candidate.jobTitle}
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {candidate.jobPosition}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">
                                {candidate.location}
                              </span>
                              <span className="text-sm font-medium">
                                {formatSalary(candidate.salary)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                title="View Profile"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                title="Send Message"
                              >
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
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ),
        )}
      </Tabs>
      {sortedCandidates.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-xl font-semibold text-gray-400">
            No candidates found
          </p>
          <p className="text-gray-500">
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
                  // disabled={currentPage === 1}
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
                  // disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
