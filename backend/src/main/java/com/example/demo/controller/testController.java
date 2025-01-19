package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class testController {
	@GetMapping("/test")
	// Spring Boot の Controller 例
	public ResponseEntity<Map<String, String>> getTestData() {
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "Hello from backend!");
	    return ResponseEntity.ok(response);
	}

}
