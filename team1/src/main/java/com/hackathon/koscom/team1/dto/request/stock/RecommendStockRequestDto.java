package com.hackathon.koscom.team1.dto.request.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendStockRequestDto {

    private boolean deviation;
    private boolean per;
    private boolean dividendYield;
    private boolean fscoreValue;
}
