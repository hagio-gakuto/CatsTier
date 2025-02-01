package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BreedsOptionResDto {

    private long value; // エラーの種類
    private String option; // エラーメッセージフィールドおよび内容
    private int species;
    private String description;

}