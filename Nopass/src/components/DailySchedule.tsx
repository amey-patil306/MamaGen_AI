import React from 'react';
import { Clock, Calendar } from 'lucide-react';

type ScheduleItem = { time: string; activity: string };
type Schedules = {
  [key in 1 | 2 | 3]: ScheduleItem[]; // Restrict keys to 1, 2, or 3
};

type TrimesterNumber = 1 | 2 | 3; // Define trimester types

interface DailyScheduleProps {
  schedules: Schedules;
  currentTrimester: TrimesterNumber;
  onTrimesterChange: React.Dispatch<React.SetStateAction<TrimesterNumber>>;
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ schedules, currentTrimester, onTrimesterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Daily Schedule</h2>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => onTrimesterChange(num as TrimesterNumber)} // Cast num to TrimesterNumber
              className={`px-4 py-2 rounded-lg ${
                currentTrimester === num
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {num === 1 ? '1st Trimester' : num === 2 ? '2nd Trimester' : '3rd Trimester'}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {schedules[currentTrimester].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Clock className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-600 font-medium w-24">{item.time}</span>
            <span className="text-gray-700">{item.activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySchedule;
