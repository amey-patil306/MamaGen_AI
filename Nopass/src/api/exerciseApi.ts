import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const exerciseRecommendation = async (data: any): Promise<string> => {
  try {
    const messages = [
      { role: "system", content: "You are a pregnancy exercise expert. Provide safe exercise recommendations based on the user's information." },
      { role: "user", content: `Please recommend exercises for a pregnant person with the following details: Trimester: ${data.trimester}, Age: ${data.age}, BMI: ${data.bmi}, Medical Conditions: ${data.medicalConditions ? 'Yes' : 'No'}, Fitness Level: ${data.fitnessLevel}, Previous Pregnancies: ${data.previousPregnancies}` }
    ];

    // First, save the recommendation data
    await axios.post(`${API_URL}/recommendations`, {
      userId: data.userId,
      trimester: parseInt(data.trimester),
      age: parseInt(data.age),
      bmi: parseFloat(data.bmi),
      medicalConditions: data.medicalConditions === "1",
      fitnessLevel: parseInt(data.fitnessLevel),
      previousPregnancies: parseInt(data.previousPregnancies)
    });

    // Then get the AI recommendation
    const response = await axios.post(`${API_URL}/chat`, { 
      messages,
      userId: data.userId
    });
    
    return response.data;
  } catch (error) {
    console.error('Error calling the API service:', error);
    throw new Error('Failed to get recommendation. Please try again.');
  }
};

export const getParticipationData = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/participation`);
    return response.data;
  } catch (error) {
    console.error('Error fetching participation data:', error);
    throw new Error('Failed to fetch participation data');
  }
};

export const getWellnessScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/wellness`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wellness scores:', error);
    throw new Error('Failed to fetch wellness scores');
  }
};

export const sendMessage = async (userId: string, message: string) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, { userId, content: message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};