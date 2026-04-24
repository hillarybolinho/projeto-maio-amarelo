const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria o arquivo do banco de dados se ele não existir
const dbPath = path.join(__dirname, 'banco_projeto.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS resultados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        pontuacao INTEGER,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("🗄️  Tabela de resultados pronta para salvar os dados!");
});

module.exports = db;