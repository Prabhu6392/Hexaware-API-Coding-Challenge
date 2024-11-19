package com.hexa.taskmanagment.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.taskmanagment.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

	public Admin findByEmail(String email);

}
