package com.hackathon.koscom.team1.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {

    private String userId;
    private String userPassword;
    private String userName;
}
