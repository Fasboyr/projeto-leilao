package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Feedback;
import com.leilao.backend.repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback create(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback update(Feedback feedback) {
        Feedback feedbackSaved = feedbackRepository.findById(feedback.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        feedbackSaved.setComment(feedback.getComment());
        feedbackSaved.setRating(feedback.getRating());
        feedbackSaved.setDateTime(feedback.getDateTime());
        return feedbackRepository.save(feedbackSaved);
    }

    public void delete(Long id) {
        Feedback feedbackSaved = feedbackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        feedbackRepository.delete(feedbackSaved);
    }

    public List<Feedback> listAll() {
        return feedbackRepository.findAll();
    }
}