package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.PasswordChangeRequestDTO;
import com.leilao.backend.model.Person;
import com.leilao.backend.model.PersonAuthRequestDTO;
import com.leilao.backend.model.PersonAuthResponseDTO;
import com.leilao.backend.model.PersonRecoverRequestDTO;
import com.leilao.backend.model.ResetPasswordRequestDTO;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/person")
@CrossOrigin
public class PersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {
        // Chama o serviço para validar o usuário (existência e confirmação do cadastro)
        personService.validateUserForAuthentication(authRequest.getEmail());

        // Realiza a autenticação
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(), authRequest.getPassword()));

        // Gera e retorna o token JWT
        return new PersonAuthResponseDTO(
                authRequest.getEmail(), jwtService.generateToken(authentication.getName()));
    }

    @PostMapping("/password-code-request")
    public String passwordCodeRequest(@RequestBody PersonRecoverRequestDTO person) {
        return personService.passwordCodeRequest(person);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequestDTO resetPasswordRequest) {
        return personService.resetPassword(
                resetPasswordRequest.getEmail(),
                resetPasswordRequest.getValidationCode(),
                resetPasswordRequest.getNewPassword());
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody PasswordChangeRequestDTO changePasswordRequest) {
        return personService.changePassword(
                changePasswordRequest.getEmail(),
                changePasswordRequest.getNewPassword());
    }

    @PostMapping
    public Person create(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PostMapping("/confirm-registration")
    public String confirmRegistration(@RequestBody PersonAuthRequestDTO personAuthRequestDTO) {
        System.out.println("Entrou na confirmação");
        return personService.confirmRegistration(personAuthRequestDTO);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }
}
