package com.trafigura.situ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


//@EntityScan(basePackages = {"com.trafigura.onedesk", "com.trafigura.accountingplatform"})
@SpringBootApplication(scanBasePackages = {"com.trafigura.situ", "com.trafigura.onedesk"})
@EnableJpaRepositories(basePackages = { "com.trafigura.situ.repository" })
@EntityScan(basePackages = { "com.trafigura.situ" })
@EnableJpaAuditing
@EnableCaching
public class SituQueryApplication {

	/*
	 * @Autowired JavaMailSender mailSender;
	 */

	public static void main(String[] args) {
		SpringApplication.run(SituQueryApplication.class, args);
	}

}
