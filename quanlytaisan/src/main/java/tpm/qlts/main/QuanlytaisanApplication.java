package tpm.qlts.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages= {"tpm.qlts"})
@EntityScan("tpm.qlts.entitys")
@EnableJpaRepositories("tpm.qlts.repositorys")
public class QuanlytaisanApplication {
	public static void main(String[] args) {
		SpringApplication.run(QuanlytaisanApplication.class, args);
	}
}
