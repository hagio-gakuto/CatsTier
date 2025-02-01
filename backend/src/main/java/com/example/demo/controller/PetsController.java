package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PetReqDto;
import com.example.demo.dto.UserPetsResDto;
import com.example.demo.dto.UserReqDto;
import com.example.demo.service.PetService;

@RestController
@RequestMapping("/api/pet")
public class PetsController {

    private final PetService petService;

    public PetsController(PetService petService) {
	this.petService = petService;
    }

    @PostMapping("/save")
    public ResponseEntity<Void> savePet(@RequestBody PetReqDto dto) {
	petService.savePet(dto);
	return ResponseEntity.noContent().build();
    }

//  uidをもとにペットリストを獲得
    @PostMapping("/user")
    public ResponseEntity<List<UserPetsResDto>> getUserPets(@RequestBody UserReqDto dto) {
	List<UserPetsResDto> res = petService.getUserPets(dto.getUid());
	return ResponseEntity.ok(res);
    }

}
