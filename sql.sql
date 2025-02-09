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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anakelimeler`
--

LOCK TABLES `anakelimeler` WRITE;
/*!40000 ALTER TABLE `anakelimeler` DISABLE KEYS */;
INSERT INTO `anakelimeler` VALUES (1,1,'Welcome Season',1,0,0),(2,1,'Super Season',1,0,0),(3,1,'Welcome Part',1,0,0),(4,1,'Contiune Part',1,0,0),(5,1,'Speed Part',1,0,0),(6,1,'Job Part',1,0,0),(7,1,'Good Part',1,0,0),(8,1,'Business Part',1,0,0),(9,1,'Computer',1,1,1),(10,1,'Keyboard',1,1,1),(11,1,'Mouse',1,1,1),(12,1,'Phone',1,1,1),(13,1,'Data',1,3,1),(14,1,'Path',1,3,1),(15,1,'Access ',1,3,1),(16,1,'Application ',1,3,1),(17,1,'Algorithm',1,4,1),(18,1,'Data Structure',1,4,1),(19,1,'Compiler',1,4,1),(20,1,'Database',1,4,1),(21,1,'Network',1,5,1),(22,1,'Software Engineering',1,5,1),(23,1,'Debugging',1,5,1),(24,1,'Protocol',1,5,1),(25,1,'Continuation Season',1,0,0),(26,1,'Variable ',1,2,1),(27,1,'Loop ',1,2,1),(28,1,'Abstraction ',1,2,1),(29,1,'Class ',1,2,1),(30,1,'Interface ',1,6,1),(31,1,'Backend ',1,6,1),(32,1,'Frontend ',1,6,1),(33,1,'Machine Learning',1,6,1),(34,1,'Forward Part',1,0,0),(35,1,'Mastery Path Part',1,0,0),(36,1,'Backup ',1,7,1),(37,1,'Network ',1,7,1),(38,1,'Memory ',1,7,1),(39,1,'Storage ',1,7,1),(40,1,'Developer ',1,8,1),(41,1,'Code ',1,8,1),(42,1,'Bug ',1,8,1),(43,1,'Syntax ',1,8,1),(44,1,'Yes Season',1,0,0),(45,1,'Experience Season',1,0,0),(46,1,'Skill Up Season',1,0,0),(47,1,'Ascend Season',1,0,0),(48,1,'Pinnacle Season',1,0,0),(49,1,'Critical Part',1,0,0),(50,1,'Code Part',1,0,0),(51,1,'Digital Part',1,0,0),(52,1,'Success Part',1,0,0),(53,1,'Hashing ',1,9,1),(54,1,'Data Bus',1,9,1),(55,1,'Kernel Mode ',1,9,1),(56,1,'Bitwise Operations',1,9,1),(57,1,'Virtualization ',1,10,1),(58,1,'Race Condition',1,10,1),(59,1,'Namespace ',1,10,1),(60,1,'Multithreading ',1,10,1),(61,1,'Overclocking ',1,11,1),(62,1,'Deadlock ',1,11,1),(63,1,'Firmware ',1,11,1),(64,1,'Microservices ',1,11,1),(65,1,'Rollback ',1,12,1),(66,1,'Lazy Loading ',1,12,1),(67,1,'Machine Code',1,12,1),(68,1,'Buffer Overflow',1,12,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolum`
--

