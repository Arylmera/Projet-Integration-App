CREATE DATABASE `menura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `capteurs` (
  `numeroSerie` int NOT NULL,
  `utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`numeroSerie`),
  KEY `fk_capteurs_utilisateurs_idx` (`utilisateur`),
  CONSTRAINT `fk_capteurs_utilisateurs` FOREIGN KEY (`utilisateur`) REFERENCES `utilisateurs` (`idutilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `historiques` (
  `idhistoriques` int NOT NULL AUTO_INCREMENT,
  `oiseau` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `localisation` varchar(45) DEFAULT NULL,
  `capteur` int DEFAULT NULL,
  PRIMARY KEY (`idhistoriques`),
  KEY `fk_historiques_oiseaux_idx` (`oiseau`),
  KEY `fk_historiques_capteurs_idx` (`capteur`),
  CONSTRAINT `fk_historiques_capteurs` FOREIGN KEY (`capteur`) REFERENCES `capteurs` (`numeroSerie`),
  CONSTRAINT `fk_historiques_oiseaux` FOREIGN KEY (`oiseau`) REFERENCES `oiseaux` (`idoiseaux`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `oiseaux` (
  `idoiseaux` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(75) DEFAULT NULL,
  `espece` varchar(75) DEFAULT NULL,
  `details` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`idoiseaux`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `utilisateurs` (
  `idutilisateurs` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idutilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
