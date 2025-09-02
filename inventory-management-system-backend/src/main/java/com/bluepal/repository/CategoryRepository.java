package com.bluepal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bluepal.model.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {

}
