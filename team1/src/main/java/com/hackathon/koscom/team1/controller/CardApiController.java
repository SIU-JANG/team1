package com.hackathon.koscom.team1.controller;

import com.hackathon.koscom.team1.dto.request.card.RegisterCardRequestDto;
import com.hackathon.koscom.team1.dto.request.user.LoginRequestDto;
import com.hackathon.koscom.team1.dto.request.user.RegisterRequestDto;
import com.hackathon.koscom.team1.model.Card;
import com.hackathon.koscom.team1.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CardApiController {

    private final CardService cardService;

    // Register Card
    @PostMapping("/cards")
    public ResponseEntity<?> registerCard (@RequestBody RegisterCardRequestDto registerCardRequestDto) {
        try {
            if (cardService.registerCard(registerCardRequestDto.getCardBank(), registerCardRequestDto.getCardNumber(), registerCardRequestDto.getUserSeq())) {
                return ResponseEntity.ok().body("카드 등록 성공");
            }

            System.out.println("카드 등록 실패");
            return ResponseEntity.badRequest().body("카드 등록 실패");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("카드 등록 실패");
        }
    }

    // Get Information of All Cards
    @GetMapping("/cards/{userSeq}")
    public ResponseEntity<?> listCards(@PathVariable Long userSeq) {
        try {
            List<Card> cards = cardService.listCards(userSeq);

            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("카드 가져오기 실패");
        }
    }
}
