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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    public Auction create(
            @RequestPart("auction") AuctionCreateDTO auctionCreateDTO,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return auctionService.create(auctionCreateDTO, images);
    }

    @PutMapping("/public")
    public Auction update(
        @RequestPart("auction") AuctionCreateDTO auctionCreateDTO,
        @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return auctionService.update(auctionCreateDTO, images);
    }

    @GetMapping
    public List<Auction> listAll() {
        return auctionService.listAll();
    }

    @GetMapping("/public")
    public List<Auction> listAllPublic() {
        System.out.println("Entrou no list all public");
        return auctionService.listAllPublic();
    }

    @DeleteMapping("/public/{id}")
    public void delete(@PathVariable("id") Long id) {
        auctionService.delete(id);
    }
}