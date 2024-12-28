import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DailyEntry, OPTIONS } from '../types/tracker';
import { saveEntry, getEntry } from '../db/database';

interface EntryFormProps {
  selectedDate: Date;
  onSave: () => void;
}

export const EntryForm: React.FC<EntryFormProps> = ({ selectedDate, onSave }) => {
  const [entry, setEntry] = useState<DailyEntry>({
    date: format(selectedDate, 'yyyy-MM-dd'),
    moodLevel: '',
    motivationLevel: '',
    stressLevel: '',
    taskClarity: '',
    taskComplexity: '',
    deadlinePressure: '',
    concentrationLevel: '',
    breakFrequency: '',
    taskCompletionEfficiency: '',
    progressSatisfaction: '',
    goalAlignmentPerception: '',
    sittingHours: '',
    physicalDiscomfort: '',
    meetingDuration: '',
    meetingFrequency: ''
  });

  useEffect(() => {
    const loadEntry = async () => {
      const existingEntry = await getEntry(format(selectedDate, 'yyyy-MM-dd'));
      if (existingEntry) {
        setEntry(existingEntry);
      }
    };
    loadEntry();
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveEntry(entry);
    onSave();
  };

  const handleChange = (field: keyof DailyEntry) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntry(prev => ({ ...prev, [field]: e.target.value }));
  };

  const renderSelect = (field: keyof typeof OPTIONS, label: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="w-full p-2 border rounded-md"
        value={entry[field as keyof DailyEntry]}
        onChange={handleChange(field as keyof DailyEntry)}
        required
      >
        <option value="">Select {label}</option>
        {OPTIONS[field].map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Entry for {format(selectedDate, 'MMMM d, yyyy')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Emotional and Mental State</h3>
          {renderSelect('moodLevels', 'Mood Level')}
          {renderSelect('motivationLevels', 'Motivation Level')}
          {renderSelect('stressLevels', 'Stress Level')}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Task and Workload Insights</h3>
          {renderSelect('taskClarity', 'Task Clarity')}
          {renderSelect('taskComplexity', 'Task Complexity')}
          {renderSelect('deadlinePressure', 'Deadline Pressure')}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Focus and Productivity</h3>
          {renderSelect('concentrationLevel', 'Concentration Level')}
          {renderSelect('breakFrequency', 'Break Frequency')}
          {renderSelect('taskCompletionEfficiency', 'Task Completion Efficiency')}
          {renderSelect('progressSatisfaction', 'Progress Satisfaction')}
          {renderSelect('goalAlignmentPerception', 'Goal Alignment')}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Physical and Environmental Well-being</h3>
          {renderSelect('sittingHours', 'Sitting Hours')}
          {renderSelect('physicalDiscomfort', 'Physical Discomfort')}
          {renderSelect('meetingDuration', 'Meeting Duration')}
          {renderSelect('meetingFrequency', 'Meeting Frequency')}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Entry
      </button>
    </form>
  );
};