package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.model.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

}
