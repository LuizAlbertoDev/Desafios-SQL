const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS produtos;
    CREATE TABLE IF NOT EXISTS produtos(
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    categoria TEXT NOT NULL
    )    
`)

const inserir = db.prepare(`INSERT INTO produtos (nome,preco,categoria) VALUES(?,?,?)`)

inserir.run(`Feijao`,`6.99`,`Mercearia`)
inserir.run(`Arroz`,`10.99`,`Mercearia`)
inserir.run(`Macarrao`,`3.99`,`Mercearia`)
inserir.run(`Farinha`,`4.99`,`Mercearia`)
inserir.run(`Coca`,`3.99`,`Bebidas`)
inserir.run(`Fanta`,`4.99`,`Bebidas`)

const totalProdutos = db.prepare(`SELECT COUNT(*) as quantidade_Total FROM produtos`).all()

console.log(totalProdutos)

const valorTotal = db.prepare(`SELECT SUM(preco) as valor_Total FROM produtos`).all()

console.log(valorTotal)

const quantidadeCategoria = db.prepare(`
    SELECT categoria, 
    COUNT(*) as quantidade 
    FROM produtos 
    GROUP BY categoria
`).all()

console.log(quantidadeCategoria)