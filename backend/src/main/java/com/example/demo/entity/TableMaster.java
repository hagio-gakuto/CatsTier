package com.example.demo.entity;
// Generated 2025/01/31 21:03:17 by Hibernate Tools 6.5.1.Final

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * TableMaster generated by hbm2java
 */
@Entity
public class TableMaster implements java.io.Serializable {
    @Id
    private long id;
    private String categoryType;
    private String name;
    private int deleteFlg;
    private Date createdDate;
    private Date updatedDate;

    public TableMaster() {
    }

    public TableMaster(long id, String categoryType, String name, int deleteFlg, Date createdDate) {
	this.id = id;
	this.categoryType = categoryType;
	this.name = name;
	this.deleteFlg = deleteFlg;
	this.createdDate = createdDate;
    }

    public TableMaster(long id, String categoryType, String name, int deleteFlg, Date createdDate, Date updatedDate) {
	this.id = id;
	this.categoryType = categoryType;
	this.name = name;
	this.deleteFlg = deleteFlg;
	this.createdDate = createdDate;
	this.updatedDate = updatedDate;
    }

    public long getId() {
	return this.id;
    }

    public void setId(long id) {
	this.id = id;
    }

    public String getCategoryType() {
	return this.categoryType;
    }

    public void setCategoryType(String categoryType) {
	this.categoryType = categoryType;
    }

    public String getName() {
	return this.name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public int getDeleteFlg() {
	return this.deleteFlg;
    }

    public void setDeleteFlg(int deleteFlg) {
	this.deleteFlg = deleteFlg;
    }

    public Date getCreatedDate() {
	return this.createdDate;
    }

    public void setCreatedDate(Date createdDate) {
	this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
	return this.updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
	this.updatedDate = updatedDate;
    }

}
