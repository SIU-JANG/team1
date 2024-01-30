package com.hackathon.koscom.team1.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stock")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_seq")
    private Long stockSeq;

    @Column(name = "stock_name")
    private String stockName;

    @Column(name = "stock_current_price")
    private Long stockCurrentPrice;

    @Column(name = "deviation")
    private Double deviation;

    @Column(name = "dividend_yield")
    private Double dividendYield;

    @Column(name = "per")
    private Double per;

    @Column(name = "fscore_value")
    private Integer fscoreValue;

    // Stock - UserStock
    @OneToMany(mappedBy = "stock")
    private List<UserStock> userStocks = new ArrayList<>();
}
