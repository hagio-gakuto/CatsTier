package com.example.demo.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Users;

public interface UserRepositoryCustom extends JpaRepository<Users, String> {

    // user_name と updated_date のみ更新するクエリ
    @Modifying
    @Query("UPDATE Users u SET u.userName = :userName, u.updatedDate = :updatedDate WHERE u.uid = :uid")
    int updateUserName(@Param("uid") String uid, @Param("userName") String userName,
	    @Param("updatedDate") LocalDate updatedDate);
}
