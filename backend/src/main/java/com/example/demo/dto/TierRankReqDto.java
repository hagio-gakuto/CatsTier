package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TierRankReqDto {

    private int petId;
    private String uid;
    private String itemCode;
    private String TierCategory;
    private char tierRank;
    private Integer rankInTier;

}
