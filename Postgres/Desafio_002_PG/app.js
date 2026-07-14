const { Pool } = require('pg');

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
        );
    `);

    console.log('Tabela criada!');

    await pool.query(
        `INSERT INTO logs (nivel, mensagem)
        VALUES ($1, $2)`,
        ['info', 'Usuário realizou login com sucesso']
    );

    await pool.query(
        `INSERT INTO logs (nivel, mensagem)
        VALUES ($1, $2)`,
        ['aviso', 'Tentativa de acesso sem permissão']
    );

    await pool.query(
        `INSERT INTO logs (nivel, mensagem)
        VALUES ($1, $2)`,
        ['erro', 'Falha ao conectar ao banco de dados']
    );

    const resultado = await pool.query(
        'SELECT * FROM logs'
    );

    console.table(resultado.rows);

    await pool.end();
}

main();