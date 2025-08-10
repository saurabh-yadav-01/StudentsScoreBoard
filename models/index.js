const { Sequelize } = require('sequelize');

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
Leaderboard.hasMany(Student, { foreignKey: 'leaderboard_pin', sourceKey: 'pin' });
Student.belongsTo(Leaderboard, { foreignKey: 'leaderboard_pin', targetKey: 'pin' });

// Sync database
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database successfully.');
        
        // Sync all models
        await sequelize.sync({ force: false });
        console.log('Database tables created successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    Leaderboard,
    Student,
    initializeDatabase
};
