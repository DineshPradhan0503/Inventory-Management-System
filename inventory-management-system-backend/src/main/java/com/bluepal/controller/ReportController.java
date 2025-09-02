package com.bluepal.controller;

import com.bluepal.dto.ReportResponse;
import com.bluepal.model.Product;
import com.bluepal.model.Sale;
import com.bluepal.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // 1. Get current stock for all products
    @GetMapping("/stock")
    public List<Product> getStockReport() {
        return reportService.getStockReport();
    }

    // 2. Get daily sales summary
    @GetMapping("/sales/daily")
    public List<ReportResponse> getDailySalesReport() {
        return reportService.getDailySalesReport();
    }

    // 3. Get monthly sales summary
    @GetMapping("/sales/monthly")
    public List<ReportResponse> getMonthlySalesReport() {
        return reportService.getMonthlySalesReport();
    }

    // 4. Get top-selling products
    @GetMapping("/top-products")
    public List<Map<String, Object>> getTopProducts() {
        return reportService.getTopProducts();
    }
}
