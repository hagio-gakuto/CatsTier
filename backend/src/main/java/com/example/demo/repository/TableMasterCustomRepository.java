package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.TableMaster;


public interface TableMasterCustomRepository extends JpaRepository<TableMaster, Long> {

    // categoryName と deleteFlg によって条件を絞り、TableMaster エンティティを返す
    @Query("SELECT t FROM TableMaster t WHERE t.categoryType = :categoryType AND t.deleteFlg = 0")
    List<TableMaster> getOptions(@Param("categoryType") String categoryType);
}
