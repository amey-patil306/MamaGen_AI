import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  entries: any[];
}

export const ProductivityCalendar: React.FC<CalendarProps> = ({ onDateSelect, entries }) => {
  const tileClassName = ({ date }: { date: Date }) => {
    const hasEntry = entries.some(
      entry => entry.date === format(date, 'yyyy-MM-dd')
    );
    return hasEntry ? 'bg-green-200 rounded-full' : '';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Calendar
        onChange={(value) => onDateSelect(value as Date)}
        tileClassName={tileClassName}
        className="rounded-lg border-none"
      />
    </div>
  );
};