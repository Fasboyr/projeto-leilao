package com.leilao.backend.model;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Titulo obrigatório")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "Descrição obrigatório")
    @Column(name = "description")
    private String description;

    @NotNull(message = "A data e hora de início não podem ser nulas")
    @Column(name = "start_Date_Time")
    private LocalDateTime startDateTime;

    @NotNull(message = "A data e hora de término não podem ser nulas")
    @Column(name = "end_Date_Time")
    private LocalDateTime endDateTime;

    @NotBlank(message = "Status obrigatório")
    @Column(name = "status")
    private String status;

    @NotBlank(message = "Observação obrigatório")
    @Column(name = "observation")
    private String observation;

    @Min(value = 0, message = "O valor de incremento deve ser maior ou igual a 0")
    @Column(name = "increment_Value")
    private float incrementValue;

    @Min(value = 0, message = "O valor de incremento deve ser maior ou igual a 0")
    @Column(name = "minimum_Bid")
    private float minimumBid;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AuctionBid> bids;

}
