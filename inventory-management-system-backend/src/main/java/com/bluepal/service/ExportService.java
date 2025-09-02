package com.bluepal.service;

import com.bluepal.model.Product;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExportService {

    public ByteArrayInputStream exportProductsToPdf(List<Product> products) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Product Stock Report"));

        Table table = new Table(5);
        table.addHeaderCell("Name");
        table.addHeaderCell("Category");
        table.addHeaderCell("Price");
        table.addHeaderCell("Stock");
        table.addHeaderCell("Threshold");

        for (Product product : products) {
            table.addCell(product.getName());
            table.addCell(product.getCategory());
            table.addCell(String.valueOf(product.getPrice()));
            table.addCell(String.valueOf(product.getStock()));
            table.addCell(String.valueOf(product.getThreshold()));
        }

        document.add(table);
        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }

    public ByteArrayInputStream exportProductsToExcel(List<Product> products) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Products");

        Row headerRow = sheet.createRow(0);
        String[] headers = {"Name", "Category", "Price", "Stock", "Threshold"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        int rowNum = 1;
        for (Product product : products) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(product.getName());
            row.createCell(1).setCellValue(product.getCategory());
            row.createCell(2).setCellValue(product.getPrice());
            row.createCell(3).setCellValue(product.getStock());
            row.createCell(4).setCellValue(product.getThreshold());
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
