package br.gov.dataprev.dapi.consulta_service.client;

import br.gov.dataprev.dapi.consulta_service.model.Beneficiario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "beneficiarios-service", url = "${beneficiarios.service.url}")
public interface BeneficiarioClient {

    @GetMapping("/api/beneficiarios")
    List<Beneficiario> listarTodos();

    @GetMapping("/api/beneficiarios/{id}")
    Beneficiario buscarPorId(@PathVariable("id") Long id);
}
