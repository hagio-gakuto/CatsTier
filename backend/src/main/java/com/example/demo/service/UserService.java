package com.example.demo.service;

import java.time.LocalDate;
import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.dto.UserReqDto;
import com.example.demo.entity.Users;
import com.example.demo.exception.GeneralException;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserRepositoryCustom;

@Service
public class UserService {

    private UserRepository userRepo;

    private UserRepositoryCustom userRepoCustom;

    private PictureService pictureService;

    // @Autowired
    public UserService(UserRepository userRepo, UserRepositoryCustom userRepoCustom, PictureService pictureService) {
	this.userRepo = userRepo;
	this.userRepoCustom = userRepoCustom;
	this.pictureService = pictureService;
    }

    // uidが登録されているか
    @Transactional
    public boolean doLogin(UserReqDto dto) {
	if (!isUid(dto.getUid())) {
	    registerUser(dto);
	    return true;
	} else {
	    return false;
	}

    }

    // DB検索(uid)
    @Transactional
    public boolean isUid(String uid) {
	Optional<Users> result = userRepo.findById(uid);
	System.out.println(result);
	return result.isPresent();
    }

    // 新規登録
    @Transactional
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

    // ユーザーネームとアイコン設定
    @Transactional
    public void registerIconAndUserName(UserReqDto dto) {
	if (!isUid(dto.getUid())) {
	    throw new GeneralException("エラー");
	}
	System.out.println(dto.getUserName());

	// ユーザーネームを更新
	int updatedCount = userRepoCustom.updateUserName(dto.getUid(), dto.getUserName(), LocalDate.now());
	// 写真サービスでアイコン処理
	pictureService.registerIcon(Const.PICTURE_CATEGORY_USER, dto.getUid(), dto.getIcon());

    }

}
