import React from 'react';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recommendation</h2>
      <p className="text-lg text-gray-700">{result}</p>
    </div>
  );
};

export default ResultDisplay;