LOCK TABLES `bolum` WRITE;
/*!40000 ALTER TABLE `bolum` DISABLE KEYS */;
INSERT INTO `bolum` VALUES (1,1,3,'1'),(2,2,4,'1'),(3,1,5,'2'),(4,1,6,'3'),(5,1,7,'4'),(6,2,8,'2'),(7,4,35,'1'),(8,4,36,'2'),(9,5,49,'1'),(10,6,50,'1'),(11,7,51,'1'),(12,8,52,'1');
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceviriler`
--

LOCK TABLES `ceviriler` WRITE;
/*!40000 ALTER TABLE `ceviriler` DISABLE KEYS */;
INSERT INTO `ceviriler` VALUES (1,1,2,1,'Hosgeldin Sezonu'),(2,1,2,2,'Süper Sezon'),(3,1,2,3,'Hosgeldin Bölümü'),(4,1,2,4,'Devam Bölümü'),(5,1,2,5,'Hız Bölümü'),(6,1,2,6,'Meslek Bölümü'),(7,1,2,7,'İyi Bölüm'),(8,1,2,8,'İş Bölümü'),(9,1,2,9,'Bilgisayar'),(10,1,2,10,'Klavye '),(11,1,2,11,'Fare'),(12,1,2,12,'Telefon'),(13,1,2,13,'Veri'),(14,1,2,14,'Yol'),(15,1,2,15,'Erişim'),(16,1,2,16,'Uygulama'),(17,1,2,17,'Algoritma'),(18,1,2,18,'Veri Yapısı'),(19,1,2,19,'Derleyici'),(20,1,2,20,'Veri Tabanı'),(21,1,2,21,'Ağ'),(22,1,2,22,'Yazılım Mühendisi'),(23,1,2,23,'Hata Ayıklayıcı'),(24,1,2,24,'Protokol'),(25,1,2,25,'Devam Sezonu'),(26,1,2,26,'Değişken'),(27,1,2,27,'Döngü'),(28,1,2,28,'Soyutlama'),(29,1,2,29,'Sınıf'),(30,1,2,30,'Arayüz'),(31,1,2,31,'Arka Yüz'),(32,1,2,32,'Ön Yüz'),(33,1,2,33,'Makine Öğrenimi'),(34,1,2,44,'Evet Sezonu'),(35,1,2,34,'İleri Bölümü'),(36,1,2,35,'Ustalık\r Bölümü'),(37,1,2,36,'Yedekleme'),(38,1,2,37,'Ağ'),(39,1,2,38,'Bellek'),(40,1,2,39,'Depolama'),(41,1,2,40,'Geliştirici'),(42,1,2,41,'Kod'),(43,1,2,42,'Hata'),(44,1,2,43,'Sözdizimi'),(45,1,2,45,'Deneyim Sezonu'),(46,1,2,46,'Becerilerini Geliştir Sezonu'),(47,1,2,47,'Yükseliş Sezonu'),(48,1,2,48,'Zirve Sezonu'),(49,1,2,49,'Kritik Bölümü'),(50,1,2,50,'Kod'),(51,1,2,51,'Dijital Bölümü'),(52,1,2,52,'Başarı Bölümü'),(53,1,2,53,'Karma fonksiyonu'),(54,1,2,54,'Veri yolu'),(55,1,2,55,'Çekirdek modu'),(56,1,2,56,'Bitwise Operations '),(57,1,2,57,'Sanallaştırma'),(58,1,2,58,'Yarış durumu'),(59,1,2,59,'İsim alanı'),(60,1,2,60,'Çoklu iş parçacığı'),(61,1,2,61,'Hız aşırtma'),(62,1,2,62,'Kilitlenme'),(63,1,2,63,'Gömülü yazılım'),(64,1,2,64,'Mikro hizmetler'),(65,1,2,65,'Geri alma'),(66,1,2,66,'Tembel yükleme'),(67,1,2,67,'Makine kodu'),(68,1,2,68,'Tampon taşması');
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
-- Table structure for table `egzersiz`
--

DROP TABLE IF EXISTS `egzersiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `egzersiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `EgzersizAdi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egzersiz`
--

LOCK TABLES `egzersiz` WRITE;
/*!40000 ALTER TABLE `egzersiz` DISABLE KEYS */;
INSERT INTO `egzersiz` VALUES (1,'Hatalari Gözden Geçir'),(2,'Dinleme'),(3,'Görsel'),(4,'Cümle Çevirisi');
/*!40000 ALTER TABLE `egzersiz` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilenbolumler`
--

