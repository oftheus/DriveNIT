package com.drivenit.reserva_api;

// Anotação que indica que esta classe é uma aplicação Spring Boot
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Classe principal da aplicação que inicia o contexto do Spring Boot
@SpringBootApplication
public class ReservaApiApplication {

	// Metodo principal que é o ponto de entrada da aplicação
	public static void main(String[] args) {
		// Executa a aplicação Spring Boot, inicializando o contexto da aplicação
		SpringApplication.run(ReservaApiApplication.class, args);
	}

}
