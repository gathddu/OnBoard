package br.gov.dataprev.dapi.consulta_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ConsultaServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConsultaServiceApplication.class, args);
    }
}
