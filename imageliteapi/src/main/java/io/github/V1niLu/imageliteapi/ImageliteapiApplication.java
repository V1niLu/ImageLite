package io.github.V1niLu.imageliteapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication // Anotação que indica que essa é a classe principal do Spring Boot
@EnableJpaAuditing // Habilita o suporte a auditoria JPA, necessário para @CreatedDate
@ComponentScan(basePackages = "io.github.V1niLu.imagelite") // Especifica os pacotes a serem escaneados para encontrar componentes Spring
public class ImageliteapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImageliteapiApplication.class, args);
	}

}
