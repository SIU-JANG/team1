package com.hackathon.koscom.team1.service;

import com.hackathon.koscom.team1.model.Consumption;
import com.hackathon.koscom.team1.model.Stock;
import com.hackathon.koscom.team1.model.User;
import com.hackathon.koscom.team1.model.UserStock;
import com.hackathon.koscom.team1.repository.ConsumptionRepository;
import com.hackathon.koscom.team1.repository.StockRepository;
import com.hackathon.koscom.team1.repository.UserRepository;
import com.hackathon.koscom.team1.repository.UserStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConsumptionService {

    private final ConsumptionRepository consumptionRepository;
    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final UserStockRepository userStockRepository;

    @Transactional
    public void consumption (Long userSeq, String consumptionType, Long consumptionAmount) {
        Consumption consumption = new Consumption();
        consumption.setConsumptionType(consumptionType);
        consumption.setConsumptionAmount(consumptionAmount);

        User foundUser = userRepository.findByUserSeq(userSeq);
        consumption.setUser(foundUser);

        consumptionRepository.save(consumption);
    }

    @Transactional
    public void setUserStock (Long userSeq) {
        User foundUser = userRepository.findByUserSeq(userSeq);
        Stock foundStock = stockRepository.findByStockSeq(foundUser.getUserStockSeq());

        UserStock userStock = new UserStock();
        userStock.setBuyPrice(foundStock.getStockCurrentPrice());
        userStock.setSellPrice(0L);
        userStock.setCurrentAmount((foundUser.getStandardAmount() / (double)foundStock.getStockCurrentPrice()));
        userStock.setUser(foundUser);
        userStock.setStock(foundStock);

        userStockRepository.save(userStock);
    }
}
