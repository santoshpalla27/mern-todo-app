-- db/init/init.sql
CREATE TABLE IF NOT EXISTS mytable (
    id SERIAL PRIMARY KEY,
    data TEXT NOT NULL
);

INSERT INTO mytable (data) VALUES ('Sample data 1');
INSERT INTO mytable (data) VALUES ('Sample data 2');
INSERT INTO mytable (data) VALUES ('Sample data 3');