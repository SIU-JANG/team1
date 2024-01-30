package com.hackathon.koscom.team1.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Long userSeq;
    private String userId;
    private String userName;
    private Long standardAmount;
}
