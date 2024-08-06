CREATE TABLE IF NOT EXISTS leaderBoard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    date_of_visit DATE DEFAULT CURRENT_DATE,  -- Auto-generated date
    time_of_visit TIME DEFAULT CURRENT_TIME,  -- Auto-generated time
    score INTEGER
);