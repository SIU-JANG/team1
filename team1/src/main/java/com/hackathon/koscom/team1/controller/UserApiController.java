package com.hackathon.koscom.team1.controller;

import com.hackathon.koscom.team1.dto.request.user.ChangeUserStockRequestDto;
import com.hackathon.koscom.team1.dto.request.user.LoginRequestDto;
import com.hackathon.koscom.team1.dto.request.user.RegisterRequestDto;
import com.hackathon.koscom.team1.dto.request.user.RegisterUserTypeRequestDto;
import com.hackathon.koscom.team1.dto.response.user.GetChosenStockResponseDto;
import com.hackathon.koscom.team1.dto.response.user.LoginResponseDto;
import com.hackathon.koscom.team1.model.Consumption;
import com.hackathon.koscom.team1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserApiController {

    private final UserService userService;

    // Login
    @PostMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            LoginResponseDto loginResponseDto = userService.loginUser(loginRequestDto.getUserId(), loginRequestDto.getUserPassword());

            if (loginResponseDto != null) {
                return ResponseEntity.ok().body(loginResponseDto);
            }
            return ResponseEntity.badRequest().body("로그인 실패");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("로그인 실패");
        }
    }

    // Register
    @PostMapping("/users")
    public ResponseEntity<?> register (@RequestBody RegisterRequestDto registerRequestDto) {
        try {
            Long userSeq = userService.registerUser(registerRequestDto.getUserId(), registerRequestDto.getUserPassword(), registerRequestDto.getUserName());
            if (userSeq >= 1) {
                return ResponseEntity.ok().body(userSeq);
            }
            return ResponseEntity.badRequest().body("회원가입 실패");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("회원가입 실패");
        }
    }

    // List Consumptions
    @GetMapping("/users/consumption/{userSeq}")
    public ResponseEntity<?> listConsumption (@PathVariable Long userSeq) {
        try {
            List<Consumption> consumptions = userService.listConsumtions(userSeq);

            return ResponseEntity.ok().body(consumptions);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("소비 가져오기 실패");
        }
    }

    // User Type Register
    @PostMapping("/users/type")
    public ResponseEntity<?> registerUserType (@RequestBody RegisterUserTypeRequestDto registerUserTypeRequestDto) {
        try {
            userService.registerUserType(registerUserTypeRequestDto.getUserSeq(), registerUserTypeRequestDto.getUserType());
            return ResponseEntity.ok("유저 Type 설정 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("유저 Type 설정 실패");
        }
    }

    // Get Current Chosen Stock
    @GetMapping("/curstock/{userSeq}")
    public ResponseEntity<?> getChosenStock (@PathVariable Long userSeq) {
        try {
            GetChosenStockResponseDto chosenStockResponseDto = userService.getChosenStock(userSeq);
            return ResponseEntity.ok(chosenStockResponseDto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("유저 주식 가져오기 실패");
        }
    }

    @PutMapping("/curstock")
    public ResponseEntity<?> changeUserStock (@RequestBody ChangeUserStockRequestDto changeUserStockRequestDto) {
        try {
            userService.changeChosenStock(changeUserStockRequestDto.getUserSeq(), changeUserStockRequestDto.getUserStockSeq(), changeUserStockRequestDto.getUserStockName(), changeUserStockRequestDto.getCurrentPrice());
            return ResponseEntity.ok().body("유저 주식 변경 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("유저 주식 변경 실패");
        }
    }

    @GetMapping("/users/{userSeq}/standardamount/{amount}")
    public ResponseEntity<?> setStandardAmount (@PathVariable Long userSeq, @PathVariable Long amount) {
        try {
            userService.setStandardAmount(userSeq, amount);
            return ResponseEntity.ok().body("기준 금액 설정 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("기준 금액 설정 실패");
        }
    }
}
