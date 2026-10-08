# Desafios SQL

Coleção de exercícios de bancos de dados feita durante os estudos de programação. O conteúdo está dividido em duas trilhas: SQLite e PostgreSQL.

## Tecnologias

- SQL
- SQLite, com a biblioteca `better-sqlite3`
- PostgreSQL, com a biblioteca `pg`
- Node.js

## Estrutura

```text
Desafios-SQL/
├── Desafios_SqlLite/
│   ├── Desafio_001_SQL_intro/
│   ├── Desafio_002_SQL_where/
│   └── ... (até o desafio 010)
└── Postgres/
    ├── Desafio_001_teste_conexao/
    ├── ... (até o desafio 005)
    └── package.json
```

A trilha SQLite inclui criação de tabelas, inserção, consultas, filtros, atualizações, exclusões, ordenação, agregações e relacionamentos. A trilha PostgreSQL registra exercícios de conexão e consultas.

## Execução dos exercícios

Cada exercício possui seu próprio arquivo. Para o primeiro exercício SQLite, entre na pasta correspondente e instale `better-sqlite3` antes da execução:

```bash
cd Desafios_SqlLite/Desafio_001_SQL_intro
npm install better-sqlite3
node app.js
```

Esse comando cria arquivos locais de dependências na pasta; não é necessário enviá-los ao GitHub.

Para os exercícios PostgreSQL, instale as dependências da pasta `Postgres/` com `npm install`, configure um banco local para os scripts que exigem conexão e execute o `app.js` correspondente.

## Objetivo

Praticar modelagem e consultas SQL. Este é um histórico de exercícios, não um serviço de banco de dados em produção.

[Perfil no GitHub](https://github.com/LuizAlbertoDev)
