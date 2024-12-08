package com.leilao.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.Enum.UserType;
import com.leilao.backend.repository.PersonRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(PersonRepository personRepository) {
		return args -> {
			if (personRepository.findByEmail("admin@admin.com").isEmpty()) {
				Person admin = new Person();
				admin.setName("ADMIN");
				admin.setEmail("admin@admin.com");
				admin.setPassword("@Dmin123"); // Senha criptografada
				admin.setUserType(UserType.A); // Define como administrador
				admin.setValidated(true); // Define como validado
				personRepository.save(admin);
				System.out.println("Usuário administrador criado: admin@admin.com");
			} else {
				System.out.println("Usuário administrador já existe.");
			}
		};
	}

}
