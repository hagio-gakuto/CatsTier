package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.TierRanks;

public interface TierRankCustomRepository extends JpaRepository<TierRanks, Long> {

    // categoryName と deleteFlg によって条件を絞り、TableMaster エンティティを返す
    @Query("SELECT t , p FROM TierRanks t JOIN Products p ON t.itemCode = p.itemCode AND p.deleteFlg = 0 "
	    + "WHERE t.petId = :petId AND t.tierCategory = :tierCategory AND t.deleteFlg = 0")
    List<TierRanks> getTier(@Param("petId") int petId, @Param("tierCategory") String tierCategory);
}
