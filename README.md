# Gestão de Beneficiários
API REST para o gerenciamento de beneficiários.

## Stack

- Java | 17
- Spring Boot | 3.4.1
- Spring Data JPA | 3.4.1
- Hibernate | 6.6.x
- PostgreSQL | 17.5
- springdoc-openapi | 2.x
- Maven | 3.x

## Pré-Requisitos

- JDK 17
- Maven 3.6+ (ou usar o wrapper `./mvnw` incluído no projeto)
- PostgreSQL 14+

## Configuração do Banco de Dados

Crie o banco de dados e o usuário no PostgreSQL:

```sql
CREATE DATABASE gestao_beneficiarios;
CREATE USER dataprev_user WITH ENCRYPTED PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE gestao_beneficiarios TO dataprev_user;
```

Para criar a tabela manualmente (o Hibernate cria automaticamente na inicialização):

```bash
psql -U dataprev_user -d gestao_beneficiarios -f src/main/resources/db/schema.sql
```

Para inserie dados de exemplo:

```bash
psql -U dataprev_user -d gestao_beneficiarios -f src/main/resources/db/data.sql
```

## Configurações da Aplicação

Copie o arquivo de exemplo e preencha com suas credenciais locais:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Edite `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5432/
gestao_beneficiarios
spring.datasource.username=dataprev_user
spring.datasource.password=sua_senha
```

## Executando a Aplicação

```bash
./mvnw spring-boot:run
```

A aplicação sobe na porta `8081` por padrão.

## Documentação da API

Com a aplicação em execução, acesse o Swagger UI:

```
http://localhost:01/swagger-ui.html
```

O JSON da especificação OpenAPI está em:

```
http://localhost:8081/api-docs
```

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/beneficiarios` | Lista todos os beneficiários |
| `GET` | `/api/beneficiarios/{id}` | Busca beneficiário por ID |
| `POST` | `/api/beneficiarios` | Cadastra novo beneficiário |
| `PUT` | `/api/beneficiarios/{id}` | Atualiza beneficiário existente |
| `DELETE` | `/api/beneficiarios/{id}` | Remove beneficiário |

### Exemplo de Payload

```json
{
  "nome": "João da Silva",
  "cpf": "52998224725",
  "dataNascimento": 1990-05-15",
  "situacao": "ATIVO"
}
```

### Campos

| Campo | Tipo | Obrigatório | Regras |
|---|---|---|---|
| `nome` | `string` | Sim | Máximo 100 caracteres |
| `cpf` | `string` | Sim | 11 dígitos, CPF válido, único no sistema |
| `dataNascimento` | `date` | Sim | Formato `YYYY-MM-DD` |
| `situacao` | `string` | Sim | `ATIVO` ou `INATIVO` |

## Exemplos com curl

**Listar todos:**
```bash
curl http://localhost:8081/api/beneficiarios
```

**Buscar por ID:**
```bash
curl http://localhost:8081/api/beneficiarios/1
```

**Cadastrar:**
```bash
curl -X POST http://localhost:8081/api/beneficiarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João da Silva",
    "cpf": "52998224725",
    "dataNascimento": "1990-05-15",
    "situacao": "ATIVO"
  }'
```

**Atualizar:**
```bash
curl -X PUT http://localhost:8081/api/beneficiarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João da Silva Santos",
    "cpf": "52998224725",
    "dataNascimento": "1990-05-15",
    "situacao": "INATIVO"
  }'
```

**Deletar:**
```bash
curl -X DELETE http://localhost:8081/api/beneficiarios/1
```

## Estrutura do projeto

```
src/
└── main/
    ├── java/br/gov/dataprev/dapi/gestaobeneficiarios/
    │   ├── GestaoBeneficiariosApplication.java   # Ponto de entrada
    │   ├── controller/
    │   │   └── BeneficiarioController.java       # Endpoints REST
    │   ├── service/
    │   │   └── BeneficiarioService.java          # Regras de negócio
    │   ├── repository/
    │   │   └── BeneficiarioRepository.java       # Acesso ao banco
    │   └── model/
    │       └── Beneficiario.java                 # Entidade JPA
    └── resources/
        ├── application.properties                # Configuração local (não versionado)
        ├── application.properties.example        # Template de configuração
        └── db/
            ├── schema.sql                        # DDL da tabela
            └── data.sql                          # Dados de exemplo
```

## Ambiente de Desenvolvimento (NixOS)
O projeto inclui um `flake.nix` com o ambiente de desenvolvimento reproduzível:

```bash
nix develop
```

Isso disponibiliza JDK 17, Maven e o cliente PostgreSQL no shell.
