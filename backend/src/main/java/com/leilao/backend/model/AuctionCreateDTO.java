package com.leilao.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class AuctionCreateDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String observation;
    private float incrementValue;
    private float minimumBid;
    private String category;
    private String userEmail;
    private List<ImageDTO> image;

}



