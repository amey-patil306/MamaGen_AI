import React from 'react';
import { CheckSquare } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onItemToggle: (id: number) => void; // Callback to handle item toggling
}

const HospitalChecklist: React.FC<ChecklistProps> = ({ items, onItemToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="w-6 h-6 text-teal-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Hospital Bag Checklist</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={item.completed}
              className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              onChange={() => onItemToggle(item.id)} // Trigger the callback on change
            />
            <span
              className={`${
                item.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalChecklist;
