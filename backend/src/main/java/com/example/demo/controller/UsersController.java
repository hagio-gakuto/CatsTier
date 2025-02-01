package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserReqDto;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> doLogin(@RequestBody UserReqDto dto) {

	boolean isNewUser = userService.doLogin(dto);
	return ResponseEntity.ok(isNewUser);
    }

    @PostMapping("/registerIConAndUserName")
    public ResponseEntity<Void> registerIConAndUserName(@RequestBody UserReqDto dto) {

	userService.registerIconAndUserName(dto);
	return ResponseEntity.noContent().build();
    }

}