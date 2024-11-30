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

import com.leilao.backend.model.Bid;
import com.leilao.backend.service.BidService;

@RestController
@RequestMapping("/api/bid")
@CrossOrigin
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping
    public Bid create(@RequestBody Bid bid) {
        return bidService.create(bid);
    }

    @PutMapping
    public Bid update(@RequestBody Bid bid) {
        return bidService.update(bid);
    }

    @GetMapping
    public List<Bid> listAll() {
        return bidService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        bidService.delete(id);
    }
}