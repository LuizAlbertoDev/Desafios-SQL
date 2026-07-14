const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS clientes;
    CREATE TABLE IF NOT EXISTS clientes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
    );
    DROP TABLE IF EXISTS pedidos;
    CREATE TABLE IF NOT EXISTS pedidos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    produto TEXT NOT NULL,
    preco REAL NOT NULL,
    status TEXT NOT NULL
    )
`)

const inserirClientes = db.prepare(`INSERT INTO clientes (nome,email) VALUES(?,?)`)
const inserirPedidos = db.prepare(`INSERT INTO pedidos (cliente_id,produto,preco,status) VALUES (?,?,?,?)`)

inserirClientes.run(`Luiz`,`Luiz@gmail.com`)
inserirClientes.run(`Stefani`,`Stefani@gmail.com`)
inserirClientes.run(`Maite`,`Maite@gmail.com`)

inserirPedidos.run(`1`,`Teclado`,`399.99`,`entregue`)
inserirPedidos.run(`2`,`Mouse`,`199.99`,`transito`)
inserirPedidos.run(`3`,`Monitor`,`2999.99`,`transito`)
inserirPedidos.run(`2`,`Memoria Ram`,`999.99`,`entregue`)
inserirPedidos.run(`3`,`Placa de Video`,`4999.99`,`cd`)

const totalPedidosClientes = db.prepare(`
    SELECT clientes.nome,pedidos.produto 
    FROM pedidos 
    JOIN clientes ON pedidos.cliente_id = clientes.id
`).all()

console.log(totalPedidosClientes)

const pedidosEntregues = db.prepare(`
    SELECT * 
    FROM pedidos 
    WHERE status = 'entregue'
`).all()

console.log(pedidosEntregues)

const somarTotalGastoPorCliente = db.prepare(`
    SELECT 
        clientes.nome,
        SUM(pedidos.preco) AS total_gasto
    FROM pedidos
    JOIN clientes ON pedidos.cliente_id = clientes.id
    GROUP BY cliente_id  
`).all()

console.log(somarTotalGastoPorCliente)

const produtosOrdenados = db.prepare(`
    SELECT produto
    FROM pedidos
    ORDER BY preco DESC
`).all()

console.log(produtosOrdenados)