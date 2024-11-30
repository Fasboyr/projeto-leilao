package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Bid;
import com.leilao.backend.repository.BidRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid create(Bid bid) {
        return bidRepository.save(bid);
    }

    public Bid update(Bid bid) {
        Bid bidSaved = bidRepository.findById(bid.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        bidSaved.setBidValue(bid.getBidValue());
        bidSaved.setDateTime(bid.getDateTime());
        return bidRepository.save(bidSaved);
    }

    public void delete(Long id) {
        Bid bidSaved = bidRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        bidRepository.delete(bidSaved);
    }

    public List<Bid> listAll() {
        return bidRepository.findAll();
    }
}
