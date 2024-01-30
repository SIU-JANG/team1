package com.hackathon.koscom.team1.controller;

import com.hackathon.koscom.team1.dto.request.user.ConsumptionRequestDto;
import com.hackathon.koscom.team1.service.ConsumptionService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ConsumptionApiController {

    private final ConsumptionService consumptionService;

    @PostMapping("/consumptions")
    public ResponseEntity<?> consumption (@RequestBody ConsumptionRequestDto consumptionRequestDto) {
        try {
            consumptionService.consumption(consumptionRequestDto.getUserSeq(), consumptionRequestDto.getConsumptionType(), consumptionRequestDto.getConsumptionAmount());
            consumptionService.setUserStock(consumptionRequestDto.getUserSeq());
            return ResponseEntity.ok("소비 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("소비 실패");
        }
    }
}
