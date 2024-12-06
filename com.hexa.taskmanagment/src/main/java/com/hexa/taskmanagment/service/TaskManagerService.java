package com.hexa.taskmanagment.service;

import java.util.List;

import com.hexa.taskmanagment.dto.TaskManagerDTO;

public interface TaskManagerService {
	
	TaskManagerDTO createTask(TaskManagerDTO tmdto);
	
	List<TaskManagerDTO> getAllTasks();
	
	TaskManagerDTO getTaskById(int TaskId);
	
	TaskManagerDTO updateTask(int TaskId, TaskManagerDTO tmdto);
	
	void deleteTask(int TaskId);

}
