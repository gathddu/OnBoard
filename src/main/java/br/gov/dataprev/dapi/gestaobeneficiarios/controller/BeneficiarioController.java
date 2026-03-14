package br.gov.dataprev.dapi.gestaobeneficiarios.controller;

import br.gov.dataprev.dapi.gestaobeneficiarios.model.Beneficiario;
import br.gov.dataprev.dapi.gestaobeneficiarios.service.BeneficiarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiarios" )
@RequiredArgsConstructor
@Tag(name = "Beneficiários", description = "Gerenciamento de beneficiários")
public class BeneficiarioController {

    private final BeneficiarioService service;

    @GetMapping
    @Operation(summary = "Listar todos os beneficiários")
    public ResponseEntity<List<Beneficiario>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar beneficiário por ID")
    public ResponseEntity<Beneficiario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Cadastrar novo beneficiário")
    public ResponseEntity<Beneficiario> criar(@Valid @RequestBody Beneficiario beneficiario) {
        Beneficiario criado = service.criar(beneficiario);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar beneficiário")
    public ResponseEntity<Beneficiario> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Beneficiario beneficiario) {
        return ResponseEntity.ok(service.atualizar(id, beneficiario));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover beneficiário")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

