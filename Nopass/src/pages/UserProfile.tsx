import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { getUserData } from '../api/userApi';
import { Activity, Calendar, MessageSquare } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    recommendations: [],
    messages: [],
    wellnessScores: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {
        try {
          const data = await getUserData(user._id);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
        </div>
      </div>

      {/* Exercise Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-semibold">Exercise Recommendations</h2>
        </div>
        {userData.recommendations.length > 0 ? (
          <div className="space-y-4">
            {userData.recommendations.map((rec: any, index: number) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                <div className="text-sm text-gray-500">
                  {new Date(rec.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-1">{rec.recommendation}</div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Trimester:</span> {rec.trimester} |
                  <span className="font-medium ml-2">Fitness Level:</span> {rec.fitnessLevel}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recommendations yet</p>
        )}
      </div>

      {/* Messages */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-semibold">Communication History</h2>
        </div>
        {userData.messages.length > 0 ? (
          <div className="space-y-4">
            {userData.messages.map((msg: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
                <div className="mt-1">{msg.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No messages yet</p>
        )}
      </div>

      {/* Wellness Scores */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-semibold">Wellness History</h2>
        </div>
        {userData.wellnessScores.length > 0 ? (
          <div className="space-y-2">
            {userData.wellnessScores.map((score: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>{new Date(score.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">Score: {score.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No wellness scores recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;