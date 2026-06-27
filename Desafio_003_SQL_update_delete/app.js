const Database = require('better-sqlite3')
const db = new Database ('../banco.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL
    )
`)

const inserir = db.prepare(`INSERT INTO usuarios (nome,email) VALUES (?,?)`)

inserir.run(`luiz`,`luiz@gmail.com`)
inserir.run(`maria`,`maria@gmail.com`)
inserir.run(`jose`,`jose@gmail.com`)

db.prepare(`UPDATE usuarios set nome = 'Stefani' WHERE id = 1`).run()

db.prepare(`DELETE FROM usuarios WHERE id = 3`).run()

const usuario = db.prepare(`SELECT * FROM usuarios`).all()

console.log(usuario)