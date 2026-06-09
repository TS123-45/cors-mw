create database preflightdb;

use preflightdb;

CREATE TABLE viewtable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT,
  city VARCHAR(100)
);

INSERT INTO viewtable (name, age, city)
VALUES
('Tony', 20, 'Chennai'),
('Ravi', 25, 'Mumbai'),
('Priya', 22, 'Delhi');

SELECT * FROM viewtable;

