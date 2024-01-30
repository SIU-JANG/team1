package com.hackathon.koscom.team1.repository;

import com.hackathon.koscom.team1.model.Consumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumptionRepository extends JpaRepository<Consumption, Long> {

    @Query(value = "SELECT * FROM consumption c WHERE c.user_seq = :userSeq", nativeQuery = true)
    public List<Consumption> findAllByUserSeq(@Param("userSeq") Long userSeq);
}
