-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Insert sample data
INSERT INTO users (username, email) VALUES 
  ('john_doe', 'john@example.com'),
  ('jane_smith', 'jane@example.com');