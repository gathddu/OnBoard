CREATE TABLE IF NOT EXISTS beneficiarios (
    id              BIGSERIAL       PRIMARY KEY,
    nome            VARCHAR(100)    NOT NULL,
    cpf             VARCHAR(11)     NOT NULL UNIQUE,
    data_nascimento DATE            NOT NULL,
    situacao        VARCHAR(10)     NOT NULL CHECK (situacao IN ('ATIVO', 'INATIVO'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_beneficiarios_cpf ON beneficiarios (cpf);

