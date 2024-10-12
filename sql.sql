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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anakelimeler`
--

LOCK TABLES `anakelimeler` WRITE;
/*!40000 ALTER TABLE `anakelimeler` DISABLE KEYS */;
INSERT INTO `anakelimeler` VALUES (1,1,'Welcome Season',1,0,0),(2,1,'Super Season',1,0,0),(3,1,'Welcome Part',1,1,0),(4,1,'Contiune Part',1,2,0),(5,1,'Speed Part',1,1,0),(6,1,'Job Part',1,1,0),(7,1,'Good Part',1,1,0),(8,1,'Business Part',1,2,0),(9,1,'Computer',1,1,1),(10,1,'Keyboard',1,1,1),(11,1,'Mouse',1,1,1),(12,1,'Phone',1,1,1),(13,1,'Data',1,3,1),(14,1,'Path',1,3,1),(15,1,'Access ',1,3,1),(16,1,'Application ',1,3,1),(17,1,'Algorithm',1,4,1),(18,1,'Data Structure',1,4,1),(19,1,'Compiler',1,4,1),(20,1,'Database',1,4,1),(21,1,'Network',1,5,1),(22,1,'Software Engineering',1,5,1),(23,1,'Debugging',1,5,1),(24,1,'Protocol',1,5,1),(25,1,'Continuation Season',1,0,0),(26,1,'Variable ',1,2,1),(27,1,'Loop ',1,2,1),(28,1,'Abstraction ',1,2,1),(29,1,'Class ',1,2,1),(30,1,'Interface ',1,6,1),(31,1,'Backend ',1,6,1),(32,1,'Frontend ',1,6,1),(33,1,'Machine Learning',1,6,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceviriler`
--

LOCK TABLES `ceviriler` WRITE;
/*!40000 ALTER TABLE `ceviriler` DISABLE KEYS */;
INSERT INTO `ceviriler` VALUES (1,1,2,1,'Hosgeldin Sezonu'),(2,1,2,2,'Süper Sezon'),(3,1,2,3,'Hosgeldin Bölümü'),(4,1,2,4,'Devam Bölümü'),(5,1,2,5,'Hız Bölümü'),(6,1,2,6,'Meslek Bölümü'),(7,1,2,7,'İyi Bölüm'),(8,1,2,8,'İş Bölümü'),(9,1,2,9,'Bilgisayar'),(10,1,2,10,'Klavye '),(11,1,2,11,'Fare'),(12,1,2,12,'Telefon'),(13,1,2,13,'Veri'),(14,1,2,14,'Yol'),(15,1,2,15,'Erişim'),(16,1,2,16,'Uygulama'),(17,1,2,17,'Algoritma'),(18,1,2,18,'Veri Yapısı'),(19,1,2,19,'Derleyici'),(20,1,2,20,'Veri Tabanı'),(21,1,2,21,'Ağ'),(22,1,2,22,'Yazılım Mühendisi'),(23,1,2,23,'Hata Ayıklayıcı'),(24,1,2,24,'Protokol'),(25,1,2,25,'Devam Sezonu'),(26,1,2,26,'Değişken'),(27,1,2,27,'Döngü'),(28,1,2,28,'Soyutlama'),(29,1,2,29,'Sınıf'),(30,1,2,30,'Arayüz'),(31,1,2,31,'Arka Yüz'),(32,1,2,32,'Ön Yüz'),(33,1,2,33,'Makine Öğrenimi');
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilenbolumler`
--

LOCK TABLES `gecilenbolumler` WRITE;
/*!40000 ALTER TABLE `gecilenbolumler` DISABLE KEYS */;
INSERT INTO `gecilenbolumler` VALUES (62,124,1),(63,124,3),(64,132,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilensezonlar`
--

