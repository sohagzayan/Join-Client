'use client';

import TextArea from '@/components/common/text-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Book,
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  User,
  Users,
} from 'lucide-react';
import * as React from 'react';

// Mock data
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'HR Manager',
    joinDate: '2022-01-15',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Recruiter',
    joinDate: '2022-03-01',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Interviewer',
    joinDate: '2022-05-20',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

const companyRules = [
  {
    id: 1,
    title: 'Dress Code',
    description: 'Business casual attire is required in the office.',
  },
  {
    id: 2,
    title: 'Work Hours',
    description:
      'Core hours are 10 AM to 4 PM, with flexible start and end times.',
  },
  {
    id: 3,
    title: 'Remote Work',
    description:
      'Employees may work remotely up to 2 days per week with manager approval.',
  },
];

const candidates = [
  {
    id: 1,
    name: 'Alice Brown',
    status: 'Interview Scheduled',
    joinDate: '2023-06-10',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Bob Green',
    status: 'Offer Pending',
    joinDate: '2023-07-05',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Charlie White',
    status: 'In Review',
    joinDate: '2023-08-20',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

const activityFeed = [
  {
    id: 1,
    user: 'John Doe',
    action: 'added a new company rule',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'scheduled an interview with Alice Brown',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: "left a comment on Bob Green's profile",
    timestamp: '1 day ago',
  },
];

export default function TeamCollaboration() {
  const [activeTab, setActiveTab] = React.useState('team-members');
  const [newMember, setNewMember] = React.useState({
    name: '',
    role: '',
    salary: '',
  });
  const [newRule, setNewRule] = React.useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [candidateComment, setCandidateComment] = React.useState('');

  const handleAddMember = () => {
    console.log('Adding new member:', newMember);
    setNewMember({ name: '', role: '', salary: '' });
  };

  const handleAddRule = () => {
    console.log('Adding new rule:', newRule);
    setNewRule({ title: '', description: '' });
  };

  const handleAddComment = (candidateId: number) => {
    console.log(
      'Adding comment for candidate',
      candidateId,
      ':',
      candidateComment,
    );
    setCandidateComment('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">TeamCollab</h2>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab('team-members')}
          >
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab('company-rules')}
          >
            <Book className="mr-2 h-4 w-4" />
            Company Rules
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab('candidate-profiles')}
          >
            <User className="mr-2 h-4 w-4" />
            Candidate Profiles
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab('collaboration-hub')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Collaboration Hub
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {activeTab
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </h1>
          <Button size="icon" variant="outline">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Team Members Section */}
        {activeTab === 'team-members' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team and their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <Badge>
                        {new Date(member.joinDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add New Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team Member</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new team member.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newMember.name}
                          onChange={(e: any) =>
                            setNewMember({ ...newMember, name: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Input
                          id="role"
                          value={newMember.role}
                          onChange={(e: any) =>
                            setNewMember({ ...newMember, role: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="salary" className="text-right">
                          Salary
                        </Label>
                        <Input
                          id="salary"
                          value={newMember.salary}
                          onChange={(e: any) =>
                            setNewMember({
                              ...newMember,
                              salary: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddMember}>Add Member</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Company Rules Section */}
        {activeTab === 'company-rules' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Rules</CardTitle>
                <CardDescription>
                  Manage company policies and guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search rules..."
                    value={searchTerm}
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  {companyRules
                    .filter(
                      (rule) =>
                        rule.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        rule.description
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    )
                    .map((rule) => (
                      <Card key={rule.id}>
                        <CardHeader>
                          <CardTitle>{rule.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{rule.description}</p>
                        </CardContent>
                        <CardFooter className="justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add New Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Company Rule</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new company rule.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={newRule.title}
                          onChange={(e: any) =>
                            setNewRule({ ...newRule, title: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <TextArea
                          id="description"
                          value={newRule.description}
                          onChange={(e: any) =>
                            setNewRule({
                              ...newRule,
                              description: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddRule}>Add Rule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Candidate Profiles Section */}
        {activeTab === 'candidate-profiles' && (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>
                          {candidate.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{candidate.name}</CardTitle>
                        <CardDescription>{candidate.status}</CardDescription>
                      </div>
                    </div>
                    <Badge>
                      {new Date(candidate.joinDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="notes">
                    <TabsList>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                      <TabsTrigger value="actions">Actions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="notes">
                      <TextArea
                        placeholder="Add a note about this candidate..."
                        value={candidateComment}
                        onChange={(e: any) =>
                          setCandidateComment(e.target.value)
                        }
                      />
                      <Button
                        className="mt-2"
                        onClick={() => handleAddComment(candidate.id)}
                      >
                        Add Note
                      </Button>
                    </TabsContent>
                    <TabsContent value="actions">
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Assign Task
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Collaboration Hub Section */}
        {activeTab === 'collaboration-hub' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {activityFeed.map((activity) => (
                    <div key={activity.id} className="mb-4">
                      <p className="font-medium">
                        {activity.user} {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Discussion Board</CardTitle>
              </CardHeader>
              <CardContent>
                <TextArea
                  placeholder="Start a new discussion..."
                  className="mb-4"
                />
                <Button>Post Discussion</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
