package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.AuctionBid;
import com.leilao.backend.repository.AuctionBidRepository;

@Service
public class AuctionBidService {

    @Autowired
    private AuctionBidRepository AuctionBidRepository;

    public AuctionBid create(AuctionBid bid) {
        return AuctionBidRepository.save(bid);
    }

    public AuctionBid update(AuctionBid bid) {
        AuctionBid bidSaved = AuctionBidRepository.findById(bid.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        bidSaved.setValueBid(bid.getValueBid());
        return AuctionBidRepository.save(bidSaved);
    }

    public void delete(Long id) {
        AuctionBid bidSaved = AuctionBidRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
                AuctionBidRepository.delete(bidSaved);
    }

    public List<AuctionBid> listAll() {
        return AuctionBidRepository.findAll();
    }
}
