package com.example.demo.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.dto.UserReqDto;
import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepo;

    // @Autowired
    public UserService(UserRepository userRepo) {
	this.userRepo = userRepo;
    }

    // uidが登録されているか
    public boolean doLogin(UserReqDto dto) {
	if (!isUid(dto.getUid())) {
	    registerUser(dto);
	    return true;
	} else {
	    return false;
	}

    }


    // DB検索(uid)
    public boolean isUid(String uid) {
	Optional<Users> result = userRepo.findById(uid);
	System.out.println(result);
	return result.isPresent();
    }

    // 新規登録
    public void registerUser(UserReqDto dto) {
	// Dto→Entity
	Users users = new Users();
	users.setUid(dto.getUid());
	users.setPetsNum(0);
	users.setRegisteredDate(LocalDate.now());
	users.setUserName(null);
	users.setCreatedDate(LocalDate.now());
	users.setDeleteFlg(Const.DELETE_FLG_FALSE);
	userRepo.save(users);

    }

}
