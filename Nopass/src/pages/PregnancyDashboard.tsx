import React, { useState } from 'react';
import { Baby, Calendar, Activity } from 'lucide-react';
import { TrimesterNumber, PregnancyStat, BirthPlanPreference, ChecklistItem, ScheduleData } from './types';
import PregnancyStats from '../components/PregnancyStats';
import BirthPlan from '../components/BirthPlan';
import HospitalChecklist from '../components/HospitalChecklist';
import DailySchedule from '../components/DailySchedule';

const PregnancyDashboard = () => {
  const [currentTrimester, setCurrentTrimester] = useState<TrimesterNumber>(1);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: 'Hospital registration forms', completed: true },
    { id: 2, text: 'Insurance cards and documentation', completed: true },
    { id: 3, text: 'Birth plan copies', completed: false },
    { id: 4, text: 'Comfortable clothing', completed: false },
    { id: 5, text: 'Toiletries', completed: false },
    { id: 6, text: 'Phone charger', completed: false },
    { id: 7, text: 'Camera', completed: false },
    { id: 8, text: 'Newborn clothes', completed: false }
  ]);

  const [newItemText, setNewItemText] = useState<string>(''); // New item text input

  const stats: PregnancyStat[] = [
    { 
      icon: <Baby className="w-6 h-6 text-pink-500" />,
      label: "Current Week",
      value: "Week 24",
      subtext: "Second Trimester"
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      label: "Due Date",
      value: "Aug 15, 2024",
      subtext: "16 weeks remaining"
    },
    {
      icon: <Activity className="w-6 h-6 text-green-500" />,
      label: "Next Appointment",
      value: "Mar 28, 2024",
      subtext: "Dr. Sarah Johnson"
    }
  ];

  const birthPlan: BirthPlanPreference[] = [
    { id: 1, title: 'Pain Management', selected: 'Natural techniques with option for epidural' },
    { id: 2, title: 'Birth Environment', selected: 'Dim lighting, quiet atmosphere' },
    { id: 3, title: 'Labor Position', selected: 'Freedom to move and change positions' },
    { id: 4, title: 'Support Team', selected: 'Partner and doula present' }
  ];

  const schedules: ScheduleData = {
    1: [
      { time: '7:00 AM', activity: 'Morning prenatal vitamins' },
      { time: '8:00 AM', activity: 'Light breakfast' },
      { time: '10:00 AM', activity: 'Gentle walking/exercise' },
      { time: '12:00 PM', activity: 'Healthy lunch & rest' },
      { time: '3:00 PM', activity: 'Pregnancy meditation' },
      { time: '6:00 PM', activity: 'Evening meal' },
      { time: '9:00 PM', activity: 'Bedtime routine' }
    ],
    2: [
      { time: '7:00 AM', activity: 'Prenatal vitamins & breakfast' },
      { time: '9:00 AM', activity: 'Pregnancy yoga' },
      { time: '11:00 AM', activity: 'Healthy snack' },
      { time: '1:00 PM', activity: 'Lunch & short nap' },
      { time: '3:00 PM', activity: 'Birth class or reading' },
      { time: '6:00 PM', activity: 'Dinner & relaxation' },
      { time: '9:30 PM', activity: 'Sleep' }
    ],
    3: [
      { time: '7:30 AM', activity: 'Vitamins & light breakfast' },
      { time: '9:00 AM', activity: 'Gentle stretching' },
      { time: '11:00 AM', activity: 'Hospital bag check' },
      { time: '1:00 PM', activity: 'Lunch & rest' },
      { time: '3:00 PM', activity: 'Breathing exercises' },
      { time: '5:00 PM', activity: 'Short walk' },
      { time: '8:30 PM', activity: 'Early bedtime' }
    ]
  };

  // Handle item toggle (check/uncheck)
  const handleItemToggle = (id: number) => {
    setChecklist((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handle adding a new checklist item
  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      const newItem: ChecklistItem = {
        id: checklist.length + 1, // Generate a new ID
        text: newItemText,
        completed: false, // Initially not completed
      };
      setChecklist([...checklist, newItem]);
      setNewItemText(''); // Clear the input field after adding
    }
  };

  return (
    <div className="space-y-6">
      <PregnancyStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BirthPlan preferences={birthPlan} />
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Checklist Item</h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="border p-2 w-full rounded-md"
                placeholder="Enter new item"
              />
              <button
                onClick={handleAddItem}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Add Item
              </button>
            </div>
          </div>
          <HospitalChecklist items={checklist} onItemToggle={handleItemToggle} />
        </div>
        <DailySchedule
          schedules={schedules}
          currentTrimester={currentTrimester}
          onTrimesterChange={setCurrentTrimester}
        />
      </div>
    </div>
  );
};

export default PregnancyDashboard;
