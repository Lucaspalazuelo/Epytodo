CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE IF NOT EXISTS 'user' (
    'id' INT NOT NULL AUTO_INCREMENT,
    'email' varchar(255) NOT NULL UNIQUE,
    'password' varchar(255) NOT NULL,
    'name' varchar(255) NOT NULL,
    'firstname' varchar(255) NOT NULL,
    'created_at' datetime DEFAULT current_timestamp(),
    PRIMARY KEY('id')
);

CREATE TABLE IF NOT EXISTS 'todo' (
    'id' INT NOT NULL AUTO_INCREMENT,
    'title' varchar(255) NOT NULL,
    'description' varchar(255) NOT NULL,
    'created_at' datetime DEFAULT current_timestamp(),
    'due_time' datetime DEFAULT,
    'status' ENUM('not started', 'todo', 'in progress,' 'done') DEFAULT 'not started',
    'user_id' INT UNSIGNED NOT NULL,
    PRIMARY KEY('id')
);
