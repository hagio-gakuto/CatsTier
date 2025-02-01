package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PetReqDto;
import com.example.demo.service.PetService;

@RestController
@RequestMapping("/api")
public class PetsController {

    private final PetService petService;

    public PetsController(PetService petService) {
	this.petService = petService;
    }

    @PostMapping("/pet/save")
    public ResponseEntity<Void> savePet(@RequestBody PetReqDto dto) {
	petService.savePet(dto);
	return ResponseEntity.noContent().build();
    }
}
