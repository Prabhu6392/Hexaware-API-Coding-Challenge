import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

export const register = async (data) => {
  try {
    return await axios.post(`${API_URL}/signup`, data);
  } catch (error) {
    console.error("Registration Error:", error.response || error.message);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, data);
    if (response.status === 200) {
      return response.data; // Assuming response.data contains `jwt`
    }
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message); // Debugging
    throw error;
  }
};
