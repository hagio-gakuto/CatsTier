package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TableMasterOptionResDto;
import com.example.demo.service.TableMasterService;

@RestController
@RequestMapping("/api")
public class TableMasterController {

    private final TableMasterService tableMasterService;

    public TableMasterController(TableMasterService tableMasterService) {
        this.tableMasterService = tableMasterService;
    }

    @GetMapping("/options")
    public ResponseEntity<List<TableMasterOptionResDto>> getOptions(@RequestParam String categoryType) {
	List<TableMasterOptionResDto> response = tableMasterService.getOptions(categoryType);
	return ResponseEntity.ok(response);
    }

    @GetMapping("/tier/category")
    public ResponseEntity<List<String>> getTierCategory() {
	List<String> response = tableMasterService.getTierCategory();
	return ResponseEntity.ok(response);
    }

}
