package com.leilao.backend.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.PersonAuthRequestDTO;
import com.leilao.backend.model.PersonRecoverRequestDTO;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String passwordCodeRequest(PersonRecoverRequestDTO personAuthRequestDTO) {
        Optional<Person> person = personRepository.findByEmail(personAuthRequestDTO.getEmail());

        if (person.isEmpty() || person == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Person personDatabase = person.get();
        // gerar um numero random
        int codigoAleatorio = (int) (Math.random() * 900000) + 100000;
        personDatabase.setValidationCode(codigoAleatorio);

        // aumentar uns 5 ou 10 minutos da data atual
        Calendar calendario = Calendar.getInstance();
        calendario.add(Calendar.MINUTE, 10);
        personDatabase.setValidationCodeValidity(calendario.getTime());

        personRepository.save(personDatabase);

        Context context = new Context();
        context.setVariable("name", personDatabase.getName());
        context.setVariable("validationCode", codigoAleatorio);

        try {
            emailService.sendTemplateEmail(
                    personDatabase.getEmail(),
                    "Código de Redefinição de Senha",
                    context,
                    "emailReset");
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar o e-mail.");
        }

        return "Código de redefinição de senha enviado para o e-mail.";

        // enviar o email com o código semelhante ao que foi feito no cadastro - método
        // create abaixo

    }

    public Person create(Person person) {
        // Gera código de validação
        int validationCode = (int) (Math.random() * 900000) + 100000; // Código de 6 dígitos
        person.setValidationCode(validationCode);

        // Define validade do código (24 horas)
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, 24);
        person.setValidationCodeValidity(calendar.getTime());

        person.setValidated(false); // Usuário ainda não validado
        Person personSaved = personRepository.save(person);

        // Enviar e-mail de confirmação
        Context context = new Context();
        context.setVariable("name", personSaved.getName());
        context.setVariable("validationCode", validationCode);
        try {
            emailService.sendTemplateEmail(
                    personSaved.getEmail(),
                    "Confirmação de Cadastro",
                    context,
                    "emailConfirmation");
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new MailSendException("Erro ao enviar o e-mail");

        }
        return personSaved;
    }

    public String confirmRegistration(PersonAuthRequestDTO personAuthRequestDTO) {
        deleteExpiredUnvalidatedRecords();

        // Localiza o usuário pelo e-mail e código de validação
        Person person = personRepository.findByEmailAndValidationCode(
                personAuthRequestDTO.getEmail(),
                personAuthRequestDTO.getValidationCode())
                .orElseThrow(() -> new IllegalArgumentException("Código de validação inválido ou expirado"));

        // Verifica se o código ainda é válido
        if (new Date().after(person.getValidationCodeValidity())) {
            throw new IllegalArgumentException("Código de validação expirado.");
        }

        // Atualiza o status para validado
        person.setValidated(true);
        person.setValidationCode(null); // Remove o código após validação
        person.setValidationCodeValidity(null);
        personRepository.save(person);

        return "Cadastro confirmado com sucesso.";
    }

    private void deleteExpiredUnvalidatedRecords() {
        Date now = new Date(); // Data e hora atual
        personRepository.deleteAllByIsValidatedFalseAndValidationCodeValidityBefore(now);
    }

    public void validateUserForAuthentication(String email) {
        // Verifica se o usuário existe
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Verifica se o cadastro foi validado
        if (!person.isValidated()) {
            throw new IllegalArgumentException("Usuário não validado. Por favor, confirme seu cadastro.");
        }
    }

    public Person update(Person person) {
        Person personSaved = personRepository.findById(person.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));

        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());

        return personRepository.save(personSaved);
    }

    public String resetPassword(String email, Integer validationCode, String newPassword) {
        Optional<Person> emailOptional = personRepository.findByEmail(email);

        if (emailOptional.isEmpty()) {
            throw new UsernameNotFoundException("E-mail não encontrado.");
        }
        Optional<Person> personOptional = personRepository.findByEmailAndValidationCode(email, validationCode);
    
        if (personOptional.isEmpty()) {
            throw new IllegalArgumentException("Código de validação inválido ou expirado.");
        }

        Person person = personOptional.get();
        Date now = new Date();

        if (person.getValidationCodeValidity() == null || person.getValidationCodeValidity().before(now)) {
            throw new IllegalArgumentException("Código de validação expirado.");
        }

        // Atualizar a senha
        person.setPassword(newPassword);
        person.setValidationCode(null); // Invalida o código após a redefinição
        person.setValidationCodeValidity(null);

        personRepository.save(person);

        return "Senha redefinida com sucesso.";
    }

    public String changePassword(String email, String newPassword) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        person.setPassword(newPassword);
        personRepository.save(person);
        return "Senha alterada com sucesso.";
    }

}
