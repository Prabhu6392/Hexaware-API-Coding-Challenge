import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../../services/taskService";
import "../../css/TaskDetail.css";

const TaskDetail = () => {
  const { id: taskId } = useParams(); // Get taskId from URL params
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getTaskById(taskId, token);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-detail-container">
      <h2 className="task-detail-header">Task Details</h2>
      <div className="task-detail-field">
        <span className="task-detail-label">Title</span>
        <div className="task-detail-value">{task.title}</div>
      </div>
      <div className="task-detail-field">
        <span className="task-detail-label">Description</span>
        <div className="task-detail-value">{task.description}</div>
      </div>
      <div className="task-detail-field">
        <span className="task-detail-label">Status</span>
        <div className="task-detail-value">{task.status}</div>
      </div>
      <div className="task-detail-field">
        <span className="task-detail-label">Priority</span>
        <div className="task-detail-value">{task.priority}</div>
      </div>
      <div className="task-detail-field">
        <span className="task-detail-label">Description</span>
        <div className="task-detail-value">{task.due_date}</div>
      </div>
    </div>
  );
};

export default TaskDetail;
