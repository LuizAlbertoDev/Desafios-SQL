const Database = require('better-sqlite3')

const db = new Database('banco.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL
    )
`)

console.log('Banco criado!')

const inserir = db.prepare('INSERT INTO usuarios (nome, email) VALUES (?, ?)')

inserir.run('Luiz Alberto', 'luiz@email.com')
inserir.run('Maria Silva', 'maria@email.com')

const usuarios = db.prepare('SELECT * FROM usuarios').all()

usuarios.forEach(u => {
    console.log(`${u.id} - ${u.nome} - ${u.email}`)
})