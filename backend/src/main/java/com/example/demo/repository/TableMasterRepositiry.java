package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TableMaster;


@Repository
public interface TableMasterRepositiry extends JpaRepository<TableMaster, Long> {

}
