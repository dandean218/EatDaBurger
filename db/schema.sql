CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR (300),
    devoured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
)