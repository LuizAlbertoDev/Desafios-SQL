const Database = require(`better-sqlite3`)
const db = new Database(`../banco.db`)

db.exec(`
    DROP TABLE IF EXISTS usuarios;
    CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
    );
    DROP TABLE IF EXISTS pedidos;
    CREATE TABLE IF NOT EXISTS pedidos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    produto TEXT NOT NULL
    ) 
`)

const inserirUsuario = db.prepare(`INSERT INTO usuarios (nome)VALUES(?)`)
const inserirPedido = db.prepare(`INSERT INTO pedidos (usuario_id,produto)VALUES(?,?)`)

inserirUsuario.run(`Luiz`)
inserirUsuario.run(`Stefani`)
inserirUsuario.run(`Maite`)

inserirPedido.run(`1`,`Teclado`)
inserirPedido.run(`2`,`Mouse`)
inserirPedido.run(`3`,`Monitor`)


const resultado = db.prepare(`SELECT usuarios.nome,pedidos.produto FROM pedidos JOIN usuarios ON pedidos.usuario_id = usuarios.id`).all()

console.log(resultado)