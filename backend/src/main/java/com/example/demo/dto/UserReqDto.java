package com.example.demo.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDto {

    private String uid;
    private String userName;
    private Integer petsNum;
    private Date registeredDate;
    private Integer deleteFlg;
    private Date createdDate;
    private Date updatedDate;

}
