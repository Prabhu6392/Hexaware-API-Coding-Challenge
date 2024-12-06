package com.hexa.taskmanagment.service;



import com.hexa.taskmanagment.dto.AuthResponse;
import com.hexa.taskmanagment.dto.LoginDTO;
import com.hexa.taskmanagment.dto.SignUpDTO;

public interface AdminService {

	String createUser(SignUpDTO signUpRequest);

	AuthResponse loginUser(LoginDTO loginRequest);

}