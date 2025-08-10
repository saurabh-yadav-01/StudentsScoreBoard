// db.js
import { Leaderboard, Student, initializeDatabase } from './models/index.js';

// Initialize database on server start
await initializeDatabase();

export {
    Leaderboard,
    Student
};
