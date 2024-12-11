import { InputField } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const JobPreference = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Job Preferences</h2>
        <div className="space-y-6">
          <div>
            <Label>Salary Expectations (Annual)</Label>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="number"
                placeholder="Minimum"
                className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
              />
              <InputField
                type="number"
                placeholder="Maximum"
                className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
              />
            </div>
          </div>
          <div>
            <Label>Work Type Preference</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span>Remote Only</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Willing to Relocate</span>
                <Switch />
              </div>
            </div>
          </div>
          <div>
            <Label>Notice Period</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="2-months">2 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreference;
