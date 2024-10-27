'use client';
import { InputField } from '@/components/common';
import RichTextEditor from '@/components/common/QuillEditor/RichTextEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export default function InternShipForm() {
  const [internshipType, setInternshipType] = useState('in-office');
  const [workType, setWorkType] = useState('full-time');
  const [startDate, setStartDate] = useState('immediate');
  const [stipendType, setStipendType] = useState('fixed');

  const handleEditorChange = (content: string) => {
    console.log('Editor Content:', content);
    // You can send `content` to your backend API or use it as needed here
  };

  return (
    <div className="mt-6 space-y-6 border-none">
      <Card>
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile">Internship profile</Label>
            <InputField
              id="profile"
              placeholder="e.g. Android App Development"
              className="rounded border border-gray-700 text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills required (Optional)</Label>
            <InputField
              id="skills"
              placeholder="e.g. Java"
              className="rounded border border-gray-700 text-gray-300"
            />
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
            <InputField
              id="openings"
              placeholder="e.g. 4"
              className="rounded border border-gray-700 text-gray-300"
            />
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

          <div className="mt-3 space-y-2">
            <div className="w-64">Candidate&apos;s responsibilities</div>
            <RichTextEditor
              onChange={handleEditorChange}
              apiKey="3njyp0uscyk6k6nmj9gmcuy6222j3fh5r69xn307lilkz5y0"
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
            {/* <Input
              placeholder="e.g. 10000"
              className="flex-grow border border-gray-700  text-gray-300 focus:border-none focus:border-gray-700 focus: focus:outline-none"
            /> */}
            <InputField
              placeholder="e.g. 10000"
              className="flex-grow rounded border border-gray-700 py-2 text-gray-300"
            />
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
