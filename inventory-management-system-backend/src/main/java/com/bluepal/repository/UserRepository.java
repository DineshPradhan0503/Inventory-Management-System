package com.bluepal.repository;

import com.bluepal.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
	User findByEmail(String email);
}