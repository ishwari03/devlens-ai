import axios from "axios";
import { getToken } from "../utils/auth";
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000" 
  : "https://devlens-ai-backend-i0tg.onrender.com"; 

const API = axios.create({
    baseURL: API_URL,
});
// Common API function
const sendRequest = async (endpoint, code, language) => {
  const token = getToken();

  const response = await API.post(
    endpoint,
    {
      code,
      language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};
// Review
export const reviewCode = (code, language) =>
  sendRequest("/ai/review", code, language);

// Explain
export const explainCode = (code,language) =>
  sendRequest("/ai/explain", code,language);

// Fix
export const fixCode = (code,language) =>
  sendRequest("/ai/fix", code,language);

// Optimize
export const optimizeCode = (code,language) =>
  sendRequest("/ai/optimize", code,language);

// Find Bugs
export const findBugs = (code,language) =>
  sendRequest("/ai/bugs", code,language);

// Get All Review History
export const getReviews = async () => {
  const token = getToken();

  const response = await API.get("/api/reviews", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// Get Single Review by ID
export const getReviewById = async (id) => {
  const token = getToken();

  const response = await API.get(`/api/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// Delete Review
export const deleteReview = async (id) => {
  const token = getToken();

  const response = await API.delete(`/api/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};