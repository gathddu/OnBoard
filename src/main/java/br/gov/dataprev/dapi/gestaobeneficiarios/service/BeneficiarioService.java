package br.gov.dataprev.dapi.gestaobeneficiarios.service;

import br.gov.dataprev.dapi.gestaobeneficiarios.model.Beneficiario;
import br.gov.dataprev.dapi.gestaobeneficiarios.repository.BeneficiarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeneficiarioService {

    private final BeneficiarioRepository repository;

    public List<Beneficiario> listarTodos() {
        return repository.findAll();
    }

    public Beneficiario buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beneficiário não encontrado com id: " + id));
    }

    @Transactional
    public Beneficiario criar(Beneficiario beneficiario) {
        if (repository.existsByCpf(beneficiario.getCpf())) {
            throw new RuntimeException("Já existe um beneficiário com o CPF: " + beneficiario.getCpf());
        }
        return repository.save(beneficiario);
    }

    @Transactional
    public Beneficiario atualizar(Long id, Beneficiario dados) {
        Beneficiario existente = buscarPorId(id);

        if (repository.existsByCpfAndIdNot(dados.getCpf(), id)) {
            throw new RuntimeException("CPF já cadastrado para outro beneficiário: " + dados.getCpf());
        }

        existente.setNome(dados.getNome());
        existente.setCpf(dados.getCpf());
        existente.setDataNascimento(dados.getDataNascimento());
        existente.setSituacao(dados.getSituacao());

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Beneficiário não encontrado com id: " + id);
        }
        repository.deleteById(id);
    }
}

