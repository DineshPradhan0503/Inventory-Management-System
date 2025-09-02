package com.bluepal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor   // generates constructor(String period, Double totalSales)
@NoArgsConstructor    // generates default no-arg constructor
public class ReportResponse {
    private String period;
    private Double totalSales;
}
