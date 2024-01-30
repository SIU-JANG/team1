package com.hackathon.koscom.team1.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionRequestDto {

    private Long userSeq;
    private String consumptionType;
    private Long consumptionAmount;
}
