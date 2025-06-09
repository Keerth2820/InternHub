import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ skills, setSkills }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ',' || e.key === 'Enter') && inputValue.trim() !== '') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
        <AnimatePresence>
          {skills.map(skill => (
            <motion.div
              key={skill}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 bg-primary-100 dark:bg-primary-500/20 text-primary-800 dark:text-primary-200 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-primary-700 dark:text-primary-200 hover:text-red-500">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill and press Enter"
          className="flex-grow bg-transparent focus:outline-none p-1 text-gray-900 dark:text-gray-100"
        />
      </div>
       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate skills with a comma or press Enter.</p>
    </div>
  );
};

export default SkillsInput;