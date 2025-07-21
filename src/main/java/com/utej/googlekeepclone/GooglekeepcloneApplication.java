package com.utej.googlekeepclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.utej.googlekeepclone.repository")
@EntityScan("com.utej.googlekeepclone.model")
@ComponentScan("com.utej.googlekeepclone")
public class GooglekeepcloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(GooglekeepcloneApplication.class, args);
	}

}
