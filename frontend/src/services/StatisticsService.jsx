// src/services/StatisticsService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const getEntrepreneurStats = async (entrepreneurId, token) => {
  try {
    const response = await axios.get(`${API_URL}/entrepreneurs/${entrepreneurId}/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching entrepreneur stats:', error);
    throw error;
  }
};

export default {
  getEntrepreneurStats
};