LOCK TABLES `gecilenbolumler` WRITE;
/*!40000 ALTER TABLE `gecilenbolumler` DISABLE KEYS */;
INSERT INTO `gecilenbolumler` VALUES (85,124,1);
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
  `Tarih` date DEFAULT NULL,
  PRIMARY KEY (`GecilenSezonID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilensezonlar`
--

LOCK TABLES `gecilensezonlar` WRITE;
/*!40000 ALTER TABLE `gecilensezonlar` DISABLE KEYS */;
INSERT INTO `gecilensezonlar` VALUES (16,124,1,'2025-02-06'),(17,124,2,'2025-02-07'),(18,141,1,'2025-02-07');
/*!40000 ALTER TABLE `gecilensezonlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gecilentemelbolumler`
--

DROP TABLE IF EXISTS `gecilentemelbolumler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gecilentemelbolumler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `GecilenBolumID` int DEFAULT NULL,
  `KategoriID` int DEFAULT NULL,
  `KullaniciID` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilentemelbolumler`
--

LOCK TABLES `gecilentemelbolumler` WRITE;
/*!40000 ALTER TABLE `gecilentemelbolumler` DISABLE KEYS */;
INSERT INTO `gecilentemelbolumler` VALUES (31,1,1,124),(32,2,1,124),(33,7,1,124),(34,3,2,124);
/*!40000 ALTER TABLE `gecilentemelbolumler` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gunlukgiris`
--

LOCK TABLES `gunlukgiris` WRITE;
/*!40000 ALTER TABLE `gunlukgiris` DISABLE KEYS */;
INSERT INTO `gunlukgiris` VALUES (23,124,'2024-10-12',1),(24,124,'2024-10-11',NULL),(25,127,'2024-10-12',NULL),(26,128,'2024-10-12',NULL),(27,132,'2024-10-12',1),(28,134,'2024-10-14',1),(29,126,'2024-12-07',1),(30,124,'2024-12-07',1),(34,124,'2024-12-06',NULL),(35,124,'2024-12-04',NULL),(36,124,'2025-01-10',0),(37,124,'2025-01-14',0),(38,124,'2025-01-13',NULL),(39,124,'2025-01-15',0),(40,135,'2025-01-15',NULL),(41,124,'2025-01-16',0),(42,124,'2025-01-17',0),(43,124,'2025-01-20',0),(44,126,'2025-01-20',NULL),(45,124,'2025-01-21',0),(46,124,'2025-02-05',NULL),(51,124,'2025-02-06',1),(52,124,'2025-02-07',1),(53,141,'2025-02-07',1),(54,124,'2025-02-08',1),(55,141,'2025-02-08',NULL);
/*!40000 ALTER TABLE `gunlukgiris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gunlukgorev`
--

DROP TABLE IF EXISTS `gunlukgorev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gunlukgorev` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `TamamlandiMi` tinyint DEFAULT NULL,
  `HataEgzersiz` tinyint DEFAULT NULL,
  `Egzersiz` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gunlukgorev`
--

LOCK TABLES `gunlukgorev` WRITE;
/*!40000 ALTER TABLE `gunlukgorev` DISABLE KEYS */;
INSERT INTO `gunlukgorev` VALUES (8,124,'2025-02-07',NULL,1,1),(9,141,'2025-02-07',1,1,1);
/*!40000 ALTER TABLE `gunlukgorev` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici`
--

LOCK TABLES `kullanici` WRITE;
/*!40000 ALTER TABLE `kullanici` DISABLE KEYS */;
INSERT INTO `kullanici` VALUES (101,'NurihanK','01c96beddb172095388e43835bdb7145',NULL,2,NULL,'nnk123',NULL,NULL,NULL,NULL),(108,'NurihanK31','e35cf7b66449df565f93c607d5a81d09',NULL,NULL,NULL,'nrhnASD',NULL,NULL,NULL,NULL),(109,'nunu','2f8c3ab806a42e79c774cb09b41a53c8',NULL,NULL,NULL,'nunu',NULL,NULL,NULL,NULL),(114,'nk123','25f9e794323b453885f5181f1b624d0b',NULL,NULL,NULL,'nurihan@gmail.com',NULL,NULL,NULL,NULL),(115,'nurihankavalcı','14bdff06ee49403514e698d9a45c4533',NULL,NULL,NULL,'kavalcinurihan@gmail.com','5239','b8c37e33defde51cf91e1e03e51657da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJudXJpaGFua2F2YWxjxLEiLCJlbWFpbCI6ImthdmFsY2ludXJpaGFuQGdtYWlsLmNvbSIsImlhdCI6MTcwMjEzMDMzMCwiZXhwIjoxNzAyMTMwMzkwfQ.IvG8O78aDmslJFBjDxLFPk6lKwQA5L_RtzLkRmI73vE',NULL),(117,'4545','1f6419b1cbe79c71410cb320fc094775',1,NULL,NULL,'45454',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE3LCJpYXQiOjE3MjM2MzUxNjksImV4cCI6MTcyMzYzNTE5OX0.YbCem3sGVathYM81A3EpRfQTHv61Fv1cUmp75KcecIQ',NULL),(118,'454545','a684eceee76fc522773286a895bc8436',1,NULL,NULL,'54545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4LCJpYXQiOjE3MjM2MzUxOTIsImV4cCI6MTcyMzYzNTIyMn0.VPw36PEfWD-bLz6W3lihXo9mZOWU_O79E_OLF6N_pwQ',NULL),(119,'45455','e44fea3bec53bcea3b7513ccef5857ac',1,NULL,NULL,'545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJpYXQiOjE3MjM2MzUzMjgsImV4cCI6MTcyMzYzNTM1OH0.GD9b5-FZm4xWMNRT8JS8FzD4zOc_ncwaRZfF-e67jbc',NULL),(120,'2432423','d41d8cd98f00b204e9800998ecf8427e',4,NULL,NULL,'4234',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMCIsImlhdCI6MTcyMzYzNjM0MiwiZXhwIjoxNzIzNjM2MzcyfQ.RAHOg7zHNjM3DZ9YgyDtGMWPSk_y7dckhwDFQadzygk',NULL),(121,'6767','d41d8cd98f00b204e9800998ecf8427e',1,NULL,1,'6767',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxLCJpYXQiOjE3MjM2MzY1ODAsImV4cCI6MTcyMzYzNjYxMH0.rwmz1Gy1EYXJC9-tkGwyATEJLDotmeBF6w5ErOFPVgE',NULL),(122,'dsdsd','d41d8cd98f00b204e9800998ecf8427e',1,NULL,8,'sdsd',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE3MjM2MzY5MzQsImV4cCI6MTcyMzYzNjk2NH0.8gErje_d1QdpZIVvAfB3ctxyqA0MrlVq62ls138n0RE',NULL),(123,'121321','d41d8cd98f00b204e9800998ecf8427e',1,1,9,'3231',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcyMzYzNzMzOCwiZXhwIjoxNzIzNjM3MzY4fQ.il8mKkPAg1eFxnu9hXqMTcIeZbtJ4cCjUC6vzk9T4QU',NULL),(124,'12','c20ad4d76fe97759aa27a0c99bff6710',1,1,2,'121',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3MzkwMjY3ODksImV4cCI6MTczOTAyODU4OX0.cn1DT1p-lYvyeLNLCQbQcJnQq7ukg3fpleszP1JVUME','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3MzkwMjY3ODksImV4cCI6MTczOTAzMDM4OX0.W62PJDsb1tAGfCArzfAFzhhrRuKp72N4uAJRpClhleM'),(125,'mahir','202cb962ac59075b964b07152d234b70',1,NULL,2,'123',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTIzOX0.DAKnXZ84bafmrknNEWFApY0i5NZctt9s3XCl3OBk098','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTgwOX0.t1MrgLFk7z74y72yyMHc4cV9-eyibjYSosRuVWyQMk8'),(126,'11','6512bd43d9caa6e02c990b0a82652dca',1,NULL,NULL,'11',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3MzczNzM3NTYsImV4cCI6MTczNzM3NTU1Nn0.Sz2pVgmr_ywNTSA58ec8LiOh4-FTfa0BBLtzANeLmmw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3MzczNzM3NTYsImV4cCI6MTczNzM3NzM1Nn0.uxAWsILccft_6x4KVyS9zzScrtmvGAARXbJ1zcPAkvY'),(127,'111','698d51a19d8a121ce581499d7b701668',1,1,2,'111',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNTU4M30.VkFb1aodRlfomWePEe1s7tvPkH607Bspxx2YsgIcIZg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNjE1M30.EssoHi-8lCdAKYeoDVPngKTVAIVIS6vwA1M-OfOmLgM'),(128,'3','eccbc87e4b5ce2fe28308fd9f2a7baf3',1,1,2,'3',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNTc1N30.I2aqCvjcEscQSFO3R2No6fSbBItQC8o749zcyR2YaDw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNjMyN30.WklNGZdCGo3bmd-mLfjZ9YUjjc78VYF6nnBMKS8BJtQ'),(129,'67','735b90b4568125ed6c3f678819b6e058',NULL,NULL,NULL,'67',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjAzNX0.yVvTuBROi4dve49ZZ8e71JRHK3vDVZfpRs76KhkQQ7E','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjYwNX0.pXumsc4iHJTFhu7s1Fjt-pb8D5XLR5p9cJueo5VggVk'),(130,'a','0cc175b9c0f1b6a831c399e269772661',1,1,2,'a',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjA5OH0.lhBK4rZwbd6VBAMUQ13IBMYKTNlKGOSNnZ6cSXKaWWY','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjY2OH0.cVKA3XMwJMVsE1MJTIhbaEwZTk1lsgcbVvWudxIUgV0'),(131,'nh','86e41e046990daf7e850f49eb2d5a64d',1,1,2,'nh',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNjU0NH0.HIDRREyoCerDT7cCz8i_tAdQxPCDPoHIJnlQ7fhzxvw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNzExNH0.IufSGZQL0rs9zCkRShvuysO_1CP-DmFbqt00fKIbsYI'),(132,'aa','4124bc0a9335c27f086f24ba207a4912',1,1,2,'aa',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMiIsImlhdCI6MTcyODczNjc5MSwiZXhwIjoxNzI4NzM2ODIxfQ.HUsv6CEbbzVptqIgCdA2EGzqrIwAYIyAHb0C9eMlYgo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMyLCJpYXQiOjE3Mjg3MzY3NDUsImV4cCI6MTcyODczNzM0NX0.8uHQwe7ovBiwpPvCYCjtBjPMc9MYQtcapuS0AnjhKL0'),(134,'lnaazli','6351bf9dce654515bf1ddbd6426dfa97',1,1,2,'cakirernazli@gmail.com','4830',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzNCIsImlhdCI6MTcyODkwOTkxMSwiZXhwIjoxNzI4OTA5OTQxfQ.yOIWWTEw1yzEcACySKeqEPaHA-bgYHqhk6z3RbfYDrs','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM0LCJpYXQiOjE3Mjg5MDk2MTUsImV4cCI6MTcyODkxMDIxNX0.ASuT9xCMLtN9SP_T9gwTdYfYVCbkHWCdZWHF2kbdg_s'),(135,'13','c51ce410c124a10e0db5e4b97fc2af39',2,1,2,'13',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM1LCJpYXQiOjE3MzY5NTAzNjUsImV4cCI6MTczNjk1MjE2NX0.lUL_sxVFwOxoKltP-faoTWISljl6MIkwciz2wKy-Hdw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM1LCJpYXQiOjE3MzY5NTAzNjUsImV4cCI6MTczNjk1Mzk2NX0.cZxelLHiBBGRoZ4vUQxn7KUKXFI6kCfD9qio4vp1O34'),(136,'as','f970e2767d0cfe75876ea857f92e319b',2,1,2,'as',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJpYXQiOjE3MzY5NTAzMjUsImV4cCI6MTczNjk1MjEyNX0.ouZWDPUjcKinvyv5q3nCo6yKlpRbC4xZjtYcuY-QKG4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJpYXQiOjE3MzY5NTAzMjUsImV4cCI6MTczNjk1MzkyNX0.pFHimbfTqMooCkM21Wm9rnnQQLA7z53AevQvnnjBnW8'),(137,'11111','c20ad4d76fe97759aa27a0c99bff6710',NULL,NULL,NULL,'11111',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3LCJpYXQiOjE3MzczNzMwNjQsImV4cCI6MTczNzM3NDg2NH0.Hl_SEst_IcV-aMnxE8-pycBD0c3Jlwg4bpyex49wCQ0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3LCJpYXQiOjE3MzczNzMwNjQsImV4cCI6MTczNzM3NjY2NH0.VDXbTLEsiVzQ6X0UhGi8CE5vbxx6JSJTU7uwrV0y4JY'),(138,'4566','861637a425ef06e6d539aaaff113d1d5',NULL,NULL,NULL,'4566',NULL,NULL,NULL,NULL),(139,'4566sdf','9207938eaec25b0d324dac9e3ef77ee5',NULL,NULL,NULL,'4566sdf',NULL,NULL,NULL,NULL),(140,'4566sdf','9207938eaec25b0d324dac9e3ef77ee5',NULL,NULL,NULL,'4566sdf',NULL,NULL,NULL,NULL),(141,'5','e4da3b7fbbce2345d7772b0674a318d5',1,1,2,'5',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQxLCJpYXQiOjE3MzkwMjkxMjksImV4cCI6MTczOTAzMDkyOX0.TEsmx2KSLdVk4QFwHh_DaJk2Khh9LwEH1oB4WS6EmNM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQxLCJpYXQiOjE3MzkwMjkxMjksImV4cCI6MTczOTAzMjcyOX0.09ywqm0NK3OWpPsY_07qKwy1srUrPOnkjjChGl0ivGA');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meslek`
--

LOCK TABLES `meslek` WRITE;
/*!40000 ALTER TABLE `meslek` DISABLE KEYS */;
INSERT INTO `meslek` VALUES (1,'Bilgisayar Mühendisi'),(2,'Ogretmen'),(3,'İnşaat Mühendisi'),(4,'Pilot'),(6,'Endüstriyel Tasarım Mühendisliği');
/*!40000 ALTER TABLE `meslek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oynananbolumler`
--

DROP TABLE IF EXISTS `oynananbolumler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oynananbolumler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `BolumID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `GectiMi` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oynananbolumler`
--

LOCK TABLES `oynananbolumler` WRITE;
/*!40000 ALTER TABLE `oynananbolumler` DISABLE KEYS */;
INSERT INTO `oynananbolumler` VALUES (10,124,1,'2025-02-06',1),(11,124,3,'2025-02-06',1),(12,124,4,'2025-02-06',1),(13,124,5,'2025-02-06',1),(14,124,2,'2025-02-06',1),(15,141,1,'2025-02-06',1),(16,124,6,'2025-02-07',1),(17,141,3,'2025-02-07',1),(18,141,4,'2025-02-07',1),(19,141,5,'2025-02-07',1);
/*!40000 ALTER TABLE `oynananbolumler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oynanantemelbolumler`
--

DROP TABLE IF EXISTS `oynanantemelbolumler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oynanantemelbolumler` (
  `GecilenBolumID` int DEFAULT NULL,
  `KategoriID` int DEFAULT NULL,
  `KullaniciID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `GectiMi` tinyint DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oynanantemelbolumler`
--

LOCK TABLES `oynanantemelbolumler` WRITE;
/*!40000 ALTER TABLE `oynanantemelbolumler` DISABLE KEYS */;
INSERT INTO `oynanantemelbolumler` VALUES (1,1,124,'2025-02-06',1,1),(2,1,124,'2025-02-06',1,2),(7,1,124,'2025-02-06',0,3),(1,1,141,'2025-02-06',1,4),(3,2,124,'2025-02-07',1,5),(12,4,124,'2025-02-07',1,6),(13,4,124,'2025-02-07',1,7),(2,1,141,'2025-02-07',1,8),(3,2,141,'2025-02-07',1,9),(12,4,141,'2025-02-07',1,10);
/*!40000 ALTER TABLE `oynanantemelbolumler` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sezon`
--

LOCK TABLES `sezon` WRITE;
/*!40000 ALTER TABLE `sezon` DISABLE KEYS */;
INSERT INTO `sezon` VALUES (1,1,'1','1'),(2,1,'2','2'),(3,1,'25','3'),(4,2,'34','1'),(5,3,'45','1'),(6,4,'46','1'),(7,5,'47','1'),(8,6,'48','1');
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
  `Tarih` date DEFAULT NULL,
  PRIMARY KEY (`SozlukID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sozluk`
--

LOCK TABLES `sozluk` WRITE;
/*!40000 ALTER TABLE `sozluk` DISABLE KEYS */;
INSERT INTO `sozluk` VALUES (32,141,23,'2025-02-05');
/*!40000 ALTER TABLE `sozluk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelbolumler`
--

DROP TABLE IF EXISTS `temelbolumler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelbolumler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DilID` int DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `KategoriID` int DEFAULT NULL,
  `Order` int DEFAULT NULL,
  `Image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelbolumler`
--

LOCK TABLES `temelbolumler` WRITE;
/*!40000 ALTER TABLE `temelbolumler` DISABLE KEYS */;
INSERT INTO `temelbolumler` VALUES (1,1,'fruit',1,1,'https://cdn-icons-png.flaticon.com/128/3194/3194591.png'),(2,1,'drink',1,2,'https://cdn-icons-png.flaticon.com/128/390/390166.png'),(3,1,'kitchen',2,1,'https://cdn-icons-png.flaticon.com/128/1698/1698742.png'),(4,1,'bedroom',2,2,'https://cdn-icons-png.flaticon.com/128/2642/2642358.png'),(5,1,'teacher',3,1,'https://cdn-icons-png.flaticon.com/128/5369/5369664.png'),(6,1,'student',3,2,'https://cdn-icons-png.flaticon.com/128/2995/2995620.png'),(7,1,'sweet',1,3,'https://cdn-icons-png.flaticon.com/128/2454/2454268.png'),(8,1,'vegetable',1,4,'https://cdn-icons-png.flaticon.com/128/9862/9862079.png'),(9,1,'snacks',1,5,'https://cdn-icons-png.flaticon.com/128/3814/3814614.png'),(10,1,'bathroom',2,3,NULL),(11,1,'sitting room',2,4,NULL),(12,1,'Primary Colors',4,1,NULL),(13,1,'Secondary Colors',4,2,NULL),(14,1,'Warm Colors',4,3,NULL),(15,1,'Cool Colors',4,4,NULL);
/*!40000 ALTER TABLE `temelbolumler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelbolumlerceviri`
--

DROP TABLE IF EXISTS `temelbolumlerceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelbolumlerceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `AnaDilID` int DEFAULT NULL,
  `HangiDilID` int DEFAULT NULL,
  `KelimeID` int DEFAULT NULL,
  `Ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelbolumlerceviri`
--

LOCK TABLES `temelbolumlerceviri` WRITE;
/*!40000 ALTER TABLE `temelbolumlerceviri` DISABLE KEYS */;
INSERT INTO `temelbolumlerceviri` VALUES (1,1,2,1,'Meyve'),(2,1,2,2,'İçecek'),(3,1,2,3,'Mutfak'),(4,1,2,4,'Yatak Odası'),(5,1,2,5,'Öğretmen'),(6,1,2,6,'Öğrenci'),(7,1,2,7,'Tatlı'),(8,1,2,8,'Sebze'),(9,1,2,9,'Atıştırmalık'),(10,1,2,10,'Banyo'),(11,1,2,11,'Oturma Odası'),(12,1,2,12,'Ana renkler '),(13,1,2,13,'Ara renkler'),(14,1,2,14,'Sıcak renkler'),(15,1,2,15,'Soğuk renkler ');
/*!40000 ALTER TABLE `temelbolumlerceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelkategoriceviri`
--

DROP TABLE IF EXISTS `temelkategoriceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelkategoriceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `AnaDilID` int DEFAULT NULL,
  `HangiDilID` int DEFAULT NULL,
  `KelimeID` int DEFAULT NULL,
  `Ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelkategoriceviri`
--

LOCK TABLES `temelkategoriceviri` WRITE;
/*!40000 ALTER TABLE `temelkategoriceviri` DISABLE KEYS */;
INSERT INTO `temelkategoriceviri` VALUES (1,1,2,1,'Yiyecek/İçecek'),(2,1,2,2,'Ev'),(3,1,2,3,'Okul'),(4,1,2,4,'Renk'),(5,1,2,5,'Aile'),(6,1,2,6,'Hayvan'),(7,1,2,7,'Meslek'),(8,1,2,8,'Doğa');
/*!40000 ALTER TABLE `temelkategoriceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelkategoriler`
--

DROP TABLE IF EXISTS `temelkategoriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelkategoriler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DilID` int DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelkategoriler`
--

LOCK TABLES `temelkategoriler` WRITE;
/*!40000 ALTER TABLE `temelkategoriler` DISABLE KEYS */;
INSERT INTO `temelkategoriler` VALUES (1,1,'food/drink','https://cdn-icons-png.flaticon.com/128/706/706195.png'),(2,1,'home','https://cdn-icons-png.flaticon.com/128/619/619153.png'),(3,1,'school','https://cdn-icons-png.flaticon.com/128/1048/1048947.png'),(4,1,'color','https://cdn-icons-png.flaticon.com/128/2071/2071514.png'),(5,1,'family','https://cdn-icons-png.flaticon.com/128/2219/2219867.png'),(6,1,'animal','https://cdn-icons-png.flaticon.com/128/3397/3397536.png'),(7,1,'job',NULL),(8,1,'nature',NULL);
/*!40000 ALTER TABLE `temelkategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelkelimeler`
--

DROP TABLE IF EXISTS `temelkelimeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelkelimeler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DilID` int DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `BolumID` varchar(45) DEFAULT NULL,
  `Image` varchar(550) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelkelimeler`
--

LOCK TABLES `temelkelimeler` WRITE;
/*!40000 ALTER TABLE `temelkelimeler` DISABLE KEYS */;
INSERT INTO `temelkelimeler` VALUES (1,1,'apple','1','https://png.pngtree.com/png-vector/20200226/ourlarge/pngtree-apple-cartoon-vector-png-image_2153439.jpg'),(2,1,'banana','1','https://png.pngtree.com/png-vector/20241030/ourmid/pngtree-yellow-banana-image-for-food-banner-png-image_14183476.png'),(3,1,'pineaple','1','https://png.pngtree.com/png-vector/20190928/ourmid/pngtree-pineapple-icon-in-cartoon-style-png-image_1753120.jpg'),(4,1,'stawbery','1','https://i.pinimg.com/originals/60/4d/cd/604dcda55331db0952db9eee24a622a3.png'),(5,1,'fork','3',NULL),(6,1,'spoon','3',NULL),(7,1,'plate','3',NULL),(8,1,'table','3',NULL),(9,1,'pencil','6',NULL),(10,1,'eraser','6',NULL),(11,1,'notebook','6',NULL),(12,1,'table','6',NULL),(13,1,'tea','2',NULL),(14,1,'water','2',NULL),(15,1,'coke','2',NULL),(16,1,'coffee','2',NULL),(17,1,'Turkish Delight','7',NULL),(18,1,'Baklava','7',NULL),(19,1,'Rice Pudding','7',NULL),(20,1,'Milk Pudding','7',NULL),(21,1,'Tomato','8',NULL),(22,1,'Cucumber','8',NULL),(23,1,'Potato','8',NULL),(24,1,'Carrot','8',NULL),(25,1,'Shower ','10',NULL),(26,1,'Sink ','10',NULL),(27,1,'Towel ','10',NULL),(28,1,'Soap ','10',NULL),(29,1,'Sofa ','11',NULL),(30,1,'Television ','11',NULL),(31,1,'Carpet ','11',NULL),(32,1,'Lamp ','11',NULL),(33,1,'Red ','12',NULL),(34,1,'Blue ','12',NULL),(35,1,'Yellow ','12',NULL),(36,1,'White ','12',NULL),(37,1,'Orange ','13',NULL),(38,1,'Purple ','13',NULL),(39,1,'Green ','13',NULL),(40,1,'Brown ','13',NULL),(41,1,'Brick Red','14',NULL),(42,1,'Orange ','14',NULL),(43,1,'Pink ','14',NULL),(44,1,'Scarlet ','14',NULL);
/*!40000 ALTER TABLE `temelkelimeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelkelimelerceviri`
--

DROP TABLE IF EXISTS `temelkelimelerceviri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelkelimelerceviri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `AnaDilID` int DEFAULT NULL,
  `HangiDilID` int DEFAULT NULL,
  `KelimeID` int DEFAULT NULL,
  `Ceviri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelkelimelerceviri`
--

LOCK TABLES `temelkelimelerceviri` WRITE;
/*!40000 ALTER TABLE `temelkelimelerceviri` DISABLE KEYS */;
INSERT INTO `temelkelimelerceviri` VALUES (1,1,2,1,'Elma'),(2,1,2,2,'Muz'),(3,1,2,3,'Ananas'),(4,1,2,4,'Çilek'),(5,1,2,5,'Çatal'),(6,1,2,6,'Kaşık'),(7,1,2,7,'Tabak'),(8,1,2,8,'Masa'),(9,1,2,9,'Kalem'),(10,1,2,10,'Silgi'),(11,1,2,11,'Defter'),(12,1,2,12,'Masa'),(13,1,2,13,'Çay'),(14,1,2,14,'Su'),(15,1,2,15,'Kola'),(16,1,2,16,'Kahve'),(17,1,2,17,'Lokum'),(18,1,2,18,'Baklava'),(19,1,2,19,'Sütlaç '),(20,1,2,20,'Muhallebi '),(21,1,2,21,'Domates '),(22,1,2,22,'Salatalık '),(23,1,2,23,'Patates '),(24,1,2,24,'Havuç '),(25,1,2,25,'Duş'),(26,1,2,26,'Lavabo'),(27,1,2,27,'Havlu'),(28,1,2,28,'Sabun'),(29,1,2,29,'Koltuk'),(30,1,2,30,'Televizyon'),(31,1,2,31,'Halı'),(32,1,2,32,'Lamba'),(33,1,2,33,'Kırmızı'),(34,1,2,34,'Mavi'),(35,1,2,35,'Sarı'),(36,1,2,36,'Beyaz'),(37,1,2,37,'Turuncu'),(38,1,2,38,'Mor'),(39,1,2,39,'Yeşil'),(40,1,2,40,'Kahverengi'),(41,1,2,41,'Tuğla kırmızısı'),(42,1,2,42,'Turuncu'),(43,1,2,43,'Pembe'),(44,1,2,44,'Kızıl');
/*!40000 ALTER TABLE `temelkelimelerceviri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temelkelimelersozluk`
--

DROP TABLE IF EXISTS `temelkelimelersozluk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temelkelimelersozluk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KelimeID` varchar(45) DEFAULT NULL,
  `KullaniciID` varchar(45) DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temelkelimelersozluk`
--

LOCK TABLES `temelkelimelersozluk` WRITE;
/*!40000 ALTER TABLE `temelkelimelersozluk` DISABLE KEYS */;
INSERT INTO `temelkelimelersozluk` VALUES (24,'1','141','2025-02-05');
/*!40000 ALTER TABLE `temelkelimelersozluk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yanlisbilinenkelimeler`
--

DROP TABLE IF EXISTS `yanlisbilinenkelimeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yanlisbilinenkelimeler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KelimeID` int DEFAULT NULL,
  `KullaniciID` int DEFAULT NULL,
  `temelMi` tinyint DEFAULT NULL,
  `aktifMi` tinyint DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yanlisbilinenkelimeler`
--

LOCK TABLES `yanlisbilinenkelimeler` WRITE;
/*!40000 ALTER TABLE `yanlisbilinenkelimeler` DISABLE KEYS */;
INSERT INTO `yanlisbilinenkelimeler` VALUES (22,23,141,0,1,'2025-02-05'),(23,7,141,1,1,NULL),(24,5,141,1,1,NULL),(25,9,124,0,1,'2025-02-06'),(26,10,124,0,1,'2025-02-06'),(27,11,124,0,1,'2025-02-06'),(28,13,124,0,1,'2025-02-06'),(29,15,124,0,1,'2025-02-06'),(30,14,124,0,1,'2025-02-06'),(31,19,124,0,1,'2025-02-06'),(32,23,124,0,1,'2025-02-06'),(33,3,124,1,1,NULL),(34,4,124,1,1,NULL),(35,2,124,1,1,NULL),(36,17,124,1,1,NULL),(37,20,124,1,1,NULL),(38,3,141,1,1,NULL),(39,6,124,1,1,NULL),(40,5,124,1,1,NULL),(41,35,124,1,1,NULL),(42,33,124,1,1,NULL),(43,34,124,1,1,NULL);
/*!40000 ALTER TABLE `yanlisbilinenkelimeler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-09 22:11:18
