// Desafio 004 - Filtros Combinados (PostgreSQL)
//
// Usando a tabela "logs" já populada, escreva 3 queries:
// 1. Buscar logs que sejam nivel = 'erro' E contenham a palavra "banco" na mensagem
// 2. Buscar logs que sejam nivel = 'erro' OU nivel = 'aviso'
// 3. Buscar logs criados na última 1 hora
//
// Objetivo: praticar combinação de condições (AND/OR), busca parcial (LIKE)
// e filtro por intervalo de tempo — comum em análise de logs no dia a dia.

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafios_sql',
    password: 'postgres123',
    port: 5432
});

async function main() {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            nivel TEXT NOT NULL,
            mensagem TEXT NOT NULL,
            criado_em TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `);

    console.log('Tabela criada!');

    await pool.query(
        `INSERT INTO logs (nivel, mensagem) VALUES ($1, $2)`,
        ['info', 'Usuário realizou login com sucesso']
    );

    await pool.query(
        `INSERT INTO logs (nivel, mensagem) VALUES ($1, $2)`,
        ['aviso', 'Tentativa de acesso sem permissão']
    );

    await pool.query(
        `INSERT INTO logs (nivel, mensagem) VALUES ($1, $2)`,
        ['erro', 'Falha ao conectar ao banco de dados']
    );

    const resultadoAND = await pool.query(
        "SELECT * FROM logs WHERE nivel = 'erro' AND mensagem LIKE '%banco%'"
    );

    console.table(resultadoAND.rows);

    const resultadoOR = await pool.query(
        "SELECT * FROM logs WHERE nivel = 'erro' OR nivel = 'aviso'"
    );

    console.table(resultadoOR.rows);

    const resultadoFiltroHora = await pool.query(
        "SELECT * FROM logs WHERE criado_em >= NOW() - INTERVAL '1 hour'"
    );

    console.table(resultadoFiltroHora.rows);

    await pool.end();
}
main()