package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
