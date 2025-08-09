-- Leaderboards table
CREATE TABLE leaderboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pin VARCHAR(6) UNIQUE NOT NULL,
    title VARCHAR(255) DEFAULT 'Smart Study Classes Toppers',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    leaderboard_pin VARCHAR(6),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    obtained_marks INT NOT NULL,
    total_marks INT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    rank_position INT NOT NULL,
    FOREIGN KEY (leaderboard_pin) REFERENCES leaderboards(pin)
);
