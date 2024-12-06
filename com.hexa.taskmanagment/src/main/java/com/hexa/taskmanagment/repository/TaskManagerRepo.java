package com.hexa.taskmanagment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexa.taskmanagment.entity.TaskManager;

@Repository
public interface TaskManagerRepo extends JpaRepository<TaskManager, Integer>{

}
