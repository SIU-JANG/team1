package com.hackathon.koscom.team1.service;

import com.hackathon.koscom.team1.model.Card;
import com.hackathon.koscom.team1.model.User;
import com.hackathon.koscom.team1.repository.CardRepository;
import com.hackathon.koscom.team1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    // Register Card
    @Transactional
    public boolean registerCard (String cardBank, String cardNumber, Long userSeq) {
        Card card = new Card();

        card.setCardBank(cardBank);
        card.setCardNumber(cardNumber);

        Optional<User> user = userRepository.findById(userSeq);
        if (user.isPresent()) {
            card.setUser(user.get());
        } else {
            return false;
        }

        cardRepository.save(card);

        return true;
    }

    // Get Information of All Cards
    public List<Card> listCards (Long userSeq) {
        return cardRepository.findAllByUserSeq(userSeq);
    }
}
