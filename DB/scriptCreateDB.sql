
CREATE DATABASE `birdreco` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `utilisateurs` (
  `idutilisateurs` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `mdp` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idutilisateurs`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `capteurs` (
  `idcapteurs` int NOT NULL AUTO_INCREMENT,
  `utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`idcapteurs`),
  KEY `fk_capteurs_utilisateurs_idx` (`utilisateur`),
  CONSTRAINT `fk_capteurs_utilisateurs` FOREIGN KEY (`utilisateur`) REFERENCES `utilisateurs` (`idutilisateurs`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `historiques` (
  `idhistoriques` int NOT NULL AUTO_INCREMENT,
  `oiseau` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `localisation` varchar(45) DEFAULT NULL,
  `capteur` int DEFAULT NULL,
  PRIMARY KEY (`idhistoriques`),
  KEY `fk_historiques_capteurs_idx` (`capteur`),
  CONSTRAINT `fk_historiques_capteurs` FOREIGN KEY (`capteur`) REFERENCES `capteurs` (`idcapteurs`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `oiseaux` (
  `idoiseaux` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(75) DEFAULT NULL,
  `espece` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`idoiseaux`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
