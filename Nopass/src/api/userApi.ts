import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUserData = async (userId: string) => {
  try {
    const [recommendations, messages, wellnessScores] = await Promise.all([
      axios.get(`${API_URL}/recommendations/${userId}`),
      axios.get(`${API_URL}/messages/${userId}`),
      axios.get(`${API_URL}/wellness-scores/${userId}`)
    ]);

    return {
      recommendations: recommendations.data,
      messages: messages.data,
      wellnessScores: wellnessScores.data
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};