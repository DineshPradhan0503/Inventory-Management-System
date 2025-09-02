package com.bluepal.service;

import com.bluepal.model.Product;
import com.bluepal.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(String id, Product productDetails) {
        return productRepository.findById(id).map(p -> {
            p.setName(productDetails.getName());
            p.setCategory(productDetails.getCategory());
            p.setDescription(productDetails.getDescription());
            p.setPrice(productDetails.getPrice());
            p.setStock(productDetails.getStock());
            p.setThreshold(productDetails.getThreshold());
            return productRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
