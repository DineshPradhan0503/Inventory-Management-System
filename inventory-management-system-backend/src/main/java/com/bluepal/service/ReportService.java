package com.bluepal.service;

import com.bluepal.dto.ReportResponse;
import com.bluepal.model.Product;
import com.bluepal.model.Sale;
import com.bluepal.repository.ProductRepository;
import com.bluepal.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;

    public ReportService(ProductRepository productRepository, SaleRepository saleRepository) {
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
    }

    // 1. Stock report
    public List<Product> getStockReport() {
        return productRepository.findAll();
    }

    // 2. Daily sales report
    public List<ReportResponse> getDailySalesReport() {
        List<Sale> sales = saleRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return sales.stream()
                .collect(Collectors.groupingBy(
                        sale -> sale.getSaleDate().toLocalDate().format(formatter),
                        Collectors.summingDouble(sale -> sale.getQuantity() * sale.getPrice())
                ))
                .entrySet().stream()
                .map(entry -> new ReportResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // 3. Monthly sales report
    public List<ReportResponse> getMonthlySalesReport() {
        List<Sale> sales = saleRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");

        return sales.stream()
                .collect(Collectors.groupingBy(
                        sale -> sale.getSaleDate().getYear() + "-" + String.format("%02d", sale.getSaleDate().getMonthValue()),
                        Collectors.summingDouble(sale -> sale.getQuantity() * sale.getPrice())
                ))
                .entrySet().stream()
                .map(entry -> new ReportResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // 4. Top-selling products
    public List<Map<String, Object>> getTopProducts() {
        List<Sale> sales = saleRepository.findAll();

        Map<String, Integer> productSales = sales.stream()
                .collect(Collectors.groupingBy(
                        Sale::getProductId,
                        Collectors.summingInt(Sale::getQuantity)
                ));

        return productSales.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .map(entry -> {
                    Optional<Product> product = productRepository.findById(entry.getKey());
                    Map<String, Object> map = new HashMap<>();
                    map.put("productName", product.map(Product::getName).orElse("Unknown"));
                    map.put("totalSold", entry.getValue());
                    return map;
                })
                .limit(5) // Top 5 products
                .collect(Collectors.toList());
    }

    // 5. Get total products
    public Long getTotalProducts() {
        return productRepository.count();
    }

    // 6. Get total stock value
    public Double getTotalStockValue() {
        return productRepository.findAll().stream()
                .mapToDouble(product -> product.getPrice() * product.getStock())
                .sum();
    }

    // 7. Get total sales
    public Double getTotalSales() {
        return saleRepository.findAll().stream()
                .mapToDouble(sale -> sale.getPrice() * sale.getQuantity())
                .sum();
    }
}
