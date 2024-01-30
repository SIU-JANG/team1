package com.hackathon.koscom.team1.repository;

import com.hackathon.koscom.team1.model.Card;
import com.hackathon.koscom.team1.model.UserStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserStockRepository extends JpaRepository<UserStock, Long> {

    @Query(value = "SELECT * FROM userstock us WHERE us.user_seq = :userSeq", nativeQuery = true)
    public List<UserStock> findAllByUserSeq (@Param("userSeq") Long userSeq);
}
