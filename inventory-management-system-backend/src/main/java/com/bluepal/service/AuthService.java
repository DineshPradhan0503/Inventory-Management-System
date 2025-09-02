package com.bluepal.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bluepal.config.JwtProvider;
import com.bluepal.dto.AuthResponse;
import com.bluepal.dto.LoginRequest;
import com.bluepal.exception.EmailAlreadyExistsException;
import com.bluepal.model.User;
import com.bluepal.repository.UserRepository;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    public User register(User user) {
    	
    	User existingUser = userRepository.findByEmail(user.getEmail());
    	
    	if (existingUser != null) {
    	    throw new EmailAlreadyExistsException("Email is already used with another account");
    	}


        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        String token = jwtProvider.generateToken(authentication);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Success");
        authResponse.setStatus(true);
     

        return authResponse;
    }
}

