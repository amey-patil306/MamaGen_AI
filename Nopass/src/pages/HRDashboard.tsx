import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Activity } from 'lucide-react';

const HRDashboard = () => {
  // Sample data - in production, this would come from your API
  const participationData = [
    { month: 'Jan', participants: 45 },
    { month: 'Feb', participants: 52 },
    { month: 'Mar', participants: 58 },
    { month: 'Apr', participants: 65 },
  ];

  const wellnessScores = [
    { week: 'Week 1', score: 7.5 },
    { week: 'Week 2', score: 7.8 },
    { week: 'Week 3', score: 8.2 },
    { week: 'Week 4', score: 8.0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Participants</h3>
            <Users className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-800">65</p>
          <p className="text-sm text-green-600">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Wellness Score</h3>
            <Activity className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-800">8.2</p>
          <p className="text-sm text-green-600">↑ 0.4 from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Resource Usage</h3>
            <TrendingUp className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-800">89%</p>
          <p className="text-sm text-green-600">↑ 5% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Participation</h3>
          <BarChart width={400} height={300} data={participationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participants" fill="#818cf8" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Wellness Trend</h3>
          <LineChart width={400} height={300} data={wellnessScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#818cf8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;