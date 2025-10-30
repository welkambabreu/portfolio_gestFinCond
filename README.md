# API Gestão Financeira de Condomínio

## Descrição
API REST para gestão financeira de condomínios, permitindo cadastro e consulta de usuários, despesas, receitas e resumo da conta principal. Utiliza Express, autenticação JWT e banco de dados em memória.

## Funcionalidades
- Cadastro, alteração e busca de usuários (admin/comum, ativo/inativo)
- Login por email e senha (gera token JWT)
- Cadastro, alteração e consulta de despesas
- Cadastro, alteração e consulta de receitas
- Resumo da conta principal com cálculo automático
- Autenticação JWT (admin pode tudo, comum só consulta)
- Documentação Swagger disponível em `/api-docs`

## Estrutura do Projeto
```
src/
  app.js
  controllers/
    authController.js
    expenseController.js
    revenueController.js
    summaryController.js
    userController.js
  database/
    inMemoryDb.js
  middlewares/
    authMiddleware.js
  resources/
    swagger.yaml
  routes/
    authRoutes.js
    expenseRoutes.js
    revenueRoutes.js
    summaryRoutes.js
    userRoutes.js
  services/
    expenseService.js
    revenueService.js
    summaryService.js
    userService.js
server.js
README.md
package.json
```

## Instalação
1. Instale as dependências:
   ```bash
   npm install express jsonwebtoken cors
   ```
2. Inicie a API:
   ```bash
   node server.js
   ```

## Endpoints Principais
Consulte a documentação Swagger em `/api-docs` para detalhes dos endpoints, modelos e códigos de erro.

## Autenticação
- Realize login em `/auth/login` para obter o token JWT
- Envie o token no header `Authorization: Bearer <token>` para acessar endpoints protegidos
- Cadastro de usuário não exige token

## Observações
- Todos os dados são armazenados em memória (reiniciar o servidor apaga os dados)
- O primeiro saldo do mês anterior deve ser informado manualmente no resumo

## Licença
MIT