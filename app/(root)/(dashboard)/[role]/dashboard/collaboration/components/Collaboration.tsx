'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
} from 'lucide-react';

export default function Collaboration() {
  const teamProjects = [
    {
      name: 'NFT Website',
      progress: 75,
      status: 'In Progress',
      startDate: 'Started: Sat, 10 July',
      members: 4,
    },
    {
      name: 'UI Kit Design',
      progress: 25,
      status: 'In Progress',
      startDate: 'Started: Mon, 05 July',
      members: 2,
    },
    {
      name: 'Crypto App',
      progress: 45,
      status: 'In Progress',
      startDate: 'Started: Fri, 09 July',
      members: 2,
    },
  ];

  const individualProjects = [
    {
      name: 'Dribbble Shot',
      progress: 55,
      status: 'In Progress',
      startDate: 'Started: Sun, 04 July',
    },
    {
      name: 'Dashboard',
      progress: 100,
      status: 'Completed',
      startDate: 'Started: Mon, 05 July',
    },
    {
      name: 'Logo Design',
      progress: 100,
      status: 'Completed',
      startDate: 'Started: Tue, 13 July',
    },
  ];

  const teamMembers = [
    { name: 'John', image: '/placeholder.svg' },
    { name: 'Jane', image: '/placeholder.svg' },
    { name: 'Alice', image: '/placeholder.svg' },
    { name: 'Bob', image: '/placeholder.svg' },
    { name: 'Charlie', image: '/placeholder.svg' },
    { name: 'Diana', image: '/placeholder.svg' },
    { name: 'Eve', image: '/placeholder.svg' },
    { name: 'Frank', image: '/placeholder.svg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            className="py-1 pl-8 pr-4 text-sm"
            placeholder="Search here..."
          />
          <Filter className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Wednesday, 14 July 2021</span>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="font-medium">Amir</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </header>

      <main className="flex gap-8">
        <div className="w-3/4 space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Team Projects</h2>
                <p className="text-sm text-gray-500">
                  12 tasks in progress, 6 tasks completed
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort By:</span>
                <Select defaultValue="priority">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="link" className="text-teal-600">
                  See All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {teamProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-xs text-gray-500">
                          {project.startDate}
                        </p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 rounded px-2 py-1 text-xs">
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-4 h-1.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-1.5 rounded-full bg-teal-600"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(project.members)].map((_, i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-white"
                          >
                            <AvatarImage
                              src="/placeholder.svg"
                              alt="Team member"
                            />
                            <AvatarFallback>TM</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Search className="mr-1 h-3 w-3" /> 12
                        </span>
                        <span className="flex items-center">
                          <Bell className="mr-1 h-3 w-3" /> 8/12
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Individual Projects</h2>
                <p className="text-sm text-gray-500">
                  1 tasks in progress, 5 tasks completed
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort By:</span>
                <Select defaultValue="completion">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completion">Completion</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="link" className="text-teal-600">
                  See All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {individualProjects.map((project, index) => (
                <Card key={index} className={index === 1 ? 'col-span-2' : ''}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-xs text-gray-500">
                          {project.startDate}
                        </p>
                      </div>
                      <span
                        className={`rounded px-2 py-1 text-xs ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-4 h-1.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-1.5 rounded-full bg-teal-600"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Search className="mr-1 h-3 w-3" /> 10
                        </span>
                        <span className="flex items-center">
                          <Bell className="mr-1 h-3 w-3" /> 5/12
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Completed Projects</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-2xl font-bold">6</span>
                  <span className="text-sm text-gray-500">Projects</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Upcoming Projects</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-2xl font-bold">4</span>
                  <span className="text-sm text-gray-500">Projects</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Ongoing Projects</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-2xl font-bold">12</span>
                  <span className="text-sm text-gray-500">Projects</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Total Projects</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-2xl font-bold">22</span>
                  <span className="text-sm text-gray-500">Projects</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex items-center justify-between">
            <Button variant="outline">
              Have trouble in team collaboration?
            </Button>
            <Button
              variant="default"
              className="bg-black text-white hover:bg-gray-800"
            >
              Intro Video
            </Button>
            <img
              src="/placeholder.svg"
              alt="Collaboration illustration"
              className="h-20"
            />
          </section>
        </div>

        <div className="w-1/4 space-y-8">
          <div className="flex space-x-2">
            <Button
              variant="default"
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              New Project
            </Button>
            <Button variant="outline">Team Chat</Button>
          </div>

          <div>
            <div className="mb-2 flex space-x-2">
              <Button
                variant="default"
                className="bg-teal-600 text-white hover:bg-teal-700"
              >
                Team
              </Button>
              <Button variant="ghost">Individual</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((member, index) => (
                <Avatar key={index} className="h-10 w-10">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">4 Members Selected</p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Topic</h3>
            <Button variant="outline" className="w-full justify-between">
              Add Note
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Deadline</h3>
            <div className="mb-2 flex space-x-2">
              {['June', 'July', 'August'].map((month, index) => (
                <Button
                  key={index}
                  variant={index === 1 ? 'default' : 'outline'}
                  className="text-sm"
                >
                  {month}
                </Button>
              ))}
            </div>
            <div className="mb-2 flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[17, 18, 19, 20, 21, 22, 23, 24].map((day) => (
                <Button
                  key={day}
                  variant={day === 22 ? 'default' : 'outline'}
                  className="h-8 w-8 p-0"
                >
                  {day}
                </Button>
              ))}
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="default"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
            >
              Book
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
