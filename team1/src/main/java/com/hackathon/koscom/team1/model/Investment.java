package com.hackathon.koscom.team1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "investment")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "investment_seq")
    private Long investmentSeq;

    @Column(name = "stock_seq")
    private Integer stockSeq;

    @Column(name = "rate_of_return")
    private String rateOfReturn;

    @Column(name = "amount_of_return")
    private Long amountOfReturn;

    // Investment - User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    @JsonIgnore
    private User user;

    public void setUser(User user) {
        this.user = user;
        user.getInvestments().add(this);
    }
}
