import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks, deleteTask, updateTask } from "../../services/taskService.js";
import "../../css/TaskList.css";

const TaskList = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Modal visibility
  const [selectedTask, setSelectedTask] = useState(null); // Task being edited

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getAllTasks();
        setTasks(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message || "Failed to fetch tasks");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    navigate("/tasks/create");
  };

  const handleViewTaskDetails = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task); // Set the task to be edited
    setEditModalOpen(true); // Open the modal
  };

  const handleEditTaskSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await updateTask(selectedTask.taskId, selectedTask); // API call to update task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.taskId === selectedTask.taskId ? response.data : task))
      );
      alert("Task updated successfully!");
      setEditModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Edit task error:", error);
      alert(`Failed to update task: ${error.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await deleteTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
        alert("Task deleted successfully!");
      } catch (error) {
        console.error("Delete task error:", error);
        alert(`Failed to delete task: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="task-list-container">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="task-list-container error">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <button className="add-task-button" onClick={handleAddTask}>
          + Add New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks found. Click "Add New Task" to get started!</div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.taskId} className="task-item">
              <div className="task-content">
                <span>
                  <b>Task: </b>
                  {task.title}
                </span>
              </div>
              <button onClick={() => handleViewTaskDetails(task.taskId)} className="view-details-btn">
                View Details
              </button>
              <div className="task-actions">
                <button
                  className="edit-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTaskClick(task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.taskId);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for editing task */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <form onSubmit={handleEditTaskSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, description: e.target.value })
                  }
                />
              </label>
              <label>
                Priority:
                <select
                  value={selectedTask.priority}
                  onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </label>
              <label>
                Status:
                <select
                  value={selectedTask.status}
                  onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  value={selectedTask.due_date || ""}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, due_date: e.target.value })
                  }
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
