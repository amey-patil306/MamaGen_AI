import React from 'react';

interface ExerciseFormProps {
  onSubmit: (data: any) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trimester">
          Trimester
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="trimester"
          name="trimester"
          required
        >
          <option value="">Select Trimester</option>
          <option value="1">First</option>
          <option value="2">Second</option>
          <option value="3">Third</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          name="age"
          type="number"
          placeholder="Your age"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bmi">
          BMI
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bmi"
          name="bmi"
          type="number"
          step="0.1"
          placeholder="Your BMI"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalConditions">
          Medical Conditions
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="medicalConditions"
          name="medicalConditions"
          required
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fitnessLevel">
          Fitness Level
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fitnessLevel"
          name="fitnessLevel"
          required
        >
          <option value="">Select Fitness Level</option>
          <option value="0">Low</option>
          <option value="1">Moderate</option>
          <option value="2">High</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previousPregnancies">
          Previous Pregnancies
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="previousPregnancies"
          name="previousPregnancies"
          type="number"
          placeholder="Number of previous pregnancies"
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Get Recommendation
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;