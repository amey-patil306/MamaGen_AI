import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useDatabase = () => {
  // User Operations
  const createUser = async (email: string, name?: string) => {
    const response = await axios.post(`${API_URL}/users`, { email, name });
    return response.data;
  };

  // Recommendation Operations
  const saveRecommendation = async (userId: string, data: any) => {
    const response = await axios.post(`${API_URL}/recommendations`, {
      userId,
      ...data
    });
    return response.data;
  };

  const getRecommendations = async (userId: string) => {
    const response = await axios.get(`${API_URL}/recommendations/${userId}`);
    return response.data;
  };

  // Message Operations
  const saveMessage = async (userId: string, content: string) => {
    const response = await axios.post(`${API_URL}/messages`, { userId, content });
    return response.data;
  };

  const getMessages = async (userId: string) => {
    const response = await axios.get(`${API_URL}/messages/${userId}`);
    return response.data;
  };

  // Wellness Score Operations
  const saveWellnessScore = async (userId: string, score: number) => {
    const response = await axios.post(`${API_URL}/wellness-scores`, { userId, score });
    return response.data;
  };

  const getWellnessScores = async (userId: string) => {
    const response = await axios.get(`${API_URL}/wellness-scores/${userId}`);
    return response.data;
  };

  // Resource Operations
  const getResources = async () => {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data;
  };

  return {
    createUser,
    saveRecommendation,
    getRecommendations,
    saveMessage,
    getMessages,
    saveWellnessScore,
    getWellnessScores,
    getResources
  };
};