package com.hackathon.koscom.team1.service;

import com.hackathon.koscom.team1.dto.response.user.GetChosenStockResponseDto;
import com.hackathon.koscom.team1.dto.response.user.LoginResponseDto;
import com.hackathon.koscom.team1.model.Consumption;
import com.hackathon.koscom.team1.model.User;
import com.hackathon.koscom.team1.repository.ConsumptionRepository;
import com.hackathon.koscom.team1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final ConsumptionRepository consumptionRepository;

    // Login
    public LoginResponseDto loginUser (String userId, String userPassword) {
        if (userRepository.existsByUserId(userId)) {
            User user = userRepository.findByUserId(userId);

            if (user.getUserPassword().equals(userPassword)) {
                return new LoginResponseDto(user.getUserSeq(), user.getUserId(), user.getUserName(), user.getStandardAmount());
            }

            return null;
        }

        return null;
    }

    // Register
    @Transactional
    public Long registerUser (String userId, String userPassword, String userName) {
        User user = new User();
        user.setUserId(userId);
        user.setUserPassword(userPassword);
        user.setUserName(userName);

        userRepository.save(user);

        return user.getUserSeq();
    }

    // List Consumptions
    public List<Consumption> listConsumtions (Long userSeq) {
        return consumptionRepository.findAllByUserSeq(userSeq);
    }

    // Register User Type
    @Transactional
    public void registerUserType (Long userSeq, String userType) {
        User foundUser = userRepository.findByUserSeq(userSeq);

        foundUser.setUserType(userType);
    }

    // Get Chosen Stock
    public GetChosenStockResponseDto getChosenStock (Long userSeq) {
        User foundUser = userRepository.findByUserSeq(userSeq);

        GetChosenStockResponseDto chosenStockResponseDto = new GetChosenStockResponseDto(foundUser.getUserStockSeq(), foundUser.getUserStockName(), foundUser.getUserStockCurrentPrice());

        return chosenStockResponseDto;
    }

    // Change User Stock
    @Transactional
    public void changeChosenStock (Long userSeq, Long userStockSeq, String userStockName, Long userStockCurrentPrice) {
        User foundUser = userRepository.findByUserSeq(userSeq);

        foundUser.setUserStockSeq(userStockSeq);
        foundUser.setUserStockName(userStockName);
        foundUser.setUserStockCurrentPrice(userStockCurrentPrice);
    }

    @Transactional
    public void setStandardAmount (Long userSeq, Long standardAmount) {
        User foundUser = userRepository.findByUserSeq(userSeq);

        foundUser.setStandardAmount(standardAmount);
    }
}
