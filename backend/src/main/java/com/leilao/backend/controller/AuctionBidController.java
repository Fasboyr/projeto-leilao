package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.AuctionBid;
import com.leilao.backend.service.AuctionBidService;

@RestController
@RequestMapping("/api/bid")
@CrossOrigin
public class AuctionBidController {

    @Autowired
    private AuctionBidService AuctionBidService;

    @PostMapping
    public AuctionBid create(@RequestBody AuctionBid bid) {
        return AuctionBidService.create(bid);
    }

    @PutMapping
    public AuctionBid update(@RequestBody AuctionBid bid) {
        return AuctionBidService.update(bid);
    }

    @GetMapping
    public List<AuctionBid> listAll() {
        return AuctionBidService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        AuctionBidService.delete(id);
    }
}