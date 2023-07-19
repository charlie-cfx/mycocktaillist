DROP DATABASE IF EXISTS `mycocktailslist`;

CREATE DATABASE `mycocktailslist`;

USE `mycocktailslist`;

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
    `user_id` INT NOT NULL,
    `cocktail_id` INT NOT NULL,
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

-- -------------------------------------------------------
-- ADDING CONTENT
-- -------------------------------------------------------
-- USERS
INSERT INTO
    `user` (
        `firstname`,
        `lastname`,
        `email`,
        `password`,
        `picture_url`
    )
VALUES
    (
        'Cédric',
        'Palacio-Vidal',
        'cedric.palacio@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$4PxtA5qNt2r39SyKbo2kaQ$24kugoP+Kh+xzTTFDJdYxYR/hDfAT3By+wIQtepQy8U',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/cedric_wxfm8y.jpg'
    ),
    (
        'Alain',
        'Bide',
        'almasyser@wanadoo.fr',
        '$argon2id$v=19$m=65536,t=5,p=1$vUAPptBxVfStgTgdirr6rA$bN4GbdqV3kkqICI7aiXkaDmqGA6qcYqZNcU3X2xp41c',
        null
    ),
    (
        'Mehdi',
        'Berbedj',
        'berbedj.mehdi@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$sFLuxVkfaF1+XG630y1VzQ$mZLbG8GWw6O3Fx0qUipFIHrmuRVktm2Cy5178IRbjOI',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/mehdi_zv4kmk.png'
    ),
    (
        'Charlie',
        'Feix',
        'charlie.feix@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$f/fZo3zl1ksKvFkAlef5bg$JJADFRcFiEi/GG1pNgPx44ci4hXEUzp6XXmcdX+EU/M',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/charlie_vppxgf.jpg'
    );