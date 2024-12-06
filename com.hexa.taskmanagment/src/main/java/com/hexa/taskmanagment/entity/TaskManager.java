package com.hexa.taskmanagment.entity;

import java.time.LocalDate;

import com.hexa.taskmanagment.dto.TaskManagerDTO;
import com.hexa.taskmanagment.enums.Priority;
import com.hexa.taskmanagment.enums.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaskManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int TaskId;

    String Title;

    String Desciption;

    LocalDate DueDate;

    @Enumerated(EnumType.STRING)
    Priority priority;

    @Enumerated(EnumType.STRING)
    Status status; // Use the correct Status enum

    public TaskManager() {
    }

    public TaskManager(int taskId, String title, String desciption, LocalDate dueDate, Priority priority, Status status) {
        super();
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

    public TaskManagerDTO mapToDTO() {
        TaskManagerDTO dto = new TaskManagerDTO();
        dto.setTaskId(this.getTaskId());
        dto.setTitle(this.getTitle());
        dto.setDesciption(this.getDesciption());
        dto.setDueDate(this.getDueDate());
        dto.setPriority(this.getPriority());
        dto.setStatus(this.getStatus());
        return dto;
    }
}
