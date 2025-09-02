package com.bluepal.repository;

import com.bluepal.model.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SaleRepository extends MongoRepository<Sale, String> {
}
