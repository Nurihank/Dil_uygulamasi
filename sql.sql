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
-- Table structure for table `anakelimeler`
--

DROP TABLE IF EXISTS `anakelimeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anakelimeler` (
  `AnaKelimelerID` int NOT NULL AUTO_INCREMENT,
  `DilID` int DEFAULT NULL,
  `Value` varchar(45) DEFAULT NULL,
  `MeslekID` int DEFAULT NULL,
  `BolumID` int DEFAULT NULL,
  `test` tinyint DEFAULT NULL,
  PRIMARY KEY (`AnaKelimelerID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anakelimeler`
--

LOCK TABLES `anakelimeler` WRITE;
/*!40000 ALTER TABLE `anakelimeler` DISABLE KEYS */;
INSERT INTO `anakelimeler` VALUES (1,1,'Welcome Season',1,0,0),(2,1,'Super Season',1,0,0),(3,1,'Welcome Part',1,1,0),(4,1,'Contiune Part',1,2,0),(5,1,'Speed Part',1,1,0),(6,1,'Job Part',1,1,0),(7,1,'Good Part',1,1,0),(8,1,'Business Part',1,2,0),(9,1,'Computer',1,1,1),(10,1,'Keyboard',1,1,1),(11,1,'Mouse',1,1,1),(12,1,'Phone',1,1,1),(13,1,'Data',1,3,1),(14,1,'Path',1,3,1),(15,1,'Access ',1,3,1),(16,1,'Application ',1,3,1),(17,1,'Algorithm',1,4,1),(18,1,'Data Structure',1,4,1),(19,1,'Compiler',1,4,1),(20,1,'Database',1,4,1),(21,1,'Network',1,5,1),(22,1,'Software Engineering',1,5,1),(23,1,'Debugging',1,5,1),(24,1,'Protocol',1,5,1),(25,1,'Continuation Season',1,0,0);
/*!40000 ALTER TABLE `anakelimeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bolum`
--

DROP TABLE IF EXISTS `bolum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bolum` (
  `BolumID` int NOT NULL AUTO_INCREMENT,
  `SezonID` int DEFAULT NULL,
  `CeviriID` int DEFAULT NULL,
  `Order` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BolumID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolum`
--

LOCK TABLES `bolum` WRITE;
/*!40000 ALTER TABLE `bolum` DISABLE KEYS */;
INSERT INTO `bolum` VALUES (1,1,3,'1'),(2,2,4,'1'),(3,1,5,'2'),(4,1,6,'3'),(5,1,7,'4'),(6,2,8,'2');
/*!40000 ALTER TABLE `bolum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ceviriler`
--

DROP TABLE IF EXISTS `ceviriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ceviriler` (
  `CevirilerID` int NOT NULL AUTO_INCREMENT,
  `AnaDilID` int DEFAULT NULL,
  `HangiDilID` int DEFAULT NULL,
  `AnaKelimeID` int DEFAULT NULL,
  `Ceviri` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`CevirilerID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceviriler`
--

LOCK TABLES `ceviriler` WRITE;
/*!40000 ALTER TABLE `ceviriler` DISABLE KEYS */;
INSERT INTO `ceviriler` VALUES (1,1,2,1,'Hosgeldin Sezonu'),(2,1,2,2,'Süper Sezon'),(3,1,2,3,'Hosgeldin Bölümü'),(4,1,2,4,'Devam Bölümü'),(5,1,2,5,'Hız Bölümü'),(6,1,2,6,'Meslek Bölümü'),(7,1,2,7,'İyi Bölüm'),(8,1,2,8,'İş Bölümü'),(9,1,2,9,'Bilgisayar'),(10,1,2,10,'Klavye '),(11,1,2,11,'Fare'),(12,1,2,12,'Telefon'),(13,1,2,13,'Veri'),(14,1,2,14,'Yol'),(15,1,2,15,'Erişim'),(16,1,2,16,'Uygulama'),(17,1,2,17,'Algoritma'),(18,1,2,18,'Veri Yapısı'),(19,1,2,19,'Derleyici'),(20,1,2,20,'Veri Tabanı'),(21,1,2,21,'Ağ'),(22,1,2,22,'Yazılım Mühendisi'),(23,1,2,23,'Hata Ayıklayıcı'),(24,1,2,24,'Protokol'),(25,1,2,25,'Devam Sezonu');
/*!40000 ALTER TABLE `ceviriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dil`
--

DROP TABLE IF EXISTS `dil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dil` (
  `DilID` int NOT NULL AUTO_INCREMENT,
  `DilAdi` varchar(45) DEFAULT NULL,
  `LocalName` varchar(45) DEFAULT NULL,
  `ISO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`DilID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dil`
--

LOCK TABLES `dil` WRITE;
/*!40000 ALTER TABLE `dil` DISABLE KEYS */;
INSERT INTO `dil` VALUES (1,'English','English','en'),(2,'Turkish','Türkçe','tr'),(3,'French','Français','fr'),(4,'German','Deutsch','de'),(5,'Spanish','Español','es'),(6,'Italian','Italiano','it'),(7,'Chinese','中文','zh'),(8,'Japanese','日本語','ja'),(9,'Russian','Русский','ru'),(10,'Arabic','العربية','ar');
/*!40000 ALTER TABLE `dil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gecilenbolumler`
--

DROP TABLE IF EXISTS `gecilenbolumler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gecilenbolumler` (
  `GecilenBolumlerID` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `BolumID` int DEFAULT NULL,
  PRIMARY KEY (`GecilenBolumlerID`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilenbolumler`
--

LOCK TABLES `gecilenbolumler` WRITE;
/*!40000 ALTER TABLE `gecilenbolumler` DISABLE KEYS */;
INSERT INTO `gecilenbolumler` VALUES (56,124,1);
/*!40000 ALTER TABLE `gecilenbolumler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gecilensezonlar`
--

DROP TABLE IF EXISTS `gecilensezonlar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gecilensezonlar` (
  `GecilenSezonID` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `SezonID` int DEFAULT NULL,
  PRIMARY KEY (`GecilenSezonID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilensezonlar`
--

LOCK TABLES `gecilensezonlar` WRITE;
/*!40000 ALTER TABLE `gecilensezonlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `gecilensezonlar` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici`
--

LOCK TABLES `kullanici` WRITE;
/*!40000 ALTER TABLE `kullanici` DISABLE KEYS */;
INSERT INTO `kullanici` VALUES (101,'NurihanK','01c96beddb172095388e43835bdb7145',NULL,2,NULL,'nnk123',NULL,NULL,NULL,NULL),(108,'NurihanK31','e35cf7b66449df565f93c607d5a81d09',NULL,NULL,NULL,'nrhnASD',NULL,NULL,NULL,NULL),(109,'nunu','2f8c3ab806a42e79c774cb09b41a53c8',NULL,NULL,NULL,'nunu',NULL,NULL,NULL,NULL),(114,'nk123','25f9e794323b453885f5181f1b624d0b',NULL,NULL,NULL,'nurihan@gmail.com',NULL,NULL,NULL,NULL),(115,'nurihankavalcı','14bdff06ee49403514e698d9a45c4533',NULL,NULL,NULL,'kavalcinurihan@gmail.com','a9b7ba70783b617e9998dc4dd82eb3c5','b8c37e33defde51cf91e1e03e51657da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJudXJpaGFua2F2YWxjxLEiLCJlbWFpbCI6ImthdmFsY2ludXJpaGFuQGdtYWlsLmNvbSIsImlhdCI6MTcwMjEzMDMzMCwiZXhwIjoxNzAyMTMwMzkwfQ.IvG8O78aDmslJFBjDxLFPk6lKwQA5L_RtzLkRmI73vE',NULL),(117,'4545','1f6419b1cbe79c71410cb320fc094775',1,NULL,NULL,'45454',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE3LCJpYXQiOjE3MjM2MzUxNjksImV4cCI6MTcyMzYzNTE5OX0.YbCem3sGVathYM81A3EpRfQTHv61Fv1cUmp75KcecIQ',NULL),(118,'454545','a684eceee76fc522773286a895bc8436',1,NULL,NULL,'54545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4LCJpYXQiOjE3MjM2MzUxOTIsImV4cCI6MTcyMzYzNTIyMn0.VPw36PEfWD-bLz6W3lihXo9mZOWU_O79E_OLF6N_pwQ',NULL),(119,'45455','e44fea3bec53bcea3b7513ccef5857ac',1,NULL,NULL,'545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJpYXQiOjE3MjM2MzUzMjgsImV4cCI6MTcyMzYzNTM1OH0.GD9b5-FZm4xWMNRT8JS8FzD4zOc_ncwaRZfF-e67jbc',NULL),(120,'2432423','d41d8cd98f00b204e9800998ecf8427e',4,NULL,NULL,'4234',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMCIsImlhdCI6MTcyMzYzNjM0MiwiZXhwIjoxNzIzNjM2MzcyfQ.RAHOg7zHNjM3DZ9YgyDtGMWPSk_y7dckhwDFQadzygk',NULL),(121,'6767','d41d8cd98f00b204e9800998ecf8427e',1,NULL,1,'6767',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxLCJpYXQiOjE3MjM2MzY1ODAsImV4cCI6MTcyMzYzNjYxMH0.rwmz1Gy1EYXJC9-tkGwyATEJLDotmeBF6w5ErOFPVgE',NULL),(122,'dsdsd','d41d8cd98f00b204e9800998ecf8427e',1,NULL,8,'sdsd',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE3MjM2MzY5MzQsImV4cCI6MTcyMzYzNjk2NH0.8gErje_d1QdpZIVvAfB3ctxyqA0MrlVq62ls138n0RE',NULL),(123,'121321','d41d8cd98f00b204e9800998ecf8427e',1,1,9,'3231',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcyMzYzNzMzOCwiZXhwIjoxNzIzNjM3MzY4fQ.il8mKkPAg1eFxnu9hXqMTcIeZbtJ4cCjUC6vzk9T4QU',NULL),(124,'12','c20ad4d76fe97759aa27a0c99bff6710',1,1,2,'121',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3Mjg0ODMzMzMsImV4cCI6MTcyODQ4MzM2M30.hjhIzTLEGNKYLlE2PkVygoF8NlHd-n_cb6vm9hlWzB0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3Mjg0ODMzMzMsImV4cCI6MTcyODQ4MzkzM30.JIQRS0BALiLP5YCVNwJN7yd1u2u9TxWqhTFNZxM5p_s');
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
-- Table structure for table `seviye`
--

DROP TABLE IF EXISTS `seviye`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seviye` (
  `SeviyeID` int NOT NULL AUTO_INCREMENT,
  `SeviyeAdi` varchar(45) DEFAULT NULL,
  `Order` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SeviyeID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seviye`
--

LOCK TABLES `seviye` WRITE;
/*!40000 ALTER TABLE `seviye` DISABLE KEYS */;
INSERT INTO `seviye` VALUES (1,'A1','1'),(2,'A2','2'),(3,'B1','3'),(4,'B2','4'),(5,'C1','5'),(6,'C2','6');
/*!40000 ALTER TABLE `seviye` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sezon`
--

DROP TABLE IF EXISTS `sezon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sezon` (
  `SezonID` int NOT NULL AUTO_INCREMENT,
  `SeviyeID` int DEFAULT NULL,
  `CeviriID` varchar(45) DEFAULT NULL,
  `Order` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SezonID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sezon`
--

LOCK TABLES `sezon` WRITE;
/*!40000 ALTER TABLE `sezon` DISABLE KEYS */;
INSERT INTO `sezon` VALUES (1,1,'1','1'),(2,1,'2','2'),(3,1,'25','3');
/*!40000 ALTER TABLE `sezon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sozluk`
--

DROP TABLE IF EXISTS `sozluk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sozluk` (
  `SozlukID` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `AnaKelimeID` int DEFAULT NULL,
  PRIMARY KEY (`SozlukID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sozluk`
--

LOCK TABLES `sozluk` WRITE;
/*!40000 ALTER TABLE `sozluk` DISABLE KEYS */;
INSERT INTO `sozluk` VALUES (9,124,9),(10,124,10),(11,124,11),(12,NULL,NULL),(13,NULL,NULL),(14,NULL,NULL),(15,NULL,NULL),(16,124,16),(17,124,15),(18,124,12),(19,124,13);
/*!40000 ALTER TABLE `sozluk` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 17:25:15
