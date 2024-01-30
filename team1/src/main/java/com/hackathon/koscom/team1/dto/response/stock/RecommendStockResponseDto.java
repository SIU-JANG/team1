package com.hackathon.koscom.team1.dto.response.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendStockResponseDto {

    private Long stockSeq;
    private String stockName;
    private Long currentPrice;
}
