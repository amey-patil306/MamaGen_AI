import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, LayoutDashboard } from 'lucide-react';
import { ProductivityCalendar } from './components/Calendar';
import { EntryForm } from './components/EntryForm';
import { Dashboard } from './components/Dashboard';
import { getAllEntries } from './db/database';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const loadEntries = async () => {
    const allEntries = await getAllEntries();
    setEntries(allEntries);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
    setShowDashboard(false);
  };

  const handleSave = () => {
    loadEntries();
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Productivity Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowDashboard(!showDashboard);
                  setShowForm(false);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
              </button>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{format(new Date(), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showDashboard ? (
          <Dashboard entries={entries} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ProductivityCalendar
                onDateSelect={handleDateSelect}
                entries={entries}
              />
            </div>
            <div className="md:col-span-2">
              {showForm ? (
                <EntryForm
                  selectedDate={selectedDate}
                  onSave={handleSave}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-white p-8 rounded-lg shadow-md">
                  <p className="text-gray-500 text-lg">
                    Select a date from the calendar to add or edit an entry
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;