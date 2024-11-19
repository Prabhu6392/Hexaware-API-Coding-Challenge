package com.hexa.taskmanagment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.taskmanagment.dto.TaskManagerDTO;
import com.hexa.taskmanagment.entity.TaskManager;
import com.hexa.taskmanagment.exceptions.ResourceNotFoundException;
import com.hexa.taskmanagment.repository.TaskManagerRepo;

@Service
public class TaskManagerServiceImpl implements TaskManagerService{
	
	@Autowired
	TaskManagerRepo taskrepo;
	
	
	
	@Override
	public TaskManagerDTO createTask(TaskManagerDTO tmdto) {
		TaskManager taskmanager = tmdto.mapTOEntity();
		TaskManager savetask = taskrepo.save(taskmanager);
		return savetask.mapToDTO();
	}

	@Override
	public List<TaskManagerDTO> getAllTasks() {
		List l = taskrepo.findAll();
		return l;
		}

	@Override
	public TaskManagerDTO getTaskById(int TaskId) {
		TaskManager task = taskrepo.findById(TaskId).orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + TaskId));
		return task.mapToDTO();
		}

	@Override
	public TaskManagerDTO updateTask(int TaskId, TaskManagerDTO tmdto) {
		TaskManager tm = taskrepo.findById(TaskId).orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + TaskId));
		tm.setTitle(tmdto.getTitle());
	    tm.setDesciption(tmdto.getDesciption());
		return taskrepo.save(tm).mapToDTO();
		}

	@Override
	public void deleteTask(int TaskId) {
		TaskManager tm = taskrepo.findById(TaskId).orElse(null);
		if(tm!=null) {
			taskrepo.deleteById(TaskId);
			return;
			}
		else
			throw new ResourceNotFoundException("Task not found with ID: " + TaskId);
		}
	

	

}
