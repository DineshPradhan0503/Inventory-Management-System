package com.bluepal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sales")
public class Sale {
    @Id
    private String id;
    @NotBlank(message = "productId is required")
    private String productId;
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
 // price will be set in service from Product.price
    private double price; // ✅ unit price at the time of sale
    private LocalDateTime saleDate = LocalDateTime.now();
    private String userId; // who made the sale
}