package com.hackathon.koscom.team1.dto.response.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoldStockDto {

    private Long userStockSeq;
    private String stockName;
    private Long buyPrice;
    private Long sellPrice;
    private Double rateOfReturn;
}
