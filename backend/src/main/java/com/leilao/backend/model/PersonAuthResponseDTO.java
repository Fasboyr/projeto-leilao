package com.leilao.backend.model;

import com.leilao.backend.model.Enum.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
// @AllArgsConstructor
public class PersonAuthResponseDTO {

    private String email;
    private String token;
    private UserType userType;
    private Long id;

    public PersonAuthResponseDTO(String email, String token, UserType userType, Long id) {
        this.email = email;
        this.token = token;
        this.userType = userType;
        this.id = id;
    }
}
