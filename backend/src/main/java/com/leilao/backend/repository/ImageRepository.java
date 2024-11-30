package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
