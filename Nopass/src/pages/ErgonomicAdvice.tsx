import React, { useState, useEffect } from 'react';
import { Monitor, Chair, Smartphone, CheckCircle } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const ErgonomicAdvice = () => {
  const [workSetup, setWorkSetup] = useState({
    deviceType: 'desktop',
    hasExternalMonitor: false,
    hasErgonomicChair: false
  });
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    generateRecommendations();
  }, [workSetup]);

  const generateRecommendations = () => {
    const advice = [];
    
    // Basic posture recommendations
    advice.push("Keep your head level and in line with your torso");
    advice.push("Position your shoulders relaxed and upper arms hanging naturally");
    advice.push("Keep your lower back supported");
    
    // Device-specific recommendations
    if (workSetup.deviceType === 'desktop') {
      advice.push("Position your monitor at arm's length");
      advice.push("Top of screen should be at or slightly below eye level");
      if (workSetup.hasExternalMonitor) {
        advice.push("Align external monitor with your natural line of sight");
      }
    } else if (workSetup.deviceType === 'laptop') {
      advice.push("Consider using a laptop stand to raise the screen");
      advice.push("Use an external keyboard and mouse when possible");
    } else {
      advice.push("Hold mobile devices at eye level to reduce neck strain");
      advice.push("Take frequent breaks from mobile device use");
    }

    // Chair recommendations
    if (!workSetup.hasErgonomicChair) {
      advice.push("Consider investing in an ergonomic chair with proper lumbar support");
      advice.push("Use a cushion for additional lower back support if needed");
    }

    setRecommendations(advice);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Ergonomic Workspace Setup</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Your Work Setup</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Device Type
              </label>
              <div className="flex space-x-4">
                {['desktop', 'laptop', 'mobile'].map(device => (
                  <button
                    key={device}
                    onClick={() => setWorkSetup(prev => ({ ...prev, deviceType: device }))}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      workSetup.deviceType === device
                        ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    } border`}
                  >
                    {device === 'desktop' && <Monitor className="w-4 h-4 mr-2" />}
                    {device === 'laptop' && <Monitor className="w-4 h-4 mr-2" />}
                    {device === 'mobile' && <Smartphone className="w-4 h-4 mr-2" />}
                    {device.charAt(0).toUpperCase() + device.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={workSetup.hasExternalMonitor}
                  onChange={(e) => setWorkSetup(prev => ({ ...prev, hasExternalMonitor: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">External Monitor</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={workSetup.hasErgonomicChair}
                  onChange={(e) => setWorkSetup(prev => ({ ...prev, hasErgonomicChair: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Ergonomic Chair</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Personalized Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Quick Exercise Breaks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Neck Stretches",
              description: "Gently tilt your head towards each shoulder, holding for 10 seconds"
            },
            {
              title: "Shoulder Rolls",
              description: "Roll your shoulders backwards and forwards in a circular motion"
            },
            {
              title: "Wrist Exercises",
              description: "Flex and extend your wrists, making circular motions"
            },
            {
              title: "Eye Rest",
              description: "Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds"
            }
          ].map((exercise, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-600 mb-2">{exercise.title}</h4>
              <p className="text-sm text-gray-600">{exercise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErgonomicAdvice;