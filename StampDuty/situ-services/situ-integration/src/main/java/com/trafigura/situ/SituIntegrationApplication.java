package com.trafigura.situ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = {"com.trafigura.situ", "com.trafigura.onedesk"})
@EnableJpaRepositories(basePackages = { "com.trafigura.situ.repository" })
@EntityScan(basePackages = { "com.trafigura.situ", "com.trafigura.onedesk" })
@EnableJpaAuditing
@EnableCaching
public class SituIntegrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(SituIntegrationApplication.class, args);
	}

}
