// server.js
const express = require('express');
const app = express();
const { Leaderboard, Student } = require('./db');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to create/download leaderboard with data and auto-generated PIN
app.post('/api/leaderboard', async (req, res) => {
    try {
        const { pin, students } = req.body;
        
        // Create leaderboard
        const leaderboard = await Leaderboard.create({
            pin: pin,
            title: 'Smart Study Classes Toppers'
        });

        // Create students with ranks
        const studentRecords = students.map((student, index) => ({
            leaderboard_pin: pin,
            name: student.name,
            subject: student.subject,
            obtained_marks: student.obtainedMarks,
            total_marks: student.totalMarks,
            percentage: student.percentage,
            rank_position: index + 1
        }));

        await Student.bulkCreate(studentRecords);

        res.json({ 
            success: true, 
            pin: pin 
        });
    } catch (error) {
        console.error('Error creating leaderboard:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error creating leaderboard' 
        });
    }
});

// Endpoint to retrieve leaderboard by PIN
app.get('/api/leaderboard/:pin', async (req, res) => {
    try {
        const { pin } = req.params;
        
        const leaderboard = await Leaderboard.findOne({
            where: { pin },
            include: [{
                model: Student,
                order: [['rank_position', 'ASC']]
            }]
        });

        if (!leaderboard) {
            return res.status(404).json({ 
                success: false, 
                error: 'Leaderboard not found' 
            });
        }

        const processedStudents = leaderboard.students.map(student => ({
            name: student.name,
            subject: student.subject,
            obtainedMarks: student.obtained_marks,
            totalMarks: student.total_marks,
            percentage: parseFloat(student.percentage),
            originalIndex: student.rank_position - 1
        }));

        res.json({
            success: true,
            data: {
                pin: leaderboard.pin,
                title: leaderboard.title,
                students: processedStudents,
                created_at: leaderboard.created_at
            }
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error fetching leaderboard' 
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
