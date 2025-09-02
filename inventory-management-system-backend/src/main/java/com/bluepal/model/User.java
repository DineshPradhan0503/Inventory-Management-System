  package com.bluepal.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "about_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	 private String id;
	
	@NotBlank(message = "username is required")
	   private String username;
	
	@NotBlank(message = "password is required")
	   @Size(min = 6, message = "password must be at least 6 characters")
	 private String password;
	@NotBlank(message = "email is required")
	   @Email(message = "enter a valid email")
	 private String email;
	 @NotBlank(message = "role is required")
	 private String role;
//	 private String fullName;

}
