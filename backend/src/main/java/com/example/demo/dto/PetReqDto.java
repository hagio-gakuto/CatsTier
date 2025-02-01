package com.example.demo.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetReqDto {

    private String uid;
    private String icon;
    private String name;
    private Integer breed;
    private Integer species;
    private Integer breedingPlace;
    private Integer contraception;
    private Integer activeLevel;
    private Integer sex;
    private BigDecimal weight;
    private Date birthday;

}
