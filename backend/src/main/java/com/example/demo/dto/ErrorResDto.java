package com.example.demo.dto;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) 
public class ErrorResDto {	

	private String errorCategory; // エラーの種類
	private Map<String, String> errorMsg; // エラーメッセージフィールドおよび内容

}