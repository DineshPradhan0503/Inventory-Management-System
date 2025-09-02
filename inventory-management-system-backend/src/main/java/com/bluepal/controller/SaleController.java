package com.bluepal.controller;

import com.bluepal.model.Sale;
import com.bluepal.service.SaleService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping("/record")
    public Sale recordSale(@Valid @RequestBody Sale sale) {
        return saleService.recordSale(sale);
    }

    @GetMapping("/all")
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }
}
