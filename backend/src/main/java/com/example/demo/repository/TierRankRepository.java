package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TierRanks;

@Repository
public interface TierRankRepository extends JpaRepository<TierRanks, Long> {

}
