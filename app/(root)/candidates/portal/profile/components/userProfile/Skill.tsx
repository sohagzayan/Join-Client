import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Trophy } from 'lucide-react';

import { InputField } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// Define Props for Skill Component
type SkillProps = {
  currentSkill: string;
  setCurrentSkill: (value: string) => void;
  addSkill: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  skills: string[];
  removeSkill: (skill: string) => void;
};

// Skill component
const Skill: React.FC<SkillProps> = ({
  currentSkill,
  setCurrentSkill,
  addSkill,
  skills,
  removeSkill,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        </div>
        <div>
          <Label htmlFor="skills">Add Skills</Label>
          <InputField
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={addSkill}
            placeholder="Type a skill and press Enter (e.g. React, Node.js, Python)"
            className="rounded-lg border border-[#404142] bg-transparent text-[#f5f5f5]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill}
                    <Trash2 className="ml-2 h-3 w-3" />
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skill;
