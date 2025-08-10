// server.js
import express from 'express';
import { Leaderboard, Student } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to create/download leaderboard with data and auto-generated PIN
app.post('/api/leaderboard', async (req, res) => {
    try {
        console.log('Received request to create leaderboard:', req.body);
        const { pin, students } = req.body;
        
        if (!pin || !students || !Array.isArray(students) || students.length === 0) {
            console.error('Invalid request data:', { pin, studentsLength: students?.length });
            return res.status(400).json({
                success: false,
                error: 'Invalid request data'
            });
        }

        console.log('Creating leaderboard with PIN:', pin);
        
        // Create leaderboard
        const leaderboard = await Leaderboard.create({
            pin: pin,
            title: 'Smart Study Classes Toppers'
        });
        console.log('Leaderboard created:', leaderboard.toJSON());

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

        console.log('Creating student records:', studentRecords);
        const createdStudents = await Student.bulkCreate(studentRecords, {
            returning: true
        });
        console.log('Created students:', createdStudents.map(s => s.toJSON()));

        // Verify the created data
        const verification = await Leaderboard.findOne({
            where: { pin },
            include: [{
                model: Student,
                order: [['rank_position', 'ASC']]
            }]
        });

        console.log('Verification result:', verification?.toJSON());

        if (!verification) {
            throw new Error('Data verification failed after creation');
        }

        res.json({ 
            success: true, 
            pin: pin,
            message: `Successfully created leaderboard with ${createdStudents.length} students`
        });
    } catch (error) {
        console.error('Error creating leaderboard:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Error creating leaderboard'
        });
    }
});

// Endpoint to retrieve leaderboard by PIN
app.get('/api/leaderboard/:pin', async (req, res) => {
    try {
        const { pin } = req.params;
        console.log('Fetching leaderboard for PIN:', pin);
        
        // First find the leaderboard
        const leaderboard = await Leaderboard.findOne({
            where: { pin },
            include: [{
                model: Student
            }]
        });

        if (!leaderboard) {
            console.log('No leaderboard found for PIN:', pin);
            return res.status(404).json({ 
                success: false, 
                error: 'Leaderboard not found' 
            });
        }

        console.log('Found leaderboard:', leaderboard.toJSON());

        // Sort students by rank_position
        const sortedStudents = [...leaderboard.students].sort((a, b) => a.rank_position - b.rank_position);
        
        const processedStudents = sortedStudents.map(student => ({
            name: student.name,
            subject: student.subject,
            obtainedMarks: student.obtained_marks,
            totalMarks: student.total_marks,
            percentage: parseFloat(student.percentage),
            originalIndex: student.rank_position - 1
        }));

        console.log('Processed students:', processedStudents);

        const response = {
            success: true,
            data: {
                pin: leaderboard.pin,
                title: leaderboard.title,
                students: processedStudents,
                created_at: leaderboard.created_at
            }
        };

        console.log('Sending response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        console.error('Error details:', error.message);
        if (error.original) {
            console.error('Database error:', error.original);
        }
        res.status(500).json({ 
            success: false, 
            error: 'Error fetching leaderboard',
            details: error.message 
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
