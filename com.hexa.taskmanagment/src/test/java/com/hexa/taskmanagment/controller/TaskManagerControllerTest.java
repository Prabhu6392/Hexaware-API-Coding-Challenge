package com.hexa.taskmanagment.controller;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hexa.taskmanagment.dto.TaskManagerDTO;
import com.hexa.taskmanagment.service.TaskManagerService;

@ExtendWith(MockitoExtension.class)
public class TaskManagerControllerTest {

    @Mock
    private TaskManagerService taskService;

    @InjectMocks
    private TaskManagerContoller taskController;

    private TaskManagerDTO sampleTask;
    private List<TaskManagerDTO> taskList;

    @BeforeEach
    void setUp() {
        sampleTask = new TaskManagerDTO();
        // Set sample task properties here
        sampleTask.setTaskId(1);
        // Set other required properties

        taskList = Arrays.asList(sampleTask);
    }

    @Test
    void createTask_ShouldReturnCreatedTask() {
        // Arrange
        when(taskService.createTask(any(TaskManagerDTO.class))).thenReturn(sampleTask);

        // Act
        ResponseEntity<TaskManagerDTO> response = taskController.createTask(sampleTask);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sampleTask, response.getBody());
        verify(taskService).createTask(any(TaskManagerDTO.class));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        // Arrange
        when(taskService.getAllTasks()).thenReturn(taskList);

        // Act
        ResponseEntity<List<TaskManagerDTO>> response = taskController.getAllTasks();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(taskList, response.getBody());
        assertEquals(1, response.getBody().size());
        verify(taskService).getAllTasks();
    }

    @Test
    void getTaskById_ShouldReturnTask() {
        // Arrange
        int taskId = 1;
        when(taskService.getTaskById(taskId)).thenReturn(sampleTask);

        // Act
        ResponseEntity<TaskManagerDTO> response = taskController.getTaskById(taskId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sampleTask, response.getBody());
        verify(taskService).getTaskById(taskId);
    }

    @Test
    void updateTask_ShouldReturnUpdatedTask() {
        // Arrange
        int taskId = 1;
        when(taskService.updateTask(eq(taskId), any(TaskManagerDTO.class))).thenReturn(sampleTask);

        // Act
        ResponseEntity<TaskManagerDTO> response = taskController.updateTask(taskId, sampleTask);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sampleTask, response.getBody());
        verify(taskService).updateTask(eq(taskId), any(TaskManagerDTO.class));
    }

    @Test
    void deleteTask_ShouldReturnNoContent() {
        // Arrange
        int taskId = 1;
        doNothing().when(taskService).deleteTask(taskId);

        // Act
        ResponseEntity<Void> response = taskController.deleteTask(taskId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(taskService).deleteTask(taskId);
    }
}