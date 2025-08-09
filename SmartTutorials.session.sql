
-- Insert one leaderboard
INSERT INTO leaderboards (pin, title)
VALUES ('555555', 'Smart Study Classes Toppers');

-- Insert 10 students for the same leaderboard pin
INSERT INTO students (leaderboard_pin, name, subject, obtained_marks, total_marks, percentage, rank_position)
VALUES
('555555', 'Alice Johnson', 'Mathematics', 95, 100, 95.00, 1),
('555555', 'Brian Smith', 'Mathematics', 92, 100, 92.00, 2),
('555555', 'Catherine Lee', 'Mathematics', 89, 100, 89.00, 3),
('555555', 'David Brown', 'Mathematics', 87, 100, 87.00, 4),
('555555', 'Emily Davis', 'Mathematics', 85, 100, 85.00, 5),
('555555', 'Frank Wilson', 'Mathematics', 82, 100, 82.00, 6),
('555555', 'Grace Miller', 'Mathematics', 80, 100, 80.00, 7),
('555555', 'Henry Taylor', 'Mathematics', 78, 100, 78.00, 8),
('555555', 'Isabella Moore', 'Mathematics', 76, 100, 76.00, 9),
('555555', 'Jack Anderson', 'Mathematics', 74, 100, 74.00, 10);


