package com.bluepal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    @NotBlank(message = "Product name is required")
    private String name;
    @NotBlank(message = "Category is required")
    private String category;
    
    private String description;
    
    @PositiveOrZero(message = "Price must be >= 0")
    private double price;
    @Min(value = 0, message = "Stock must be >= 0")
    private int stock;
    @Min(value = 0, message = "Threshold must be >= 0")
    private int threshold; // alert when stock < threshold
}
