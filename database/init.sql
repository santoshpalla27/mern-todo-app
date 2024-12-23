-- database/init.sql
CREATE TABLE sample_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);

INSERT INTO sample_data (value) VALUES ('Hello, World!');
INSERT INTO sample_data (value) VALUES ('Welcome to the Three-Tier App!');