LOCK TABLES `gecilensezonlar` WRITE;
/*!40000 ALTER TABLE `gecilensezonlar` DISABLE KEYS */;
/*!40000 ALTER TABLE `gecilensezonlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gunlukgiris`
--

DROP TABLE IF EXISTS `gunlukgiris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gunlukgiris` (
  `GunlukGirisID` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `SozlukGiris` tinyint DEFAULT NULL,
  PRIMARY KEY (`GunlukGirisID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gunlukgiris`
--

LOCK TABLES `gunlukgiris` WRITE;
/*!40000 ALTER TABLE `gunlukgiris` DISABLE KEYS */;
INSERT INTO `gunlukgiris` VALUES (23,124,'2024-10-12',1),(24,124,'2024-10-11',NULL),(25,127,'2024-10-12',NULL),(26,128,'2024-10-12',NULL),(27,132,'2024-10-12',1);
/*!40000 ALTER TABLE `gunlukgiris` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici`
--

LOCK TABLES `kullanici` WRITE;
/*!40000 ALTER TABLE `kullanici` DISABLE KEYS */;
INSERT INTO `kullanici` VALUES (101,'NurihanK','01c96beddb172095388e43835bdb7145',NULL,2,NULL,'nnk123',NULL,NULL,NULL,NULL),(108,'NurihanK31','e35cf7b66449df565f93c607d5a81d09',NULL,NULL,NULL,'nrhnASD',NULL,NULL,NULL,NULL),(109,'nunu','2f8c3ab806a42e79c774cb09b41a53c8',NULL,NULL,NULL,'nunu',NULL,NULL,NULL,NULL),(114,'nk123','25f9e794323b453885f5181f1b624d0b',NULL,NULL,NULL,'nurihan@gmail.com',NULL,NULL,NULL,NULL),(115,'nurihankavalcı','14bdff06ee49403514e698d9a45c4533',NULL,NULL,NULL,'kavalcinurihan@gmail.com','a9b7ba70783b617e9998dc4dd82eb3c5','b8c37e33defde51cf91e1e03e51657da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJudXJpaGFua2F2YWxjxLEiLCJlbWFpbCI6ImthdmFsY2ludXJpaGFuQGdtYWlsLmNvbSIsImlhdCI6MTcwMjEzMDMzMCwiZXhwIjoxNzAyMTMwMzkwfQ.IvG8O78aDmslJFBjDxLFPk6lKwQA5L_RtzLkRmI73vE',NULL),(117,'4545','1f6419b1cbe79c71410cb320fc094775',1,NULL,NULL,'45454',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE3LCJpYXQiOjE3MjM2MzUxNjksImV4cCI6MTcyMzYzNTE5OX0.YbCem3sGVathYM81A3EpRfQTHv61Fv1cUmp75KcecIQ',NULL),(118,'454545','a684eceee76fc522773286a895bc8436',1,NULL,NULL,'54545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4LCJpYXQiOjE3MjM2MzUxOTIsImV4cCI6MTcyMzYzNTIyMn0.VPw36PEfWD-bLz6W3lihXo9mZOWU_O79E_OLF6N_pwQ',NULL),(119,'45455','e44fea3bec53bcea3b7513ccef5857ac',1,NULL,NULL,'545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJpYXQiOjE3MjM2MzUzMjgsImV4cCI6MTcyMzYzNTM1OH0.GD9b5-FZm4xWMNRT8JS8FzD4zOc_ncwaRZfF-e67jbc',NULL),(120,'2432423','d41d8cd98f00b204e9800998ecf8427e',4,NULL,NULL,'4234',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMCIsImlhdCI6MTcyMzYzNjM0MiwiZXhwIjoxNzIzNjM2MzcyfQ.RAHOg7zHNjM3DZ9YgyDtGMWPSk_y7dckhwDFQadzygk',NULL),(121,'6767','d41d8cd98f00b204e9800998ecf8427e',1,NULL,1,'6767',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxLCJpYXQiOjE3MjM2MzY1ODAsImV4cCI6MTcyMzYzNjYxMH0.rwmz1Gy1EYXJC9-tkGwyATEJLDotmeBF6w5ErOFPVgE',NULL),(122,'dsdsd','d41d8cd98f00b204e9800998ecf8427e',1,NULL,8,'sdsd',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE3MjM2MzY5MzQsImV4cCI6MTcyMzYzNjk2NH0.8gErje_d1QdpZIVvAfB3ctxyqA0MrlVq62ls138n0RE',NULL),(123,'121321','d41d8cd98f00b204e9800998ecf8427e',1,1,9,'3231',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcyMzYzNzMzOCwiZXhwIjoxNzIzNjM3MzY4fQ.il8mKkPAg1eFxnu9hXqMTcIeZbtJ4cCjUC6vzk9T4QU',NULL),(124,'12','c20ad4d76fe97759aa27a0c99bff6710',1,1,2,'121',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3Mjg3MzY3MjMsImV4cCI6MTcyODczNjc1M30.3u0P_iMK-gEiRvQ3eJE-hwkqx-fEIKGBJ_kxr29wjNw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3Mjg3MzY3MjMsImV4cCI6MTcyODczNzMyM30.bN1Sm17EVDozqmoB58I0dvEWJ2L71xRuu_mfOy0jcaI'),(125,'mahir','202cb962ac59075b964b07152d234b70',1,NULL,2,'123',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTIzOX0.DAKnXZ84bafmrknNEWFApY0i5NZctt9s3XCl3OBk098','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTgwOX0.t1MrgLFk7z74y72yyMHc4cV9-eyibjYSosRuVWyQMk8'),(126,'11','6512bd43d9caa6e02c990b0a82652dca',1,NULL,NULL,'11',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3Mjg3MzU0OTIsImV4cCI6MTcyODczNTUyMn0.BRbpoTqvh_qx0KN1AkVqPYRBa_S6mp-GUJh3S8i7mpI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3Mjg3MzU0OTIsImV4cCI6MTcyODczNjA5Mn0.Gt20_1Yqxq6sZmU-hmEebhE4656dEV8FzMy_Q3H2IEU'),(127,'111','698d51a19d8a121ce581499d7b701668',1,1,2,'111',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNTU4M30.VkFb1aodRlfomWePEe1s7tvPkH607Bspxx2YsgIcIZg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNjE1M30.EssoHi-8lCdAKYeoDVPngKTVAIVIS6vwA1M-OfOmLgM'),(128,'3','eccbc87e4b5ce2fe28308fd9f2a7baf3',1,1,2,'3',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNTc1N30.I2aqCvjcEscQSFO3R2No6fSbBItQC8o749zcyR2YaDw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNjMyN30.WklNGZdCGo3bmd-mLfjZ9YUjjc78VYF6nnBMKS8BJtQ'),(129,'67','735b90b4568125ed6c3f678819b6e058',NULL,NULL,NULL,'67',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjAzNX0.yVvTuBROi4dve49ZZ8e71JRHK3vDVZfpRs76KhkQQ7E','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjYwNX0.pXumsc4iHJTFhu7s1Fjt-pb8D5XLR5p9cJueo5VggVk'),(130,'a','0cc175b9c0f1b6a831c399e269772661',1,1,2,'a',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjA5OH0.lhBK4rZwbd6VBAMUQ13IBMYKTNlKGOSNnZ6cSXKaWWY','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjY2OH0.cVKA3XMwJMVsE1MJTIhbaEwZTk1lsgcbVvWudxIUgV0'),(131,'nh','86e41e046990daf7e850f49eb2d5a64d',1,1,2,'nh',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNjU0NH0.HIDRREyoCerDT7cCz8i_tAdQxPCDPoHIJnlQ7fhzxvw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNzExNH0.IufSGZQL0rs9zCkRShvuysO_1CP-DmFbqt00fKIbsYI'),(132,'aa','4124bc0a9335c27f086f24ba207a4912',1,1,2,'aa',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMiIsImlhdCI6MTcyODczNjc5MSwiZXhwIjoxNzI4NzM2ODIxfQ.HUsv6CEbbzVptqIgCdA2EGzqrIwAYIyAHb0C9eMlYgo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMyLCJpYXQiOjE3Mjg3MzY3NDUsImV4cCI6MTcyODczNzM0NX0.8uHQwe7ovBiwpPvCYCjtBjPMc9MYQtcapuS0AnjhKL0');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sozluk`
--

LOCK TABLES `sozluk` WRITE;
/*!40000 ALTER TABLE `sozluk` DISABLE KEYS */;
INSERT INTO `sozluk` VALUES (9,124,9),(11,124,11),(12,NULL,NULL),(13,NULL,NULL),(14,NULL,NULL),(15,NULL,NULL),(16,124,16),(17,124,15),(18,124,12),(20,124,33),(21,132,13),(22,132,15);
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

-- Dump completed on 2024-10-12 15:41:42
