package com.leilao.backend.model;

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
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "Hora de início obrigatório")
    @Column(name = "start_Date_Time")
    private Date startDateTime;

    @NotBlank(message = "Hora de encerramento obrigatório")
    @Column(name = "end_Date_Time")
    private Date endDateTime;

    @NotBlank(message = "Status obrigatório")
    @Column(name = "status")
    private String status;

    @NotBlank(message = "Observação obrigatório")
    @Column(name = "observation")
    private String observation;

    @NotBlank(message = "Valor de incremento obrigatório")
    @Column(name = "increment_Value")
    private float incrementValue;

    @NotBlank(message = "Lance mínimo obrigatório")
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
    private List<Bid> bids;

}
