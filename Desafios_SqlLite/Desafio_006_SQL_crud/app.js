const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS produtos;
    CREATE TABLE IF NOT EXISTS produtos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL
    )
`)

const inserir = db.prepare(`INSERT INTO produtos (nome,preco,quantidade) VALUES (?,?,?)`)

inserir.run(`Feijao`,`6.99`,`5`)
inserir.run(`Arroz`,`10.99`,`1`)
inserir.run(`Macarrao`,`3.99`,`5`)
inserir.run(`Leite`,`4.99`,`12`)

const produtosOrdenados = db.prepare(`SELECT * FROM produtos ORDER BY preco ASC`).all()

console.log(produtosOrdenados)

db.prepare(`UPDATE produtos SET preco = '29.99' WHERE id = 2`).run()

db.prepare(`DELETE FROM produtos WHERE id = 4`).run()

const produtosAtualizados = db.prepare(`SELECT * FROM produtos`).all()

console.log(produtosAtualizados)