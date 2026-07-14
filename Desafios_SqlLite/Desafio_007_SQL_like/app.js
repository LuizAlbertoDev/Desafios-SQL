const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS produtos;
    CREATE TABLE IF NOT EXISTS produtos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL
    )
`)

const inserir = db.prepare(`INSERT INTO produtos (nome,preco) VALUES (?,?)`)

inserir.run(`Feijao`,`6.99`)
inserir.run(`Arroz`,`10.99`)
inserir.run(`Macarrao`,`3.99`)
inserir.run(`Leite`,`4.99`)
inserir.run(`Pao`,`7.99`)

const nomesComA = db.prepare(`SELECT * FROM produtos WHERE nome LIKE '%a%'`).all()
const nomesComM = db.prepare(`SELECT * FROM produtos WHERE nome LIKE 'M%'`).all()

console.log(nomesComA)
console.log(nomesComM)