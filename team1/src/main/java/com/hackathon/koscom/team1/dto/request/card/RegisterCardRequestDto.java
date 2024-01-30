package com.hackathon.koscom.team1.dto.request.card;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterCardRequestDto {

    private String cardBank;
    private String cardNumber;
    private Long userSeq;
}
