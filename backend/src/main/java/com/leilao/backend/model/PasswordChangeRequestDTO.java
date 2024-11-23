package com.leilao.backend.model;

import lombok.Data;

@Data
public class PasswordChangeRequestDTO {
    private String email;
    private String newPassword;
}
