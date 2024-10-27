'use client';

import TextArea from '@/components/common/text-area';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function AssesmentQuestion() {
  const [phone, setPhone] = useState('');
  const [assessmentQuestions, setAssessmentQuestions] = useState<string[]>([
    '',
  ]);

  const addAssessmentQuestion = () => {
    setAssessmentQuestions([...assessmentQuestions, '']);
  };

  const removeAssessmentQuestion = (index: number) => {
    const newQuestions = assessmentQuestions.filter((_, i) => i !== index);
    setAssessmentQuestions(newQuestions);
  };

  return (
    <div className="container mx-auto my-5">
      <Card>
        <CardHeader>
          <CardTitle>
            Cover letter, availability & assessment question
          </CardTitle>
          <CardDescription>
            Cover letter & availability question will be asked to every
            applicant by default. If you wish, you may ask two more customized
            questions as an assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cover-letter">Cover letter</Label>
              <TextArea
                id="cover-letter"
                placeholder="Why should you be hired for this role?"
                className="mt-1 rounded"
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <TextArea
                id="availability"
                placeholder="Are you available for 1 month, starting immediately, for a full-time work from home internship? If not, what is the time period you are available for and the earliest date you can start this internship on?"
                className="mt-1 rounded"
              />
            </div>
          </div>

          {assessmentQuestions.map((question, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`assessment-${index}`}>
                  Assessment question {index + 1}
                </Label>
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssessmentQuestion(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <TextArea
                className="rounded"
                id={`assessment-${index}`}
                placeholder="Type your question here"
                value={question}
                onChange={(e) => {
                  const newQuestions = [...assessmentQuestions];
                  newQuestions[index] = e.target.value;
                  setAssessmentQuestions(newQuestions);
                }}
              />
              <p className="text-muted-foreground text-sm">
                If you want the applicants to upload a document as a part of the
                assessment question, please ask them to upload it on Dropbox or
                Google Drive and share the link in the answer.
              </p>
            </div>
          ))}

          {assessmentQuestions.length < 2 && (
            <Button variant="outline" onClick={addAssessmentQuestion}>
              + Add assessment question
            </Button>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Alternate mobile number for this listing
            </h3>
            <p className="text-muted-foreground text-sm">
              Our team will call you on this number in case of any query
              regarding this listing only. Primary account number will not be
              updated.
            </p>
            <div className="">
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputProps={{
                  required: true,
                }}
                containerStyle={{
                  width: '100%', // Full width of the container
                  backgroundColor: '#2d3748', // bg-gray-800 equivalent
                  border: '1px solid #4a5568', // border-gray-700 equivalent
                  borderRadius: '4px', // Slight rounded corners for modern look
                }}
                inputStyle={{
                  width: '100%',
                  backgroundColor: '#2d3748', // bg-gray-800
                  color: '#a0aec0', // text-gray-300
                  border: 'none', // Remove default border
                  paddingLeft: '50px', // Space for country code flag
                }}
                buttonStyle={{
                  backgroundColor: '#2d3748', // Match button background with input field
                  border: 'none', // Remove button border
                  borderRight: '1px solid #4a5568', // Add subtle border to the right
                }}
                dropdownStyle={{
                  backgroundColor: '#2d3748', // Match dropdown with dark background
                  color: '#a0aec0', // Text color inside dropdown
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
