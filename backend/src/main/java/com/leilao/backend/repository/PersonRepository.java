package com.leilao.backend.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.leilao.backend.model.Person;

import jakarta.transaction.Transactional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByEmail(String email);

    Optional<Person> findByEmailAndValidationCode(String email, Integer validationCode);

    @Transactional
    @Modifying
    void deleteAllByIsValidatedFalseAndValidationCodeValidityBefore(Date expiryDate);


}
