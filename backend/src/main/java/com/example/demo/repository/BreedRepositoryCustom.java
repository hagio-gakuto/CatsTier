package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Breeds;

public interface BreedRepositoryCustom extends JpaRepository<Breeds, Long> {


}
