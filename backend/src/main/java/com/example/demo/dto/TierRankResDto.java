package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TierRankResDto {

    private List<TierProductResDto> S;
    private List<TierProductResDto> A;
    private List<TierProductResDto> B;
    private List<TierProductResDto> C;
    private List<TierProductResDto> D;

}
