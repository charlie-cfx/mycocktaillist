DROP DATABASE IF EXISTS `mycocktaillist`;

CREATE DATABASE `mycocktaillist`;

USE `mycocktaillist`;

-- -------------------------------------------------------
-- CREATING TABLES
-- -------------------------------------------------------
-- CREATING COLORS TABLE

-- CREATING USERS TABLE
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `picture_url` LONGTEXT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING FAVORITE TABLE
DROP TABLE IF EXISTS `favorite`;

CREATE TABLE IF NOT EXISTS `favorite` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT,
    `cocktail_id` INT NOT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -------------------------------------------------------
-- CREATING FOREIGN KEYS
-- -------------------------------------------------------
-- USER
ALTER TABLE
    `favorite`
ADD
    CONSTRAINT `fk_user_favorite` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
