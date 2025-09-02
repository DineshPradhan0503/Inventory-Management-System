package com.bluepal.service;

import com.bluepal.model.Product;
import com.bluepal.model.Sale;
import com.bluepal.repository.ProductRepository;
import com.bluepal.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleService(SaleRepository saleRepository, ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    public Sale recordSale(Sale sale) {
        Product product = productRepository.findById(sale.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < sale.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        // Reduce stock
        product.setStock(product.getStock() - sale.getQuantity());
        productRepository.save(product);

        sale.setSaleDate(LocalDateTime.now());
        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }
}
