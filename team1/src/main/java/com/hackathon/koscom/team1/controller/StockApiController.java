package com.hackathon.koscom.team1.controller;

import com.hackathon.koscom.team1.dto.gpt.Gpt2Response;
import com.hackathon.koscom.team1.dto.gpt.Gpt3Response;
import com.hackathon.koscom.team1.dto.gpt.GptRequestDto;
import com.hackathon.koscom.team1.dto.gpt.GptResponse;
import com.hackathon.koscom.team1.dto.request.stock.RecommendStockRequestDto;
import com.hackathon.koscom.team1.dto.response.gpt.GptResponseDto;
import com.hackathon.koscom.team1.dto.response.stock.NotSoldStockResponseDto;
import com.hackathon.koscom.team1.dto.response.stock.RecommendStockResponseDto;
import com.hackathon.koscom.team1.dto.response.stock.SoldStockResponseDto;
import com.hackathon.koscom.team1.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StockApiController {

    private final StockService stockService;

    private final RestTemplate restTemplate;

    // Recommend Stocks
    @PostMapping("/stocks/recommend")
    public ResponseEntity<?> recommendStock (@RequestBody RecommendStockRequestDto recommendStockRequestDto) {
        try {
            List<RecommendStockResponseDto> stocks = stockService.recommendStock(recommendStockRequestDto.isDeviation(), recommendStockRequestDto.isPer(), recommendStockRequestDto.isDividendYield(), recommendStockRequestDto.isFscoreValue());

            if (stocks.isEmpty()) {
                return ResponseEntity.badRequest().body("추천 주식 없음");
            }

            return ResponseEntity.ok().body(stocks);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("추천 주식 가져오기 실패");
        }
    }

    private static final String ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private static final String model = "gpt-3.5-turbo";

    @PostMapping("/gpt")
    public String chat(@RequestBody String prompt){

        GptRequestDto request = new GptRequestDto(
                model,prompt,1,1000,1,2,2);

        GptResponseDto gptResponse = restTemplate.postForObject(
                ENDPOINT
                , request
                , GptResponseDto.class
        );


        return gptResponse.getChoices().get(0).getMessage().getContent();
    }

    @GetMapping("/stocks/{userSeq}")
    public ResponseEntity<?> listSoldStocks (@PathVariable Long userSeq) {
        try {
            SoldStockResponseDto soldStockResponseDto = stockService.soldStocks(userSeq);
            return ResponseEntity.ok().body(soldStockResponseDto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("투자 수익 정보 가져오기 실패");
        }
    }

    @GetMapping("/mystocks/{userSeq}")
    public ResponseEntity<?> listNotSoldStocks (@PathVariable Long userSeq) {
        try {
            List<NotSoldStockResponseDto> notSoldStockResponseDtos = stockService.notSoldStocks(userSeq);
            return ResponseEntity.ok().body(notSoldStockResponseDtos);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("보유 주식 가져오기 실패");
        }
    }

    @GetMapping("/introduce/{name}")
    public ResponseEntity<?> introduce (@PathVariable String name) {
        if (name.equals("삼성전자")) {
            GptResponse gptResponse = new GptResponse();
            return ResponseEntity.ok().body(gptResponse);
        } else if (name.equals("SK하이닉스")) {
            Gpt2Response gpt2Response = new Gpt2Response();
            return ResponseEntity.ok().body(gpt2Response);
        } else if (name.equals("우리금융지주")) {
            Gpt3Response gpt3Response = new Gpt3Response();
            return ResponseEntity.ok().body(gpt3Response);
        } else {
            GptResponse gptResponse = new GptResponse();
            return ResponseEntity.ok().body(gptResponse);
        }
    }
}
