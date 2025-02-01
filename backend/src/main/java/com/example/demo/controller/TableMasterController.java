package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TableMasterOptionReqDto;
import com.example.demo.dto.TableMasterOptionResDto;
import com.example.demo.service.TableMasterService;

@RestController
@RequestMapping("/api")
public class TableMasterController {

    private final TableMasterService tableMasterService;

    public TableMasterController(TableMasterService tableMasterService) {
        this.tableMasterService = tableMasterService;
    }

    @PostMapping("/options")
    public ResponseEntity<List<TableMasterOptionResDto>> getOptions(@RequestBody TableMasterOptionReqDto dto) {
	List<TableMasterOptionResDto> response = tableMasterService.getOptions(dto);
	return ResponseEntity.ok(response);
    }
}
