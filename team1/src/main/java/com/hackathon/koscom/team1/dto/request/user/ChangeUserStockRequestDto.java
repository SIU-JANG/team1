package com.hackathon.koscom.team1.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeUserStockRequestDto {

    private Long userSeq;
    private Long userStockSeq;
    private String userStockName;
    private Long currentPrice;
}
