package com.bluepal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bluepal.model.User;
import com.bluepal.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt){
		User user=userService.getUserProfile(jwt);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	@GetMapping("/all")
	public ResponseEntity<List<User>> getUsers(@RequestHeader("Authorization") String jwt){
		List<User> users=userService.getAllUser();
		return new ResponseEntity<>(users,HttpStatus.OK);
	}

	}


