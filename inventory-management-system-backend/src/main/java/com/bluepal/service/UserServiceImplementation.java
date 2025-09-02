package com.bluepal.service;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bluepal.config.JwtProvider;
import com.bluepal.model.User;
import com.bluepal.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;

	@Override
	public User getUserProfile(String jwt) {
		
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> getAllUser() {
		
		return userRepository.findAll();
				}
}


