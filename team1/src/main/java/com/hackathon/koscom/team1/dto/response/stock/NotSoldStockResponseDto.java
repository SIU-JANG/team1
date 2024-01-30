package com.hackathon.koscom.team1.dto.response.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotSoldStockResponseDto {

    private Long userStockSeq;
    private String stockName;
    private Long buyPrice;
    private Long currentPrice;
    private Double amount;
    private Double rateOfReturn;
}
