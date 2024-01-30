package com.hackathon.koscom.team1.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_type")
    private String userType;

    @Column(name = "user_stock_name")
    private String userStockName;

    @Column(name = "user_stock_seq")
    private Long userStockSeq;

    @Column(name = "user_stock_current_price")
    private Long userStockCurrentPrice;

    @Column(name = "standard_amount")
    private Long standardAmount;

    // User - Card
    @OneToMany(mappedBy = "user")
    private List<Card> cards = new ArrayList<>();

    // User - UserStock
    @OneToMany(mappedBy = "user")
    private List<UserStock> userStocks = new ArrayList<>();

    // User - Consumption
    @OneToMany(mappedBy = "user")
    private List<Consumption> consumptions = new ArrayList<>();

    // User - Investment
    @OneToMany(mappedBy = "user")
    private List<Investment> investments = new ArrayList<>();
}
