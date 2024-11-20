package com.leilao.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordVerification {

    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Suponha que esta seja a senha armazenada no banco (hash da nova senha)
        String storedPasswordHash = "$2a$10$G9uqE8E8zH5V9ChE0Ns03u8AEeRAPOOOyzxdtbVQdMmJ105kU1yZS"; // Exemplo
        String newPassword = "2234";

        // Verifica se a senha fornecida gera o mesmo hash
        boolean matches = passwordEncoder.matches(newPassword, storedPasswordHash);

        if (matches) {
            System.out.println("A senha fornecida corresponde ao hash armazenado.");
        } else {
            System.out.println("A senha fornecida não corresponde ao hash armazenado.");
        }
    }
}
