const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS usuarios;
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL
    )    
`)

const inserir = db.prepare(`INSERT INTO usuarios (nome,email) VALUES (?,?)`)

inserir.run(`Luiz`,`luiz@gmail.com`)
inserir.run(`Stefani`,`stefani@gmail.com`)
inserir.run(`Gregory`,`gregory@gmail.com`)
inserir.run(`Maite`,`maite@gmail.com`)
inserir.run(`Celia`,`celia@gmail.com`)

const usuario = db.prepare(`SELECT * FROM usuarios ORDER BY nome ASC LIMIT 2`).all()

console.log(usuario)

const usuarioTest = db.prepare(`
    SELECT * 
    FROM usuarios 
    ORDER BY nome DESC
`).all()

console.log(usuarioTest)
