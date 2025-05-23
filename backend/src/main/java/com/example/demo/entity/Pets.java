package com.example.demo.entity;
// Generated 2025/02/01 10:42:06 by Hibernate Tools 6.5.1.Final

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Pets generated by hbm2java
 */
@Entity
public class Pets implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String ownerId;
    private String name;
    private int species;
    private Date birthday;
    private int breed;
    private Integer sex;
    private Integer breedingPlace;
    private Integer contraception;
    private BigDecimal weight;
    private Integer activeLevel;
    private int deleteFlg;
    private LocalDate createdDate;
    private LocalDate updatedDate;

    public Pets() {
    }

    public Pets(long id, String ownerId, String name, int species, int breed, int deleteFlg, LocalDate createdDate) {
	this.id = id;
	this.ownerId = ownerId;
	this.name = name;
	this.species = species;
	this.breed = breed;
	this.deleteFlg = deleteFlg;
	this.createdDate = createdDate;
    }

    public Pets(long id, String ownerId, String name, int species, int breed, Integer sex, Integer breedingPlace,
	    Integer contraception, BigDecimal weight, Integer activeLevel, int deleteFlg, LocalDate createdDate,
	    LocalDate updatedDate) {
	this.id = id;
	this.ownerId = ownerId;
	this.name = name;
	this.species = species;
	this.breed = breed;
	this.sex = sex;
	this.breedingPlace = breedingPlace;
	this.contraception = contraception;
	this.weight = weight;
	this.activeLevel = activeLevel;
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

    public String getOwnerId() {
	return this.ownerId;
    }

    public void setOwnerId(String ownerId) {
	this.ownerId = ownerId;
    }

    public String getName() {
	return this.name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public int getSpecies() {
	return this.species;
    }

    public void setSpecies(int species) {
	this.species = species;
    }

    public Date getBirthday() {
	return this.birthday;
    }

    public void setBirthday(Date birthday) {
	this.birthday = birthday;
    }

    public int getBreed() {
	return this.breed;
    }

    public void setBreed(int breed) {
	this.breed = breed;
    }

    public Integer getSex() {
	return this.sex;
    }

    public void setSex(Integer sex) {
	this.sex = sex;
    }

    public Integer getBreedingPlace() {
	return this.breedingPlace;
    }

    public void setBreedingPlace(Integer breedingPlace) {
	this.breedingPlace = breedingPlace;
    }

    public Integer getContraception() {
	return this.contraception;
    }

    public void setContraception(Integer contraception) {
	this.contraception = contraception;
    }

    public BigDecimal getWeight() {
	return this.weight;
    }

    public void setWeight(BigDecimal weight) {
	this.weight = weight;
    }

    public Integer getActiveLevel() {
	return this.activeLevel;
    }

    public void setActiveLevel(Integer activeLevel) {
	this.activeLevel = activeLevel;
    }

    public int getDeleteFlg() {
	return this.deleteFlg;
    }

    public void setDeleteFlg(int deleteFlg) {
	this.deleteFlg = deleteFlg;
    }

    public LocalDate getCreatedDate() {
	return this.createdDate;
    }

    public void setCreatedDate(LocalDate localDate) {
	this.createdDate = localDate;
    }

    public LocalDate getUpdatedDate() {
	return this.updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
	this.updatedDate = updatedDate;
    }

}