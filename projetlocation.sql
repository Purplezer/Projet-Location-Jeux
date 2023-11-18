-- MariaDB dump 10.19-11.1.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: projetlocation
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeux` (
  `id_jeu` int(11) NOT NULL AUTO_INCREMENT,
  `nom_jeu` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `prix` int(11) NOT NULL,
  PRIMARY KEY (`id_jeu`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES
(1,'Celeste','https://upload.wikimedia.org/wikipedia/commons/0/0f/Celeste_box_art_full.png',5),
(2,'Elden Ring','https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',5),
(3,'Outer Wilds','https://upload.wikimedia.org/wikipedia/en/f/f6/Outer_Wilds_Steam_artwork.jpg',10),
(4,'Crysis','https://upload.wikimedia.org/wikipedia/en/e/e9/Crysis_Cover.jpg',10),
(5,'Darkest Dungeon','https://upload.wikimedia.org/wikipedia/en/8/8d/Darkest_Dungeon_Logo.png',15),
(6,'Darkest Dungeon II','https://upload.wikimedia.org/wikipedia/en/a/ab/Darkest_Dungeon_II_cover_art.jpg',15),
(7,'Mass Effect: Legendary Edition','https://upload.wikimedia.org/wikipedia/en/9/97/Mass_Effect_Legendary_Edition.jpeg',20),
(8,'Resident Evil: Village','https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png',20),
(9,'The Binding of Isaac','https://upload.wikimedia.org/wikipedia/en/f/fa/Binding_of_isaac_header.jpg',25),
(10,'The Sims 4','https://upload.wikimedia.org/wikipedia/en/7/7f/Sims4_Rebrand.png',25);
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `id_jeu` int(11) DEFAULT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `date_location` date DEFAULT NULL,
  `date_retour` date DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_location`),
  KEY `id_jeu` (`id_jeu`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`id_jeu`) REFERENCES `jeux` (`id_jeu`),
  CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES
(1,'Théo','theo@mail.com','$2b$10$Y9jEgzIALSYy0bL6CsD6reppg95REgSTJguZ.ul4R23T/R6joD90C'),
(2,'Alexandre','alexandre@mail.com','$2b$10$mac72Fz2HsrpyvJJXYJD4uSp0yt2qB.gmDHJlBICjDRwfq7u7nEq.'),
(12,'Noémie','noemie@caramail.fr','$2b$10$U/Jw0IwDmh1GQ9pcQan8ZOdAl58YcVM2aExcFEm8oNvWNBo.mOVMq');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 20:03:38
