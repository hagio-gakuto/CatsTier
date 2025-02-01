package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Pets;

public interface PetCustomRepository extends JpaRepository<Pets, Long> {
    // categoryName と deleteFlg によって条件を絞り、TableMaster エンティティを返す
    @Query("SELECT p FROM Pets p WHERE p.ownerId = :ownerId AND p.deleteFlg = 0")
    List<Pets> getUserPets(@Param("ownerId") String uid);
}
