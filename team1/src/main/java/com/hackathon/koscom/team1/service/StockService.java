package com.hackathon.koscom.team1.service;

import com.hackathon.koscom.team1.dto.response.stock.NotSoldStockResponseDto;
import com.hackathon.koscom.team1.dto.response.stock.RecommendStockResponseDto;
import com.hackathon.koscom.team1.dto.response.stock.SoldStockDto;
import com.hackathon.koscom.team1.dto.response.stock.SoldStockResponseDto;
import com.hackathon.koscom.team1.model.Stock;
import com.hackathon.koscom.team1.model.UserStock;
import com.hackathon.koscom.team1.repository.StockRepository;
import com.hackathon.koscom.team1.repository.UserStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {

    private final StockRepository stockRepository;
    private final UserStockRepository userStockRepository;

    // Recommend Stocks
    public List<RecommendStockResponseDto> recommendStock (boolean deviation, boolean per, boolean dividendYield, boolean fscoreValue) {

        List<RecommendStockResponseDto> stocks = new ArrayList<>();
        List<Stock> foundStocks = new ArrayList<>();

        if (deviation) {
            foundStocks = stockRepository.findByDeviation();
        } else if (per) {
            foundStocks = stockRepository.findByPer();
        } else if (dividendYield) {
            foundStocks = stockRepository.findByDividendYield();
        } else if (fscoreValue) {
            foundStocks = stockRepository.findByFscoreValue();
        }

        for (int i = 0; i < foundStocks.size(); i++) {
            RecommendStockResponseDto recommendStockResponseDto = new RecommendStockResponseDto();

            recommendStockResponseDto.setStockSeq(foundStocks.get(i).getStockSeq());
            recommendStockResponseDto.setStockName(foundStocks.get(i).getStockName());
            recommendStockResponseDto.setCurrentPrice(foundStocks.get(i).getStockCurrentPrice());

            stocks.add(recommendStockResponseDto);
        }

        return stocks;
    }

    public SoldStockResponseDto soldStocks (long userSeq) {
        List<UserStock> userStocks = userStockRepository.findAllByUserSeq(userSeq);

        SoldStockResponseDto soldStockResponseDto = new SoldStockResponseDto();

        long totalBuy = 0L;
        long totalSell = 0L;

        for (UserStock userStock : userStocks) {
            if (userStock.getSellPrice() > 0) {
                SoldStockDto soldStockDto = new SoldStockDto();
                soldStockDto.setUserStockSeq(userStock.getUserStockSeq());

                Stock stock = stockRepository.findByStockSeq(userStock.getStock().getStockSeq());
                soldStockDto.setStockName(stock.getStockName());
                soldStockDto.setBuyPrice(userStock.getBuyPrice());
                soldStockDto.setSellPrice(userStock.getSellPrice());
                soldStockDto.setRateOfReturn(((userStock.getSellPrice() - userStock.getBuyPrice()) / (double)userStock.getBuyPrice()) * 100);

                soldStockResponseDto.getList().add(soldStockDto);

                totalBuy += userStock.getBuyPrice();
                totalSell += userStock.getSellPrice();
            }
        }

        soldStockResponseDto.setTotalRateOfReturn(((totalSell - totalBuy) / (double)totalBuy) * 100);

        return soldStockResponseDto;
    }

    public List<NotSoldStockResponseDto> notSoldStocks (long userSeq) {
        List<UserStock> userStocks = userStockRepository.findAllByUserSeq(userSeq);

        List<NotSoldStockResponseDto> notSoldStockResponseDtos = new ArrayList<>();

        for (UserStock userStock : userStocks) {
            NotSoldStockResponseDto notSoldStockResponseDto = new NotSoldStockResponseDto();
            if (userStock.getSellPrice() <= 0) {
                notSoldStockResponseDto.setUserStockSeq(userStock.getUserStockSeq());

                Stock stock = stockRepository.findByStockSeq(userStock.getStock().getStockSeq());
                notSoldStockResponseDto.setStockName(stock.getStockName());
                notSoldStockResponseDto.setBuyPrice(userStock.getBuyPrice());
                notSoldStockResponseDto.setCurrentPrice(stock.getStockCurrentPrice());
                notSoldStockResponseDto.setAmount(userStock.getCurrentAmount());
                notSoldStockResponseDto.setRateOfReturn((((stock.getStockCurrentPrice() - userStock.getBuyPrice()) / (double)userStock.getBuyPrice()) * 100));

                notSoldStockResponseDtos.add(notSoldStockResponseDto);
            }
        }

        return notSoldStockResponseDtos;
    }
}
