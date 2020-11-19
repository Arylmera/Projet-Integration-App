CREATE DATABASE `menura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `utilisateurs` (
  `idutilisateurs` varchar(30) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `actif` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idutilisateurs`),
  UNIQUE KEY `idutilisateurs_UNIQUE` (`idutilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `capteurs` (
  `macAddress` varchar(17) NOT NULL,
  `utilisateur` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`macAddress`),
  UNIQUE KEY `macAddress_UNIQUE` (`macAddress`),
  KEY `fk_capteurs_utilisateurs_idx` (`utilisateur`),
  CONSTRAINT `fk_capteurs_utilisateurs` FOREIGN KEY (`utilisateur`) REFERENCES `utilisateurs` (`idutilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `oiseaux` (
  `idoiseaux` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(75) NOT NULL,
  `espece` varchar(75) DEFAULT NULL,
  `details` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`idoiseaux`),
  UNIQUE KEY `nom_UNIQUE` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `historiques` (
  `idhistoriques` int NOT NULL AUTO_INCREMENT,
  `oiseau` varchar(75) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `localisation` varchar(45) DEFAULT NULL,
  `capteur` varchar(17) DEFAULT NULL,
  PRIMARY KEY (`idhistoriques`),
  KEY `fk_historiques_capteurs_idx` (`capteur`),
  KEY `fk_historiques_oiseaux_idx` (`oiseau`),
  CONSTRAINT `fk_historiques_capteurs` FOREIGN KEY (`capteur`) REFERENCES `capteurs` (`macAddress`),
  CONSTRAINT `fk_historiques_oiseaux` FOREIGN KEY (`oiseau`) REFERENCES `oiseaux` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

