import axios from "axios";

// Create an Axios instance with base configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api/tasks",
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor for adding authentication token
API.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    
    // Log request details for debugging
    console.group("📤 Axios Request");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Token Present:", !!token);
    console.groupEnd();

    // If token exists, add to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No authentication token found");
    }

    return config;
  },
  (error) => {
    console.error("🔥 Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.group("🚨 API Response Error");
    if (error.response) {
      // Server responded with an error status
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
    } else {
      // Error in setting up the request
      console.error("Error Message:", error.message);
    }
    console.groupEnd();

    return Promise.reject(error);
  }
);

// Centralized error handling utility
const handleApiError = (error) => {
  let errorMessage = "An unexpected error occurred";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = "Invalid request parameters";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in again.";
        break;
      case 403:
        errorMessage = "You don't have permission to perform this action";
        break;
      case 404:
        errorMessage = "Requested resource not found";
        break;
      case 500:
        errorMessage = "Internal server error";
        break;
      default:
        errorMessage = error.response.data.message || "An error occurred";
    }
  }

  console.error(`🔴 API Error: ${errorMessage}`, error);
  throw new Error(errorMessage);
};

// Task Service Methods
export const getAllTasks = async () => {
  try {
    console.log("🔍 Fetching all tasks...");
    const response = await API.get("/getalltask");
    console.log("✅ Tasks fetched successfully:", response.data);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTaskById = async (taskId) => {
  try {
    console.log(`🔍 Fetching task with ID: ${taskId}`);
    const response = await API.get(`/gettaskbyid/${taskId}`);
    console.log("✅ Task fetched successfully:", response.data);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const createTask = async (taskData) => {
  try {
    const validatedData = {
      title: taskData.title.trim(),
      description: taskData.description || "",
      priority: taskData.priority || "MEDIUM",
      status: taskData.status || "PENDING",
      due_date: taskData.due_date ? new Date(taskData.due_date).toISOString().split("T")[0] : null, // Format date as YYYY-MM-DD
    };

    console.log("➕ Sending task data to API:", validatedData);
    const response = await API.post("/createtasks", validatedData);
    console.log("✅ Task created successfully:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error creating task:", error);
    throw error;
  }
};


export const updateTask = async (taskId, taskData) => {
  try {
    // Validate input
    if (!taskId) {
      throw new Error("Task ID is required for update");
    }

    // Validate and prepare task data
    const validatedData = {
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "MEDIUM",
      status: taskData.status || "PENDING",
      due_date: taskData.due_date || null
    };

    console.log(`🔄 Updating task with ID: ${taskId}`, validatedData);
    const response = await API.put(`/updatetaskbyid/${taskId}`, validatedData);
    console.log("✅ Task updated successfully:", response.data);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    // Validate input
    if (!taskId) {
      throw new Error("Task ID is required for deletion");
    }

    console.log(`❌ Deleting task with ID: ${taskId}`);
    const response = await API.delete(`/removetask/${taskId}`);
    console.log("✅ Task deleted successfully");
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export default API;