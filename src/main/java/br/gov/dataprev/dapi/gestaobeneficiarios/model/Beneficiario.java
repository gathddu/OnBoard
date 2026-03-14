package br.gov.dataprev.dapi.gestaobeneficiarios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "beneficiarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Beneficiario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos numéricos")
    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @NotNull(message = "Data de nascimento é obrigatória")
    @Past(message = "Data de nascimento deve ser uma data passada")
    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @NotNull(message = "Situação é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Situacao situacao;

    public enum Situacao {
        ATIVO, INATIVO
    }
}

