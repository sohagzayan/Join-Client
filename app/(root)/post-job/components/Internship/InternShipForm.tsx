'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function InternShipForm() {
  const [internshipType, setInternshipType] = useState('in-office');
  const [workType, setWorkType] = useState('full-time');
  const [startDate, setStartDate] = useState('immediate');
  const [stipendType, setStipendType] = useState('fixed');

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile">Internship profile</Label>
            <Input id="profile" placeholder="e.g. Android App Development" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills required (Optional)</Label>
            <Input id="skills" placeholder="e.g. Java" />
          </div>

          <div className="space-y-2">
            <Label>Internship type</Label>
            <RadioGroup
              value={internshipType}
              onValueChange={setInternshipType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-office" id="in-office" />
                <Label htmlFor="in-office">In office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Part-time/Full-time</Label>
            <RadioGroup
              value={workType}
              onValueChange={setWorkType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="openings">Number of openings</Label>
            <Input id="openings" placeholder="e.g. 4" />
          </div>

          <div className="space-y-2">
            <Label>Internship start date</Label>
            <RadioGroup
              value={startDate}
              onValueChange={setStartDate}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate">
                  Immediately (within next 30 days)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="later" id="later" />
                <Label htmlFor="later">Later</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Internship duration</Label>
            <p className="text-muted-foreground text-sm">
              Shorter the duration, more the applications
            </p>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">months</SelectItem>
                  <SelectItem value="years">years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">
              Intern&apos;s responsibilities
            </Label>
            <Textarea
              id="responsibilities"
              placeholder="Selected intern's day-to-day responsibilities include:"
              className="h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">
              Additional candidate preferences:
            </Label>
            <Textarea
              id="preferences"
              placeholder="e.g. Candidates pursuing Computer Science Engineering Preferred"
              className="h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="women-applications" />
            <Label htmlFor="women-applications">
              Allow applications from women also who are willing to
              start/restart their career.{' '}
              <span className="text-blue-500">Know more</span>
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stipend & perks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Stipend</Label>
            <RadioGroup
              value={stipendType}
              onValueChange={setStipendType}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negotiable" id="negotiable" />
                <Label htmlFor="negotiable">Negotiable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="performance" id="performance" />
                <Label htmlFor="performance">Performance based</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unpaid" id="unpaid" />
                <Label htmlFor="unpaid">Unpaid</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex space-x-2">
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="e.g. $" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">$</SelectItem>
                <SelectItem value="eur">€</SelectItem>
                <SelectItem value="gbp">£</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="e.g. 10000" className="flex-grow" />
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="/month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">/month</SelectItem>
                <SelectItem value="week">/week</SelectItem>
                <SelectItem value="day">/day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Perks (Optional)</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="certificate" />
                <Label htmlFor="certificate">Certificate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="letter" />
                <Label htmlFor="letter">Letter of recommendation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="flexible" />
                <Label htmlFor="flexible">Flexible work hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="5days" />
                <Label htmlFor="5days">5 days a week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="informal" />
                <Label htmlFor="informal">Informal dress code</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="snacks" />
                <Label htmlFor="snacks">Free snacks & beverages</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
