import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://neondb_owner:npg_Zy9iEnpdk3Pz@ep-hidden-sea-a1h4l05b-pooler.ap-southeast-1.aws.neon.tech/neondb', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        keepAlive: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

// Define Models
const Leaderboard = sequelize.define('leaderboard', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pin: {
        type: Sequelize.STRING(6),
        unique: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(255),
        defaultValue: 'Smart Study Classes Toppers'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: 'leaderboards'
});

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    leaderboard_pin: {
        type: Sequelize.STRING(6),
        allowNull: false,
        references: {
            model: Leaderboard,
            key: 'pin'
        }
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    obtained_marks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_marks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
    },
    rank_position: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'students'
});

// Set up associations
Leaderboard.hasMany(Student, { 
    foreignKey: 'leaderboard_pin', 
    sourceKey: 'pin',
    onDelete: 'CASCADE'
});
Student.belongsTo(Leaderboard, { 
    foreignKey: 'leaderboard_pin', 
    targetKey: 'pin',
    onDelete: 'CASCADE'
});

// Sync database
async function initializeDatabase() {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database successfully.');
        
        // Force sync in development to ensure clean tables
        await sequelize.sync({ force: true });
        console.log('Database tables recreated successfully.');

        // Verify tables exist and their structure
        const tables = await sequelize.query(
            `SELECT table_name, column_name, data_type 
             FROM information_schema.columns 
             WHERE table_schema = 'public'
             ORDER BY table_name, ordinal_position;`
        );
        console.log('Database structure:', JSON.stringify(tables[0], null, 2));

        // Test table creation by inserting and retrieving a test record
        const testPin = '000000';
        try {
            // Create test leaderboard
            await Leaderboard.create({
                pin: testPin,
                title: 'Test Leaderboard'
            });

            // Create test student
            await Student.create({
                leaderboard_pin: testPin,
                name: 'Test Student',
                subject: 'Test Subject',
                obtained_marks: 90,
                total_marks: 100,
                percentage: 90.00,
                rank_position: 1
            });

            // Verify data
            const testData = await Leaderboard.findOne({
                where: { pin: testPin },
                include: [Student]
            });

            if (testData && testData.students && testData.students.length > 0) {
                console.log('Database initialization successful - test data verified');
                // Clean up test data
                await Leaderboard.destroy({ where: { pin: testPin } });
            } else {
                throw new Error('Test data verification failed');
            }
        } catch (testError) {
            console.error('Database test failed:', testError);
            throw testError;
        }

    } catch (error) {
        console.error('Database initialization failed:', error);
        if (error.original) {
            console.error('Original error:', error.original);
        }
        throw error;
    }
}

export {
    sequelize,
    Leaderboard,
    Student,
    initializeDatabase
};
