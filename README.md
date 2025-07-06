# AcmeSistemaCliente

Este repositório contém o frontend do sistema de cadastro de pacientes e registro de tratamentos, desenvolvido como parte de um processo seletivo para desenvolvedor trainee.

## Contexto

O objetivo deste projeto é prover uma interface web amigável para o sistema de cadastro de pacientes e registro de tratamentos, consumindo a API fornecida pelo backend ([AcmeSistemaServidor](https://github.com/bigparty1/AcmeSistemaServidor)). Com ele, é possível realizar as operações de cadastro, edição e consulta de pacientes e seus tratamentos de maneira intuitiva.

## Funcionalidades

- Cadastro, listagem, atualização e remoção de pacientes.
- Registro de tratamentos para pacientes cadastrados.
- Listagem dos tratamentos associados a cada paciente.
- Validação básica dos dados inseridos.
- Integração completa com a API RESTful do backend.
- Interface responsiva e de fácil utilização.

## Tecnologias Utilizadas

- **Linguagem:** JavaScript (ES6+)
- **Framework:** React
- **Gerenciador de pacotes:** npm
- **HTTP Client:** fetch API
- **Estilização:** CSS Modules
- **Controle de rotas:** React Router Dom

### Principais Dependências

- `react`
- `react-dom`
- `react-router-dom`
- `axios` (caso utilizado)
- (Adicionar outras dependências relevantes do projeto)

## Como executar

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/bigparty1/acme-sistema-cliente.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd acme-sistema-cliente
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```

4. **Configure a URL da API Backend:**
   - Edite o arquivo `.env` ou equivalente, caso exista, para apontar para a URL do backend (`REACT_APP_API_URL=http://localhost:5000`).

5. **Execute o projeto:**
   ```bash
   npm start
   ```

6. **Acesse no navegador:**
   - O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
src/
├── components/
├── pages/
├── services/
├── routes/
├── App.js
├── index.js
└── ...
```

> A estrutura pode variar, ajuste conforme o padrão adotado no projeto.

## Integração com o Backend

Este projeto consome a API RESTful disponibilizada pelo [AcmeSistemaServidor](https://github.com/bigparty1/AcmeSistemaServidor). Certifique-se de que o backend esteja rodando e acessível na URL configurada antes de utilizar o frontend.

## Contribuição

Este projeto foi desenvolvido para fins avaliativos, mas sugestões e melhorias são bem-vindas!

## Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por [bigparty1](https://github.com/bigparty1) durante processo seletivo para desenvolvedor trainee.
