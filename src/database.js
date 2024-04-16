// database.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'taskmanager',
    connectionLimit: 10
});

module.exports = { pool };
