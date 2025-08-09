// server.js
const express = require('express');
const app = express();
const connection = require('./db');
app.use(express.json());

// Endpoint to create/download leaderboard with data and auto-generated PIN
app.post('/leaderboard', (req, res) => {
    // Parse uploaded data, generate a random 6-digit PIN, and store in DB
    // Insert leaderboard and student data using SQL queries
    // Return the PIN to the client
});

// Endpoint to retrieve leaderboard by PIN
app.get('/leaderboard/:pin', (req, res) => {
    // Fetch leaderboard and related student data from DB using PIN
    // Return JSON to client
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
