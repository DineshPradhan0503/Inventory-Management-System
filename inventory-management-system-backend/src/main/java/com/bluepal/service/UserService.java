package com.bluepal.service;

import java.util.List;

import com.bluepal.model.User;

public interface UserService {
	
	public User getUserProfile(String jwt);
	public List<User> getAllUser();
}



