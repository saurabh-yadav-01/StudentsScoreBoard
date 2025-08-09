// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // or your DB host
    user: 'Students_Scores',
    password: 'root',
    database: 'SmartTutorials'
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});

module.exports = connection;
