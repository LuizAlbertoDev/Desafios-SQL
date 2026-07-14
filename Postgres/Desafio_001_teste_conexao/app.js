const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafios_sql',
    password: 'postgres123',
    port: 5432
})

async function main() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `)

    console.log('Tabela criada!')

    await pool.query(
        'INSERT INTO usuarios (nome, email) VALUES ($1, $2)',
        ['Luiz Alberto', 'luiz@email.com']
    )

    const resultado = await pool.query('SELECT * FROM usuarios')

    console.log(resultado.rows)

    await pool.end()
}

main()