package com.leilao.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordVerification {

    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Suponha que esta seja a senha armazenada no banco (hash da nova senha)
        String storedPasswordHash = "$2a$10$4CGVq3KsX9yoTls41lsgEuVGeeMq0Tj6.PLE7dSz1XKRbq.ns0I2K"; // Exemplo

        // Senha que você quer verificar
        String newPassword = "123";

        // Verifica se a senha fornecida gera o mesmo hash
        boolean matches = passwordEncoder.matches(newPassword, storedPasswordHash);

        if (matches) {
            System.out.println("A senha fornecida corresponde ao hash armazenado.");
        } else {
            System.out.println("A senha fornecida não corresponde ao hash armazenado.");
        }
    }
}
