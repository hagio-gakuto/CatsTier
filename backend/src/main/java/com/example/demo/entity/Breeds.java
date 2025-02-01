package com.example.demo.entity;
// Generated 2025/01/31 21:11:44 by Hibernate Tools 6.5.1.Final

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Breeds generated by hbm2java
 */
@Entity
public class Breeds implements java.io.Serializable {
    @Id
    private long id;
    private int speacies;
    private String breed;
    private String description;
    private int deleteFlg;
    private Date createdDate;
    private Date updatedDate;

    public Breeds() {
    }

    public Breeds(long id, int speacies, String breed, String description, int deleteFlg, Date createdDate) {
	this.id = id;
	this.speacies = speacies;
	this.breed = breed;
	this.description = description;
	this.deleteFlg = deleteFlg;
	this.createdDate = createdDate;
    }

    public Breeds(long id, int speacies, String breed, String description, int deleteFlg, Date createdDate,
	    Date updatedDate) {
	this.id = id;
	this.speacies = speacies;
	this.breed = breed;
	this.description = description;
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

    public int getSpeacies() {
	return this.speacies;
    }

    public void setSpeacies(int speacies) {
	this.speacies = speacies;
    }

    public String getBreed() {
	return this.breed;
    }

    public void setBreed(String breed) {
	this.breed = breed;
    }

    public String getDescription() {
	return this.description;
    }

    public void setDescription(String description) {
	this.description = description;
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
