package com.leilao.backend.model;

import lombok.Data;

@Data
public class CategoryCreateDTO {
    private String name;
    private String observation;
    private String userEmail;

}
