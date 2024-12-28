import React from 'react';
import { ClipboardCheck } from 'lucide-react';

// Define the types for the preferences prop
interface BirthPlanPreference {
  id: number;
  title: string;
  selected: string;
}

interface BirthPlanProps {
  preferences: BirthPlanPreference[]; // Expecting an array of preferences
}

const BirthPlan: React.FC<BirthPlanProps> = ({ preferences }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Your Birth Plan</h2>
      </div>
      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.id} className="border-b border-gray-100 pb-3">
            <h3 className="font-medium text-gray-700">{pref.title}</h3>
            <p className="text-gray-600 mt-1">{pref.selected}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
        Update Preferences
      </button>
    </div>
  );
};

export default BirthPlan;
