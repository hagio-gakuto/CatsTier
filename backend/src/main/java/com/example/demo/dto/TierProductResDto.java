package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TierProductResDto {

    private long id;
    private String itemCode;
    private int petId;
    private String uid;
    private String tierCategory;
    private char tierRank;
    private int rankInTier;
    private Integer genreId;
    private String name;
    private String imageUrl;
    private Integer price;
    private String itemUrl;

}
