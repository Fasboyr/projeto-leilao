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

import com.leilao.backend.model.Auction;
import com.leilao.backend.model.AuctionCreateDTO;
import com.leilao.backend.service.AuctionService;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping("/public")
    public Auction create(@RequestBody AuctionCreateDTO auction) {
        return auctionService.create(auction);
    }

    @PutMapping("/public")
    public Auction update(@RequestBody AuctionCreateDTO auction) {
        return auctionService.update(auction);
    }

    @GetMapping
    public List<Auction> listAll() {
        return auctionService.listAll();
    }

    @GetMapping("/public")
    public List<Auction> listAllPublic() {
        return auctionService.listAllPublic();
    }

    @DeleteMapping("/public/{id}")
    public void delete(@PathVariable("id") Long id) {
        auctionService.delete(id);
    }
}