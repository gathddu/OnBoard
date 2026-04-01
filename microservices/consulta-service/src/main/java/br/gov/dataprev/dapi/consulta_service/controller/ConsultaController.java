package br.gov.dataprev.dapi.consulta_service.controller;

import br.gov.dataprev.dapi.consulta_service.client.BeneficiarioClient;
import br.gov.dataprev.dapi.consulta_service.model.Beneficiario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consulta" )
public class ConsultaController {

    private final BeneficiarioClient beneficiarioClient;

    public ConsultaController(BeneficiarioClient beneficiarioClient) {
        this.beneficiarioClient = beneficiarioClient;
    }

    @GetMapping("/beneficiarios")
    public ResponseEntity<List<Beneficiario>> listarTodos() {
        return ResponseEntity.ok(beneficiarioClient.listarTodos());
    }

    @GetMapping("/beneficiarios/{id}")
    public ResponseEntity<Beneficiario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(beneficiarioClient.buscarPorId(id));
    }
}
