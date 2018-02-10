-- MySQL Script generated by MySQL Workbench
-- Fri Jan 12 00:39:09 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mainDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mainDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mainDB` DEFAULT CHARACTER SET utf8 ;
USE `mainDB` ;

-- -----------------------------------------------------
-- Table `mainDB`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mainDB`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(15) NOT NULL,
  `Password` VARCHAR(15) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Surname` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `LoggedIn` TINYINT NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mainDB`.`Album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mainDB`.`Album` (
  `idAlbum` INT NOT NULL AUTO_INCREMENT,
  `Users_idUsers` INT NOT NULL,
  PRIMARY KEY (`idAlbum`),
  INDEX `fk_Album_Users1_idx` (`Users_idUsers` ASC),
  CONSTRAINT `fk_Album_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `mainDB`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mainDB`.`Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mainDB`.`Posts` (
  `idPosts` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(45) NOT NULL,
  `Users_idUsers` INT NOT NULL,
  `likes` INT NOT NULL,
  `date` DATE NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `info` LONGTEXT NOT NULL,
  `Album_idAlbum` INT NULL,
  PRIMARY KEY (`idPosts`),
  INDEX `fk_Pictures_Users_idx` (`Users_idUsers` ASC),
  INDEX `fk_Pictures_Album1_idx` (`Album_idAlbum` ASC),
  CONSTRAINT `fk_Pictures_Users`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `mainDB`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pictures_Album1`
    FOREIGN KEY (`Album_idAlbum`)
    REFERENCES `mainDB`.`Album` (`idAlbum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mainDB`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mainDB`.`Comments` (
  `idComments` INT NOT NULL AUTO_INCREMENT,
  `Content` LONGTEXT NOT NULL,
  `Users_idUsers` INT NOT NULL,
  `Posts_idPosts` INT NOT NULL,
  PRIMARY KEY (`idComments`),
  INDEX `fk_Comments_Users1_idx` (`Users_idUsers` ASC),
  INDEX `fk_Comments_Pictures1_idx` (`Posts_idPosts` ASC),
  CONSTRAINT `fk_Comments_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `mainDB`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_Pictures1`
    FOREIGN KEY (`Posts_idPosts`)
    REFERENCES `mainDB`.`Posts` (`idPosts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
