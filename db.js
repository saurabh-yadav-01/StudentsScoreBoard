// db.js
const { Leaderboard, Student, initializeDatabase } = require('./models');

// Initialize database on server start
initializeDatabase();

module.exports = {
    Leaderboard,
    Student
};
