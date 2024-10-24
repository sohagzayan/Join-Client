'use client';

import { InputField } from '@/components/common';
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

export default function AssesmentQuestion() {
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
            <div className="flex gap-2">
              <InputField
                inputClassName="w-20"
                className="w-20 rounded"
                placeholder="+880"
              />
              <InputField
                placeholder="1789141408"
                className="flex-grow rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
