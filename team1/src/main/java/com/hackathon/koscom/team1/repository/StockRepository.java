package com.hackathon.koscom.team1.repository;

import com.hackathon.koscom.team1.dto.response.stock.RecommendStockResponseDto;
import com.hackathon.koscom.team1.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    @Query(value = "SELECT * FROM stock s ORDER BY s.deviation ASC LIMIT 3", nativeQuery = true)
    public List<Stock> findByDeviation();

    @Query(value = "SELECT * FROM stock s ORDER BY s.per DESC LIMIT 3", nativeQuery = true)
    public List<Stock> findByPer();

    @Query(value = "SELECT * FROM stock s ORDER BY s.dividend_yield DESC LIMIT 3", nativeQuery = true)
    public List<Stock> findByDividendYield();

    @Query(value = "SELECT * FROM stock s ORDER BY s.fscore_value DESC LIMIT 3", nativeQuery = true)
    public List<Stock> findByFscoreValue();

    @Query(value = "SELECT * FROM stock s WHERE s.stock_seq = :stockSeq", nativeQuery = true)
    public Stock findByStockSeq(@Param("stockSeq") Long stockSeq);
}
