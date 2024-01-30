package com.hackathon.koscom.team1.repository;

import com.hackathon.koscom.team1.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(value = "SELECT * FROM card c WHERE c.user_seq = :userSeq", nativeQuery = true)
    public List<Card> findAllByUserSeq(@Param("userSeq") Long userSeq);
}
