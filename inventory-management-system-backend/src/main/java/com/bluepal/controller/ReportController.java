package com.bluepal.controller;

import com.bluepal.dto.ReportResponse;
import com.bluepal.model.Product;
import com.bluepal.model.Sale;
import com.bluepal.service.ExportService;
import com.bluepal.service.ReportService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;
    private final ExportService exportService;

    public ReportController(ReportService reportService, ExportService exportService) {
        this.reportService = reportService;
        this.exportService = exportService;
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

    // 5. Get total products
    @GetMapping("/kpi/total-products")
    public Long getTotalProducts() {
        return reportService.getTotalProducts();
    }

    // 6. Get total stock value
    @GetMapping("/kpi/total-stock-value")
    public Double getTotalStockValue() {
        return reportService.getTotalStockValue();
    }

    // 7. Get total sales
    @GetMapping("/kpi/total-sales")
    public Double getTotalSales() {
        return reportService.getTotalSales();
    }

    // 8. Export stock report to PDF
    @GetMapping("/stock/export/pdf")
    public ResponseEntity<InputStreamResource> exportStockPdf() throws IOException {
        List<Product> products = reportService.getStockReport();
        ByteArrayInputStream bis = exportService.exportProductsToPdf(products);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=stock-report.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    // 9. Export stock report to Excel
    @GetMapping("/stock/export/excel")
    public ResponseEntity<InputStreamResource> exportStockExcel() throws IOException {
        List<Product> products = reportService.getStockReport();
        ByteArrayInputStream bis = exportService.exportProductsToExcel(products);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=stock-report.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(bis));
    }
}
