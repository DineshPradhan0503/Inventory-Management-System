package com.bluepal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bluepal.config.JwtProvider;
import com.bluepal.dto.AuthResponse;
import com.bluepal.dto.LoginRequest;
import com.bluepal.model.User;
import com.bluepal.repository.UserRepository;
import com.bluepal.service.AuthService;
import com.bluepal.service.CustomUserServiceImplementation;


@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private CustomUserServiceImplementation customUserServiceImplementation;
    //@Autowired
   // private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService authService;

    
    
    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = authService.register(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


