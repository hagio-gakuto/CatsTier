package com.example.demo.service;

import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;

@Service
public class CommonUtilService {

    private UserRepository userRepo;

    // @Autowired
    public CommonUtilService(UserRepository userRepo) {
	this.userRepo = userRepo;

    }

    // DB検索(uid)
    @Transactional
    public boolean isUid(String uid) {
	Optional<Users> result = userRepo.findById(uid);
	return result.isPresent();
    }

}
