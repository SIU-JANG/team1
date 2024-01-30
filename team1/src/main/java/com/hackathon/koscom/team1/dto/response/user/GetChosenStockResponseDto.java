package com.hackathon.koscom.team1.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetChosenStockResponseDto {

    private Long userStockSeq;
    private String userStockName;
    private Long userStockCurrentPrice;
}
