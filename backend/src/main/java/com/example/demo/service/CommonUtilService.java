package com.example.demo.service;

import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.entity.Users;
import com.example.demo.exception.GeneralException;
import com.example.demo.repository.UserRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class CommonUtilService {

    private UserRepository userRepo;

    public CommonUtilService(UserRepository userRepo) {
	this.userRepo = userRepo;

    }

    /**
     * UidがDBに登録されいるかどうか確認する。
     * 
     * @param uid
     * @return boolean
     */
    @Transactional
    public boolean isUid(String uid) {

	Optional<Users> result = userRepo.findById(uid);
	return result.isPresent();
    }

    /**
     * Uidを確認し確認できなければ例外をスローする。
     * 
     * @param uid
     * @return boolean
     */
    @Transactional
    public void checkUid(String uid) {

	if (StringUtils.isBlank(uid)) {
	    throw new GeneralException(Const.NOT_UID_MSG);
	}
	Optional<Users> result = userRepo.findById(uid);
	if (!result.isPresent()) {
	    throw new GeneralException(Const.NOT_REGISTER_MSG);
	}
    }

}
