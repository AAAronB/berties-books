--Create database script for Berties books

--Create the database
CREATE DATABASE myBookshop;
USE myBookshop;

--Create the tables
CREATE TABLE books (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));
CREATE TABLE users (id INT AUTO_INCREMENT,first_name VARCHAR(50),last_name VARCHAR(50),email VARCHAR(50),PRIMARY KEY(email));
--Create the app user and give it access to the database
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myBookshop.* TO 'appuser'@'localhost';

