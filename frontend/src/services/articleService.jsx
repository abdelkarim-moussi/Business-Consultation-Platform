import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default function getArticles() {
  try {
    const response = axios.get(`${API_URL}/articles`);

    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
