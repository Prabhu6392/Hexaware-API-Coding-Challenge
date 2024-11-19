package com.hexa.taskmanagment.dto;

import java.time.LocalDate;

import com.hexa.taskmanagment.entity.TaskManager;
import com.hexa.taskmanagment.enums.Priority;
import com.hexa.taskmanagment.enums.Status;


public class TaskManagerDTO {
	
	int TaskId;
	String Title;
	String Desciption;
	LocalDate DueDate;
	Priority priority;
	Status status;
	
	public TaskManagerDTO(){
		
	}
	
	public TaskManagerDTO(int taskId, String title, String desciption, LocalDate dueDate, Priority priority,Status status) {
		this.TaskId = taskId;
		this.Title = title;
		this.Desciption = desciption;
		this.DueDate = dueDate;
		this.priority = priority;
		this.status = status;
	}
	
	public int getTaskId() {
		return TaskId;
	}


	public void setTaskId(int taskId) {
		TaskId = taskId;
	}


	public String getTitle() {
		return Title;
	}


	public void setTitle(String title) {
		Title = title;
	}


	public String getDesciption() {
		return Desciption;
	}


	public void setDesciption(String desciption) {
		Desciption = desciption;
	}


	public LocalDate getDueDate() {
		return DueDate;
	}


	public void setDueDate(LocalDate dueDate) {
		DueDate = dueDate;
	}


	public Priority getPriority() {
		return priority;
	}


	public void setPriority(Priority priority) {
		this.priority = priority;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		this.status = status;
	}
	
	
	public TaskManager mapTOEntity() {
		TaskManager tm = new TaskManager();
		tm.setTaskId(this.getTaskId());
		tm.setTitle(this.getTitle());
		tm.setDesciption(this.getDesciption());
		tm.setDueDate(this.getDueDate());
		tm.setPriority(this.getPriority());
		tm.setStatus(this.getStatus());
		return tm;
	}
}
