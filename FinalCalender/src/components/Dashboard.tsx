import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { DailyEntry } from '../types/tracker';
import { predictProductivityTrend, analyzePatterns, getProductivityInsights } from '../ml/modelService';
import { TrendingUp, Activity, Brain, AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  entries: DailyEntry[];
}

export const Dashboard: React.FC<DashboardProps> = ({ entries }) => {
  const [productivityData, setProductivityData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeData = async () => {
      if (entries.length >= 3) {
        try {
          const predictions = await predictProductivityTrend(entries);
          const productivityInsights = await getProductivityInsights(entries);
          
          setProductivityData(predictions);
          setInsights(productivityInsights);
        } catch (error) {
          console.error('Error analyzing data:', error);
        }
      }
      setLoading(false);
    };
    
    analyzeData();
  }, [entries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (entries.length < 3) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-6">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <p className="text-lg text-gray-600 text-center">
          Please add at least 3 daily entries to view analytics and predictions
        </p>
      </div>
    );
  }

  const chartData = {
    labels: productivityData?.map((d: any) => format(d.date, 'MMM d')) || [],
    datasets: [
      {
        label: 'Actual Productivity',
        data: productivityData?.map((d: any) => (d.actual * 100).toFixed(1)) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Predicted Trend',
        data: productivityData?.map((d: any) => (d.predicted * 100).toFixed(1)) || [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  const getProductivityStatus = () => {
    if (!insights?.currentProductivity) return { color: 'gray', text: 'N/A' };
    const value = insights.currentProductivity * 100;
    if (value >= 80) return { color: 'text-green-600', text: 'Excellent' };
    if (value >= 60) return { color: 'text-blue-600', text: 'Good' };
    if (value >= 40) return { color: 'text-yellow-600', text: 'Fair' };
    return { color: 'text-red-600', text: 'Needs Improvement' };
  };

  const status = getProductivityStatus();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Current Productivity</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {insights?.currentProductivity ? 
              `${(insights.currentProductivity * 100).toFixed(1)}%` : 
              'N/A'}
          </p>
          <p className={`mt-2 ${status.color}`}>{status.text}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Productivity Trend</h3>
          </div>
          <p className={`text-3xl font-bold ${insights?.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {insights?.trend ? 
              `${(insights.trend * 100).toFixed(1)}%` : 
              'N/A'}
          </p>
          <p className="mt-2 text-gray-600">
            {insights?.trend >= 0 ? 'Improving' : 'Declining'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold">Average Productivity</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {insights?.averageProductivity ? 
              `${(insights.averageProductivity * 100).toFixed(1)}%` : 
              'N/A'}
          </p>
          <p className="mt-2 text-gray-600">7-day average</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-6">Productivity Trend Analysis</h3>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {insights?.insights.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Insights & Recommendations</h3>
          <ul className="space-y-2">
            {insights.insights.map((insight: string, index: number) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};