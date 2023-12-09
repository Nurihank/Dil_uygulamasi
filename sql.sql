-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dil_uygulamasi
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idadmin` int NOT NULL AUTO_INCREMENT,
  `kullaniciAdi` varchar(45) DEFAULT NULL,
  `sifre` varchar(45) DEFAULT NULL,
  `accesToken` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idadmin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','14bdff06ee49403514e698d9a45c4533','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJhZG1pbiIsImlhdCI6MTcwMTg1MTY1MSwiZXhwIjoxNzAxODUyMjUxfQ.FTru8xkGXTa4FsJ3HUUaK3PGVwNQKgRWjF9ZCOiQAlE','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJhZG1pbiIsImlhdCI6MTcwMTg1MTY1MSwiZXhwIjoxNzAxODU4ODUxfQ.hdcc3ofZ2YxOJzdAjsTAM8MfsWUJZcbsOSLFf1Cs9r0');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dil`
--

DROP TABLE IF EXISTS `dil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dil_adi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dil`
--

LOCK TABLES `dil` WRITE;
/*!40000 ALTER TABLE `dil` DISABLE KEYS */;
INSERT INTO `dil` VALUES (1,'Turkce'),(2,'Ingilizce'),(3,'Almanca'),(4,'Arapça'),(5,'Fransızca');
/*!40000 ALTER TABLE `dil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dil_ceviri`
--

DROP TABLE IF EXISTS `dil_ceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dil_ceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dil_id` int DEFAULT NULL,
  `ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dil_ceviri`
--

LOCK TABLES `dil_ceviri` WRITE;
/*!40000 ALTER TABLE `dil_ceviri` DISABLE KEYS */;
/*!40000 ALTER TABLE `dil_ceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori` varchar(45) DEFAULT NULL,
  `meslek_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'kolay',4),(2,'kolay',3),(3,'kolay',3);
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori_ceviri`
--

DROP TABLE IF EXISTS `kategori_ceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori_ceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori_id` int DEFAULT NULL,
  `dil_id` int DEFAULT NULL,
  `ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_ceviri`
--

LOCK TABLES `kategori_ceviri` WRITE;
/*!40000 ALTER TABLE `kategori_ceviri` DISABLE KEYS */;
/*!40000 ALTER TABLE `kategori_ceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelime`
--

DROP TABLE IF EXISTS `kelime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori_id` int DEFAULT NULL,
  `kelime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelime`
--

LOCK TABLES `kelime` WRITE;
/*!40000 ALTER TABLE `kelime` DISABLE KEYS */;
INSERT INTO `kelime` VALUES (1,2,'bilgisayar'),(2,1,'uçak'),(3,3,'yazılım');
/*!40000 ALTER TABLE `kelime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelime_ceviri`
--

DROP TABLE IF EXISTS `kelime_ceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelime_ceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kelime_id` int DEFAULT NULL,
  `dil_id` int DEFAULT NULL,
  `ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelime_ceviri`
--

LOCK TABLES `kelime_ceviri` WRITE;
/*!40000 ALTER TABLE `kelime_ceviri` DISABLE KEYS */;
/*!40000 ALTER TABLE `kelime_ceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanici`
--

DROP TABLE IF EXISTS `kullanici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kullanici` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kullaniciAdi` varchar(45) NOT NULL,
  `şifre` varchar(255) NOT NULL,
  `MeslekID` int DEFAULT NULL,
  `SectigiDilID` int DEFAULT NULL,
  `DilID` int DEFAULT NULL,
  `email` varchar(90) NOT NULL,
  `forgetPasswordToken` varchar(255) DEFAULT NULL,
  `changePasswordToken` varchar(255) DEFAULT NULL,
  `accesToken` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici`
--

LOCK TABLES `kullanici` WRITE;
/*!40000 ALTER TABLE `kullanici` DISABLE KEYS */;
INSERT INTO `kullanici` VALUES (101,'NurihanK','01c96beddb172095388e43835bdb7145',NULL,2,NULL,'nnk123',NULL,NULL,NULL,NULL),(108,'NurihanK31','e35cf7b66449df565f93c607d5a81d09',NULL,NULL,NULL,'nrhnASD',NULL,NULL,NULL,NULL),(109,'nunu','2f8c3ab806a42e79c774cb09b41a53c8',NULL,NULL,NULL,'nunu',NULL,NULL,NULL,NULL),(114,'nk123','25f9e794323b453885f5181f1b624d0b',NULL,NULL,NULL,'nurihan@gmail.com',NULL,NULL,NULL,NULL),(115,'nurihankavalcı','14bdff06ee49403514e698d9a45c4533',NULL,NULL,NULL,'kavalcinurihan@gmail.com','a9b7ba70783b617e9998dc4dd82eb3c5','b8c37e33defde51cf91e1e03e51657da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJudXJpaGFua2F2YWxjxLEiLCJlbWFpbCI6ImthdmFsY2ludXJpaGFuQGdtYWlsLmNvbSIsImlhdCI6MTcwMjEzMDMzMCwiZXhwIjoxNzAyMTMwMzkwfQ.IvG8O78aDmslJFBjDxLFPk6lKwQA5L_RtzLkRmI73vE',NULL);
/*!40000 ALTER TABLE `kullanici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meslek`
--

DROP TABLE IF EXISTS `meslek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meslek` (
  `idMeslek` int NOT NULL AUTO_INCREMENT,
  `meslek` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idMeslek`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meslek`
--

LOCK TABLES `meslek` WRITE;
/*!40000 ALTER TABLE `meslek` DISABLE KEYS */;
INSERT INTO `meslek` VALUES (1,'Bilgisayar Mühendisi'),(2,'Ogretmen'),(3,'İnşaat Mühendisi'),(4,'Pilot');
/*!40000 ALTER TABLE `meslek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meslek_ceviri`
--

DROP TABLE IF EXISTS `meslek_ceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meslek_ceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meslek_id` int DEFAULT NULL,
  `dil_id` int DEFAULT NULL,
  `ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meslek_ceviri`
--

LOCK TABLES `meslek_ceviri` WRITE;
/*!40000 ALTER TABLE `meslek_ceviri` DISABLE KEYS */;
/*!40000 ALTER TABLE `meslek_ceviri` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-09 17:20:01
