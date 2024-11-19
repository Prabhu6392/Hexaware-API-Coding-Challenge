package com.hexa.taskmanagment.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.taskmanagment.dto.TaskManagerDTO;
import com.hexa.taskmanagment.service.TaskManagerService;


@RestController
@RequestMapping("/api/tasks")
public class TaskManagerContoller {
	
	@Autowired
    TaskManagerService taskService;
	
	
	
	@PostMapping("/createtasks")
    public ResponseEntity<TaskManagerDTO> createTask(@RequestBody TaskManagerDTO taskDTO) {
        return ResponseEntity.ok(taskService.createTask(taskDTO));
    }
	
	
    @GetMapping("/getalltask")
    public ResponseEntity<List<TaskManagerDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/gettaskbyid/{id}")
    public ResponseEntity<TaskManagerDTO> getTaskById(@PathVariable int id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    

    @PutMapping("/updatetaskbyid/{id}")
    public ResponseEntity<TaskManagerDTO> updateTask(@PathVariable int id, @RequestBody TaskManagerDTO taskDTO) {
        return ResponseEntity.ok(taskService.updateTask(id, taskDTO));
    }

    @DeleteMapping("/removetask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
