package com.hackathon.koscom.team1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "card")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_seq")
    private Long cardSeq;

    @Column(name = "card_bank")
    private String cardBank;

    @Column(name = "card_number")
    private String cardNumber;

    // Card - User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    @JsonIgnore
    private User user;

    // Card - Stock
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_seq")
    @JsonIgnore
    private Stock stock;

    public void setUser(User user) {
        this.user = user;
        user.getCards().add(this);
    }
}
