const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE customers (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)`);
module.exports = db;
