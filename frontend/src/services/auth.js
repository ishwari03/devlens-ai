import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

// Register User
export async function registerUser(userData) {
  const response = await API.post("/register", userData);
  return response.data;
}

// Login User
export async function loginUser(userData) {
  const response = await API.post("/login", userData);
  return response.data;
}