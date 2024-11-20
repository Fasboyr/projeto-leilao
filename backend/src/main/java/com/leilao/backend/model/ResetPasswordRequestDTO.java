package com.leilao.backend.model;

import lombok.Data;

@Data
public class ResetPasswordRequestDTO {
    private String email;
    private Integer validationCode;
    private String newPassword;
}
