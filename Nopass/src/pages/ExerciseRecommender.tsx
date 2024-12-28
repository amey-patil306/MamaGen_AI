import React, { useState } from 'react';
import ExerciseForm from '../components/ExerciseForm';
import ResultDisplay from '../components/ResultDisplay';
import { exerciseRecommendation } from '../api/exerciseApi';
import { useAuth } from '../components/AuthContext';

const ExerciseRecommender = () => {
  const [result, setResult] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    try {
      // Add user ID to the data
      const recommendationData = {
        ...data,
        userId: user?._id
      };
      
      const recommendation = await exerciseRecommendation(recommendationData);
      setResult(recommendation);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setResult('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <ExerciseForm onSubmit={handleSubmit} />
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default ExerciseRecommender;