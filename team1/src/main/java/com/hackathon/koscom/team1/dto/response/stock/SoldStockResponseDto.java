package com.hackathon.koscom.team1.dto.response.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoldStockResponseDto {

    private List<SoldStockDto> list = new ArrayList<>();
    private Double totalRateOfReturn;
}
