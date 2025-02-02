package com.example.demo.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPetsResDto {


    private long id;
    private String name;
//    private boolean isActive;
    private int species;
    private String speciesName;
    private Date birthday;
    private int breed;
    private String breedName;
    private Integer sex;
    private String sexName;
    private Integer breedingPlace;
    private String breedingPlaceName;
    private Integer contraception;
    private String contraceptionName;
    private BigDecimal weight;
    private Integer activeLevel;
    private String activeLevelName;
    private String icon;

}
