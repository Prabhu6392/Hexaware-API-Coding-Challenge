import React, { useState, useEffect } from "react";
import { createTask, updateTask, getTaskById } from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import "../../css/TaskForm.css"

const TaskForm = ({ taskId, isEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && taskId) {
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await getTaskById(taskId, token);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setPriority(response.data.priority || "MEDIUM");
          setStatus(response.data.status || "PENDING");
          setDueDate(response.data.due_date ? 
            new Date(response.data.due_date).toISOString().split('T')[0] : 
            ""
          );
        } catch (error) {
          setError("Failed to fetch task details");
        }
      };
      fetchTask();
    }
  }, [isEdit, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const token = localStorage.getItem("token");
    const taskData = { 
      title, 
      description, 
      priority, 
      status, 
      due_date: dueDate ? new Date(dueDate).toISOString() : null 
    };

    try {
      if (isEdit) {
        await updateTask(taskId, taskData, token);
        alert("Task updated successfully!");
        navigate("/tasks");
      } else {
        await createTask(taskData, token);
        alert("Task created successfully!");
        navigate("/tasks");
      }
    } catch (error) {
      setError("Error saving task. Please try again.");
    }
  };

  return (
    <div className="task-page-specific">
    <div className="task-form-container">
      <h2>{isEdit ? "Edit Task" : "Create Task"}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <div className="slider-container">
            <label>
              <input
                type="radio"
                value="LOW"
                checked={priority === "LOW"}
                onChange={() => setPriority("LOW")}
              />
              Low
            </label>
            <label>
              <input
                type="radio"
                value="MEDIUM"
                checked={priority === "MEDIUM"}
                onChange={() => setPriority("MEDIUM")}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                value="HIGH"
                checked={priority === "HIGH"}
                onChange={() => setPriority("HIGH")}
              />
              High
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <div className="slider-container">
            <label>
              <input
                type="radio"
                value="PENDING"
                checked={status === "PENDING"}
                onChange={() => setStatus("PENDING")}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                value="IN_PROGRESS"
                checked={status === "IN_PROGRESS"}
                onChange={() => setStatus("IN_PROGRESS")}
              />
              In Progress
            </label>
            <label>
              <input
                type="radio"
                value="COMPLETED"
                checked={status === "COMPLETED"}
                onChange={() => setStatus("COMPLETED")}
              />
              Completed
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <button 
          className="task-button" 
          type="submit"
        >
          {isEdit ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default TaskForm;