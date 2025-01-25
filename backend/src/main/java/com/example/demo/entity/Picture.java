package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pictures")
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // id（BIGSERIAL）

    @Column(nullable = false)
    private Integer category; // category（INT）

    @Column(nullable = false)
    private String specificId; // specific_id（VARCHAR）

    @Column(nullable = false)
    private String name; // name(VARCHAR）

    @Column(name = "delete_flg", nullable = false)
    private Integer deleteFlg = 0; // delete_flg（削除フラグ）

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate = LocalDate.now(); // created_date（作成日）

    @Column(name = "updated_date")
    private LocalDate updatedDate; // updated_date（更新日）

    // Getter と Setter メソッド
    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public Integer getCategory() {
	return category;
    }

    public void setCategory(Integer category) {
	this.category = category;
    }

    public String getSpecificId() {
	return specificId;
    }

    public void setSpecificId(String specificId) {
	this.specificId = specificId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public Integer getDeleteFlg() {
	return deleteFlg;
    }

    public void setDeleteFlg(Integer deleteFlg) {
	this.deleteFlg = deleteFlg;
    }

    public LocalDate getCreatedDate() {
	return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
	this.createdDate = createdDate;
    }

    public LocalDate getUpdatedDate() {
	return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
	this.updatedDate = updatedDate;
    }


}
