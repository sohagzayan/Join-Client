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

const DemoGraph = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Demographics</h2>
        <div className="space-y-6">
          <div>
            <Label>Pronouns</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="he/him">he/him</SelectItem>
                <SelectItem value="she/her">she/her</SelectItem>
                <SelectItem value="they/them">they/them</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span>Display demographics on profile</span>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoGraph;
