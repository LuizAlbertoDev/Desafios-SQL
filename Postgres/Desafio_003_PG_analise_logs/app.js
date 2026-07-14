// Desafio 003 - Análise de Logs (PostgreSQL)
//
// Usando a tabela "logs" já populada, escreva 3 queries:
// 1. Buscar apenas os logs com nivel = 'erro'
// 2. Contar quantos logs existem de cada nível (GROUP BY)
// 3. Listar todos os logs ordenados do mais recente para o mais antigo
//
// Objetivo: praticar queries de análise de dados/logs, habilidade
// pedida em vagas de suporte/desenvolvimento júnior.

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

    const resultadoNivel = await pool.query(
        "SELECT * FROM logs WHERE nivel = 'erro'"
    );

    console.table(resultadoNivel.rows);

    const resultadoGrupo = await pool.query(`
        SELECT nivel, COUNT(*) AS total
        FROM logs
        GROUP BY nivel
    `);

    console.table(resultadoGrupo.rows);

    const resultadoOrdemData = await pool.query(`
        SELECT *
        FROM logs
        ORDER BY criado_em DESC
    `);

    console.table(resultadoOrdemData.rows);

    await pool.end();
}
main()