package com.hackathon.koscom.team1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "userstock")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_stock_seq")
    private Long userStockSeq;

    @Column(name = "buy_price")
    private Long buyPrice;

    @Column(name = "sell_price")
    private Long sellPrice;

    @Column(name = "current_amount")
    private Double currentAmount;

    // UserStock - User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    @JsonIgnore
    private User user;

    // UserStock - Stock
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_seq")
    @JsonIgnore
    private Stock stock;

    public void setUser(User user) {
        this.user = user;
        user.getUserStocks().add(this);
    }

    public void setStock(Stock stock) {
        this.stock = stock;
        stock.getUserStocks().add(this);
    }
}
