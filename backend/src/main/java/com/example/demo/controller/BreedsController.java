package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BreedsOptionResDto;
import com.example.demo.service.BreedsService;

@RestController
@RequestMapping("/api")
public class BreedsController {

    private final BreedsService BreedsService;

    public BreedsController(BreedsService BreedsService) {
	this.BreedsService = BreedsService;
    }

    @GetMapping("/breeds/options")
    public ResponseEntity<List<BreedsOptionResDto>> getOptions() {
	List<BreedsOptionResDto> response = BreedsService.getOptions();
	return ResponseEntity.ok(response);
    }
}
