package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.model.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

}
