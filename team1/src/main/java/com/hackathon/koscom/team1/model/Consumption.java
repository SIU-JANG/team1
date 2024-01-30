package com.hackathon.koscom.team1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "consumption")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Consumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumption_seq")
    private Long consumptionSeq;

    @Column(name = "consumption_type")
    private String consumptionType;

    @Column(name = "consumption_amount")
    private Long consumptionAmount;

    // Consumption - User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    @JsonIgnore
    private User user;

    public void setUser(User user) {
        this.user = user;
        user.getConsumptions().add(this);
    }
}
