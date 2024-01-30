package com.hackathon.koscom.team1.repository;

import com.hackathon.koscom.team1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Login
    public User findByUserId(String userId);

    public boolean existsByUserId(String userId);

    public User findByUserSeq(Long userSeq);
}
