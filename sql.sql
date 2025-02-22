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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anakelimeler`
--

LOCK TABLES `anakelimeler` WRITE;
/*!40000 ALTER TABLE `anakelimeler` DISABLE KEYS */;
INSERT INTO `anakelimeler` VALUES (1,1,'Welcome Season',1,0,0),(2,1,'Super Season',1,0,0),(3,1,'Welcome Part',1,0,0),(4,1,'Contiune Part',1,0,0),(5,1,'Speed Part',1,0,0),(6,1,'Job Part',1,0,0),(7,1,'Good Part',1,0,0),(8,1,'Business Part',1,0,0),(9,1,'Computer',1,1,1),(10,1,'Keyboard',1,1,1),(11,1,'Mouse',1,1,1),(12,1,'Phone',1,1,1),(13,1,'Data',1,3,1),(14,1,'Path',1,3,1),(15,1,'Access ',1,3,1),(16,1,'Application ',1,3,1),(17,1,'Algorithm',1,4,1),(18,1,'Data Structure',1,4,1),(19,1,'Compiler',1,4,1),(20,1,'Database',1,4,1),(21,1,'Network',1,5,1),(22,1,'Software Engineering',1,5,1),(23,1,'Debugging',1,5,1),(24,1,'Protocol',1,5,1),(25,1,'Continuation Season',1,0,0),(26,1,'Variable ',1,2,1),(27,1,'Loop ',1,2,1),(28,1,'Abstraction ',1,2,1),(29,1,'Class ',1,2,1),(30,1,'Interface ',1,6,1),(31,1,'Backend ',1,6,1),(32,1,'Frontend ',1,6,1),(33,1,'Machine Learning',1,6,1),(34,1,'Forward Part',1,0,0),(35,1,'Mastery Path Part',1,0,0),(36,1,'Backup ',1,7,1),(37,1,'Network ',1,7,1),(38,1,'Memory ',1,7,1),(39,1,'Storage ',1,7,1),(40,1,'Developer ',1,8,1),(41,1,'Code ',1,8,1),(42,1,'Bug ',1,8,1),(43,1,'Syntax ',1,8,1),(44,1,'Yes Season',1,0,0),(45,1,'Experience Season',1,0,0),(46,1,'Skill Up Season',1,0,0),(47,1,'Ascend Season',1,0,0),(48,1,'Pinnacle Season',1,0,0),(49,1,'Critical Part',1,0,0),(50,1,'Code Part',1,0,0),(51,1,'Digital Part',1,0,0),(52,1,'Success Part',1,0,0),(53,1,'Hashing ',1,9,1),(54,1,'Data Bus',1,9,1),(55,1,'Kernel Mode ',1,9,1),(56,1,'Bitwise Operations',1,9,1),(57,1,'Virtualization ',1,10,1),(58,1,'Race Condition',1,10,1),(59,1,'Namespace ',1,10,1),(60,1,'Multithreading ',1,10,1),(61,1,'Overclocking ',1,11,1),(62,1,'Deadlock ',1,11,1),(63,1,'Firmware ',1,11,1),(64,1,'Microservices ',1,11,1),(65,1,'Rollback ',1,12,1),(66,1,'Lazy Loading ',1,12,1),(67,1,'Machine Code',1,12,1),(68,1,'Buffer Overflow',1,12,1),(69,1,'A Part',1,0,0),(70,1,'Key',1,13,1),(71,1,'Screen',1,13,1),(72,1,'A',1,13,1),(73,1,'B',1,13,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolum`
--

LOCK TABLES `bolum` WRITE;
/*!40000 ALTER TABLE `bolum` DISABLE KEYS */;
INSERT INTO `bolum` VALUES (1,1,3,'1'),(2,2,4,'1'),(3,1,5,'2'),(4,1,6,'3'),(5,1,7,'4'),(6,2,8,'2'),(7,4,35,'1'),(8,4,36,'2'),(9,5,49,'1'),(10,6,50,'1'),(11,7,51,'1'),(12,8,52,'1'),(13,3,69,'1');
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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceviriler`
--

LOCK TABLES `ceviriler` WRITE;
/*!40000 ALTER TABLE `ceviriler` DISABLE KEYS */;
INSERT INTO `ceviriler` VALUES (1,1,2,1,'Hosgeldin Sezonu'),(2,1,2,2,'Süper Sezon'),(3,1,2,3,'Hosgeldin Bölümü'),(4,1,2,4,'Devam Bölümü'),(5,1,2,5,'Hız Bölümü'),(6,1,2,6,'Meslek Bölümü'),(7,1,2,7,'İyi Bölüm'),(8,1,2,8,'İş Bölümü'),(9,1,2,9,'Bilgisayar'),(10,1,2,10,'Klavye '),(11,1,2,11,'Fare'),(12,1,2,12,'Telefon'),(13,1,2,13,'Veri'),(14,1,2,14,'Yol'),(15,1,2,15,'Erişim'),(16,1,2,16,'Uygulama'),(17,1,2,17,'Algoritma'),(18,1,2,18,'Veri Yapısı'),(19,1,2,19,'Derleyici'),(20,1,2,20,'Veri Tabanı'),(21,1,2,21,'Ağ'),(22,1,2,22,'Yazılım Mühendisi'),(23,1,2,23,'Hata Ayıklayıcı'),(24,1,2,24,'Protokol'),(25,1,2,25,'Devam Sezonu'),(26,1,2,26,'Değişken'),(27,1,2,27,'Döngü'),(28,1,2,28,'Soyutlama'),(29,1,2,29,'Sınıf'),(30,1,2,30,'Arayüz'),(31,1,2,31,'Arka Yüz'),(32,1,2,32,'Ön Yüz'),(33,1,2,33,'Makine Öğrenimi'),(34,1,2,44,'Evet Sezonu'),(35,1,2,34,'İleri Bölümü'),(36,1,2,35,'Ustalık\r Bölümü'),(37,1,2,36,'Yedekleme'),(38,1,2,37,'Ağ'),(39,1,2,38,'Bellek'),(40,1,2,39,'Depolama'),(41,1,2,40,'Geliştirici'),(42,1,2,41,'Kod'),(43,1,2,42,'Hata'),(44,1,2,43,'Sözdizimi'),(45,1,2,45,'Deneyim Sezonu'),(46,1,2,46,'Becerilerini Geliştir Sezonu'),(47,1,2,47,'Yükseliş Sezonu'),(48,1,2,48,'Zirve Sezonu'),(49,1,2,49,'Kritik Bölümü'),(50,1,2,50,'Kod'),(51,1,2,51,'Dijital Bölümü'),(52,1,2,52,'Başarı Bölümü'),(53,1,2,53,'Karma fonksiyonu'),(54,1,2,54,'Veri yolu'),(55,1,2,55,'Çekirdek modu'),(56,1,2,56,'Bitwise Operations '),(57,1,2,57,'Sanallaştırma'),(58,1,2,58,'Yarış durumu'),(59,1,2,59,'İsim alanı'),(60,1,2,60,'Çoklu iş parçacığı'),(61,1,2,61,'Hız aşırtma'),(62,1,2,62,'Kilitlenme'),(63,1,2,63,'Gömülü yazılım'),(64,1,2,64,'Mikro hizmetler'),(65,1,2,65,'Geri alma'),(66,1,2,66,'Tembel yükleme'),(67,1,2,67,'Makine kodu'),(68,1,2,68,'Tampon taşması'),(69,1,2,69,'A Bölümü'),(70,1,2,70,'Anahtar'),(71,1,2,71,'Ekran'),(72,1,2,72,'A'),(73,1,2,73,'B');
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
-- Table structure for table `egzersizistatistikleri`
--

DROP TABLE IF EXISTS `egzersizistatistikleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `egzersizistatistikleri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` int DEFAULT NULL,
  `TemelMi` tinyint DEFAULT NULL,
  `EgzersizID` int DEFAULT NULL,
  `KelimeID` int DEFAULT NULL,
  `DogruMu` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egzersizistatistikleri`
--

LOCK TABLES `egzersizistatistikleri` WRITE;
/*!40000 ALTER TABLE `egzersizistatistikleri` DISABLE KEYS */;
INSERT INTO `egzersizistatistikleri` VALUES (61,124,0,2,40,1),(62,124,0,2,31,1),(63,124,0,2,28,0),(64,124,0,2,53,0),(65,124,0,2,56,0),(66,124,0,2,36,0),(67,124,0,2,22,0),(68,124,0,2,55,0),(69,124,0,2,64,0),(70,124,0,2,43,0),(71,124,0,2,63,0),(72,124,0,2,12,0),(73,159,0,2,33,1),(74,159,0,2,66,1),(75,159,0,2,65,0),(76,159,0,2,12,0),(77,159,0,2,24,0),(78,159,0,2,41,0),(79,159,0,2,21,0);
/*!40000 ALTER TABLE `egzersizistatistikleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gecilenseviyeler`
--

DROP TABLE IF EXISTS `gecilenseviyeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gecilenseviyeler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `KullaniciID` varchar(45) DEFAULT NULL,
  `SeviyeID` varchar(45) DEFAULT NULL,
  `Tarih` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilenseviyeler`
--

LOCK TABLES `gecilenseviyeler` WRITE;
/*!40000 ALTER TABLE `gecilenseviyeler` DISABLE KEYS */;
INSERT INTO `gecilenseviyeler` VALUES (1,'124','1','2024-02-07'),(2,'161','3','2025-02-20'),(3,'161','5','2025-02-20'),(5,'162','1','2025-02-20'),(6,'162','2','2025-02-20'),(7,'162','3','2025-02-20');
/*!40000 ALTER TABLE `gecilenseviyeler` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gecilensezonlar`
--

LOCK TABLES `gecilensezonlar` WRITE;
/*!40000 ALTER TABLE `gecilensezonlar` DISABLE KEYS */;
INSERT INTO `gecilensezonlar` VALUES (30,161,1,'2025-02-20'),(31,161,4,'2025-02-20'),(32,161,5,'2025-02-20'),(33,162,1,'2025-02-20'),(34,162,2,'2025-02-20'),(35,162,3,'2025-02-20'),(36,162,4,'2025-02-20'),(37,162,5,'2025-02-20');
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gunlukgiris`
--

LOCK TABLES `gunlukgiris` WRITE;
/*!40000 ALTER TABLE `gunlukgiris` DISABLE KEYS */;
INSERT INTO `gunlukgiris` VALUES (23,124,'2024-10-12',1),(24,124,'2024-10-11',NULL),(25,127,'2024-10-12',NULL),(26,128,'2024-10-12',NULL),(27,132,'2024-10-12',1),(28,134,'2024-10-14',1),(29,126,'2024-12-07',1),(30,124,'2024-12-07',1),(34,124,'2024-12-06',NULL),(35,124,'2024-12-04',NULL),(36,124,'2025-01-10',0),(37,124,'2025-01-14',0),(38,124,'2025-01-13',NULL),(39,124,'2025-01-15',0),(40,135,'2025-01-15',NULL),(41,124,'2025-01-16',0),(42,124,'2025-01-17',0),(43,124,'2025-01-20',0),(44,126,'2025-01-20',NULL),(45,124,'2025-01-21',0),(46,124,'2025-02-05',NULL),(51,124,'2025-02-06',1),(52,124,'2025-02-07',1),(53,141,'2025-02-07',1),(54,124,'2025-02-08',1),(55,141,'2025-02-08',NULL),(56,141,'2025-02-11',NULL),(57,152,'2025-02-11',NULL),(58,155,'2025-02-11',NULL),(59,124,'2025-02-11',1),(60,156,'2025-02-11',NULL),(61,124,'2025-02-19',NULL),(62,159,'2025-02-19',NULL),(63,159,'2025-02-20',NULL),(64,124,'2025-02-20',NULL),(65,161,'2025-02-20',NULL),(66,162,'2025-02-20',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gunlukgorev`
--

LOCK TABLES `gunlukgorev` WRITE;
/*!40000 ALTER TABLE `gunlukgorev` DISABLE KEYS */;
INSERT INTO `gunlukgorev` VALUES (8,124,'2025-02-07',NULL,1,1),(9,141,'2025-02-07',1,1,1),(10,152,'2025-02-11',NULL,1,NULL),(11,153,'2025-02-11',NULL,1,NULL),(12,124,'2025-02-11',NULL,1,1),(13,124,'2025-02-19',NULL,1,1),(14,159,'2025-02-19',NULL,1,1);
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
  `TestID` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici`
--

LOCK TABLES `kullanici` WRITE;
/*!40000 ALTER TABLE `kullanici` DISABLE KEYS */;
INSERT INTO `kullanici` VALUES (101,'NurihanK','01c96beddb172095388e43835bdb7145',NULL,2,NULL,'nnk123',NULL,NULL,NULL,NULL,NULL),(108,'NurihanK31','e35cf7b66449df565f93c607d5a81d09',NULL,NULL,NULL,'nrhnASD',NULL,NULL,NULL,NULL,NULL),(109,'nunu','2f8c3ab806a42e79c774cb09b41a53c8',NULL,NULL,NULL,'nunu',NULL,NULL,NULL,NULL,NULL),(114,'nk123','25f9e794323b453885f5181f1b624d0b',NULL,NULL,NULL,'nurihan@gmail.com',NULL,NULL,NULL,NULL,NULL),(115,'nurihankavalcı','14bdff06ee49403514e698d9a45c4533',NULL,NULL,NULL,'kavalcinurihan@gmail.com','5239','b8c37e33defde51cf91e1e03e51657da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lBZGkiOiJudXJpaGFua2F2YWxjxLEiLCJlbWFpbCI6ImthdmFsY2ludXJpaGFuQGdtYWlsLmNvbSIsImlhdCI6MTcwMjEzMDMzMCwiZXhwIjoxNzAyMTMwMzkwfQ.IvG8O78aDmslJFBjDxLFPk6lKwQA5L_RtzLkRmI73vE',NULL,NULL),(117,'4545','1f6419b1cbe79c71410cb320fc094775',1,NULL,NULL,'45454',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE3LCJpYXQiOjE3MjM2MzUxNjksImV4cCI6MTcyMzYzNTE5OX0.YbCem3sGVathYM81A3EpRfQTHv61Fv1cUmp75KcecIQ',NULL,NULL),(118,'454545','a684eceee76fc522773286a895bc8436',1,NULL,NULL,'54545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4LCJpYXQiOjE3MjM2MzUxOTIsImV4cCI6MTcyMzYzNTIyMn0.VPw36PEfWD-bLz6W3lihXo9mZOWU_O79E_OLF6N_pwQ',NULL,NULL),(119,'45455','e44fea3bec53bcea3b7513ccef5857ac',1,NULL,NULL,'545',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJpYXQiOjE3MjM2MzUzMjgsImV4cCI6MTcyMzYzNTM1OH0.GD9b5-FZm4xWMNRT8JS8FzD4zOc_ncwaRZfF-e67jbc',NULL,NULL),(120,'2432423','d41d8cd98f00b204e9800998ecf8427e',4,NULL,NULL,'4234',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMCIsImlhdCI6MTcyMzYzNjM0MiwiZXhwIjoxNzIzNjM2MzcyfQ.RAHOg7zHNjM3DZ9YgyDtGMWPSk_y7dckhwDFQadzygk',NULL,NULL),(121,'6767','d41d8cd98f00b204e9800998ecf8427e',1,NULL,1,'6767',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIxLCJpYXQiOjE3MjM2MzY1ODAsImV4cCI6MTcyMzYzNjYxMH0.rwmz1Gy1EYXJC9-tkGwyATEJLDotmeBF6w5ErOFPVgE',NULL,NULL),(122,'dsdsd','d41d8cd98f00b204e9800998ecf8427e',1,NULL,8,'sdsd',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE3MjM2MzY5MzQsImV4cCI6MTcyMzYzNjk2NH0.8gErje_d1QdpZIVvAfB3ctxyqA0MrlVq62ls138n0RE',NULL,NULL),(123,'121321','d41d8cd98f00b204e9800998ecf8427e',1,1,9,'3231',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcyMzYzNzMzOCwiZXhwIjoxNzIzNjM3MzY4fQ.il8mKkPAg1eFxnu9hXqMTcIeZbtJ4cCjUC6vzk9T4QU',NULL,NULL),(124,'12','c20ad4d76fe97759aa27a0c99bff6710',1,1,2,'121',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3NDAwNDc4MjIsImV4cCI6MTc0MDA0OTYyMn0.2RP903PIb3M7PK35TGEK8bN9_cLnUH-T91sqYSFmRig','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0LCJpYXQiOjE3NDAwNDc4MjIsImV4cCI6MTc0MDA1MTQyMn0.xdFdVTlQARgUrl_T0oCERfnM1eFCX3Dr_QOeuxzJjK8',NULL),(125,'mahir','202cb962ac59075b964b07152d234b70',1,NULL,2,'123',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTIzOX0.DAKnXZ84bafmrknNEWFApY0i5NZctt9s3XCl3OBk098','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE3Mjg3MzUyMDksImV4cCI6MTcyODczNTgwOX0.t1MrgLFk7z74y72yyMHc4cV9-eyibjYSosRuVWyQMk8',NULL),(126,'11','6512bd43d9caa6e02c990b0a82652dca',1,NULL,NULL,'11',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3MzczNzM3NTYsImV4cCI6MTczNzM3NTU1Nn0.Sz2pVgmr_ywNTSA58ec8LiOh4-FTfa0BBLtzANeLmmw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE3MzczNzM3NTYsImV4cCI6MTczNzM3NzM1Nn0.uxAWsILccft_6x4KVyS9zzScrtmvGAARXbJ1zcPAkvY',NULL),(127,'111','698d51a19d8a121ce581499d7b701668',1,1,2,'111',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNTU4M30.VkFb1aodRlfomWePEe1s7tvPkH607Bspxx2YsgIcIZg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJpYXQiOjE3Mjg3MzU1NTMsImV4cCI6MTcyODczNjE1M30.EssoHi-8lCdAKYeoDVPngKTVAIVIS6vwA1M-OfOmLgM',NULL),(128,'3','eccbc87e4b5ce2fe28308fd9f2a7baf3',1,1,2,'3',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNTc1N30.I2aqCvjcEscQSFO3R2No6fSbBItQC8o749zcyR2YaDw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI4LCJpYXQiOjE3Mjg3MzU3MjcsImV4cCI6MTcyODczNjMyN30.WklNGZdCGo3bmd-mLfjZ9YUjjc78VYF6nnBMKS8BJtQ',NULL),(129,'67','735b90b4568125ed6c3f678819b6e058',NULL,NULL,NULL,'67',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjAzNX0.yVvTuBROi4dve49ZZ8e71JRHK3vDVZfpRs76KhkQQ7E','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI5LCJpYXQiOjE3Mjg3MzYwMDUsImV4cCI6MTcyODczNjYwNX0.pXumsc4iHJTFhu7s1Fjt-pb8D5XLR5p9cJueo5VggVk',NULL),(130,'a','0cc175b9c0f1b6a831c399e269772661',1,1,2,'a',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjA5OH0.lhBK4rZwbd6VBAMUQ13IBMYKTNlKGOSNnZ6cSXKaWWY','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJpYXQiOjE3Mjg3MzYwNjgsImV4cCI6MTcyODczNjY2OH0.cVKA3XMwJMVsE1MJTIhbaEwZTk1lsgcbVvWudxIUgV0',NULL),(131,'nh','86e41e046990daf7e850f49eb2d5a64d',1,1,2,'nh',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNjU0NH0.HIDRREyoCerDT7cCz8i_tAdQxPCDPoHIJnlQ7fhzxvw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJpYXQiOjE3Mjg3MzY1MTQsImV4cCI6MTcyODczNzExNH0.IufSGZQL0rs9zCkRShvuysO_1CP-DmFbqt00fKIbsYI',NULL),(132,'aa','4124bc0a9335c27f086f24ba207a4912',1,1,2,'aa',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMiIsImlhdCI6MTcyODczNjc5MSwiZXhwIjoxNzI4NzM2ODIxfQ.HUsv6CEbbzVptqIgCdA2EGzqrIwAYIyAHb0C9eMlYgo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMyLCJpYXQiOjE3Mjg3MzY3NDUsImV4cCI6MTcyODczNzM0NX0.8uHQwe7ovBiwpPvCYCjtBjPMc9MYQtcapuS0AnjhKL0',NULL),(134,'lnaazli','6351bf9dce654515bf1ddbd6426dfa97',1,1,2,'cakirernazli@gmail.com','4830',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzNCIsImlhdCI6MTcyODkwOTkxMSwiZXhwIjoxNzI4OTA5OTQxfQ.yOIWWTEw1yzEcACySKeqEPaHA-bgYHqhk6z3RbfYDrs','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM0LCJpYXQiOjE3Mjg5MDk2MTUsImV4cCI6MTcyODkxMDIxNX0.ASuT9xCMLtN9SP_T9gwTdYfYVCbkHWCdZWHF2kbdg_s',NULL),(135,'13','c51ce410c124a10e0db5e4b97fc2af39',2,1,2,'13',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM1LCJpYXQiOjE3MzY5NTAzNjUsImV4cCI6MTczNjk1MjE2NX0.lUL_sxVFwOxoKltP-faoTWISljl6MIkwciz2wKy-Hdw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM1LCJpYXQiOjE3MzY5NTAzNjUsImV4cCI6MTczNjk1Mzk2NX0.cZxelLHiBBGRoZ4vUQxn7KUKXFI6kCfD9qio4vp1O34',NULL),(136,'as','f970e2767d0cfe75876ea857f92e319b',2,1,2,'as',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJpYXQiOjE3MzY5NTAzMjUsImV4cCI6MTczNjk1MjEyNX0.ouZWDPUjcKinvyv5q3nCo6yKlpRbC4xZjtYcuY-QKG4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJpYXQiOjE3MzY5NTAzMjUsImV4cCI6MTczNjk1MzkyNX0.pFHimbfTqMooCkM21Wm9rnnQQLA7z53AevQvnnjBnW8',NULL),(137,'11111','c20ad4d76fe97759aa27a0c99bff6710',NULL,NULL,NULL,'11111',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3LCJpYXQiOjE3MzczNzMwNjQsImV4cCI6MTczNzM3NDg2NH0.Hl_SEst_IcV-aMnxE8-pycBD0c3Jlwg4bpyex49wCQ0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3LCJpYXQiOjE3MzczNzMwNjQsImV4cCI6MTczNzM3NjY2NH0.VDXbTLEsiVzQ6X0UhGi8CE5vbxx6JSJTU7uwrV0y4JY',NULL),(138,'4566','861637a425ef06e6d539aaaff113d1d5',NULL,NULL,NULL,'4566',NULL,NULL,NULL,NULL,NULL),(139,'4566sdf','9207938eaec25b0d324dac9e3ef77ee5',NULL,NULL,NULL,'4566sdf',NULL,NULL,NULL,NULL,NULL),(140,'4566sdf','9207938eaec25b0d324dac9e3ef77ee5',NULL,NULL,NULL,'4566sdf',NULL,NULL,NULL,NULL,NULL),(141,'5','e4da3b7fbbce2345d7772b0674a318d5',1,1,2,'5',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQxLCJpYXQiOjE3MzkyOTQ5MjAsImV4cCI6MTczOTI5NjcyMH0.FyAx0_iJvrxfPZmbWgD98rMWkMvl4IWFSwhdTxRNXc0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQxLCJpYXQiOjE3MzkyOTQ5MjAsImV4cCI6MTczOTI5ODUyMH0.2y8yT2HwJewQ46LWNs84edMfyoIsxwObbjIlmWjZSxY',25),(142,'12','c20ad4d76fe97759aa27a0c99bff6710',NULL,NULL,NULL,'121',NULL,NULL,NULL,NULL,NULL),(143,'12','80bef854b2dba51409b5c37c577a8492',NULL,NULL,NULL,'121213123',NULL,NULL,NULL,NULL,NULL),(144,'12','80bef854b2dba51409b5c37c577a8492',NULL,NULL,NULL,'121213123',NULL,NULL,NULL,NULL,NULL),(145,'121','80bef854b2dba51409b5c37c577a8492',NULL,NULL,NULL,'1212131231',NULL,NULL,NULL,NULL,NULL),(146,'1211','80bef854b2dba51409b5c37c577a8492',NULL,NULL,NULL,'12121312311',NULL,NULL,NULL,NULL,NULL),(147,'sea','5c5b0390935db2cd64d018493a7c8d12',NULL,NULL,NULL,'sea',NULL,NULL,NULL,NULL,NULL),(148,'asdasd','a8f5f167f44f4964e6c998dee827110c',NULL,NULL,NULL,'asdasd',NULL,NULL,NULL,NULL,NULL),(149,'asdasda','a8f5f167f44f4964e6c998dee827110c',NULL,NULL,NULL,'asdasda',NULL,NULL,NULL,NULL,NULL),(150,'asdasdaa','a8f5f167f44f4964e6c998dee827110c',1,1,2,'asdasdaa',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUwLCJpYXQiOjE3MzkyNzYwNDksImV4cCI6MTczOTI3Nzg0OX0.t4l-X1GK-8HK1MmovSOcDTo4IIvNAgaEhvGCdbmTTSI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUwLCJpYXQiOjE3MzkyNzYwNDksImV4cCI6MTczOTI3OTY0OX0.daw6ESg6m4gaz6zA0R_s9C8St0fGtSU01MO8Gs9L_W4',NULL),(151,'cvcvcv','55bd0e94886a4a262e09168c2c5965d5',1,1,2,'cvcvcvcv',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxLCJpYXQiOjE3MzkyNzY0OTAsImV4cCI6MTczOTI3ODI5MH0.B77p80i6papNlGpfGE6DZq5n-H6t0QDrs7gsew0oNLw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxLCJpYXQiOjE3MzkyNzY0OTAsImV4cCI6MTczOTI4MDA5MH0.sFNarcw2Pn_g7vVhFqM5_Jc75eXLtW-0bgGqGS2-gqY',NULL),(152,'3131','54fda78aa8a09b4d77b5aaec57b75028',1,1,2,'3131',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUyLCJpYXQiOjE3MzkyODUwMDksImV4cCI6MTczOTI4NjgwOX0.td2aKONtbqcpsEs9r0L__u1vgqGT3NtTpgG2rwxwSns','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUyLCJpYXQiOjE3MzkyODUwMDksImV4cCI6MTczOTI4ODYwOX0.L_ygkMRbh5byd82jI_wn8vb7u4F0nS10oqlAPM_WqiM',26),(153,'7878','21c3134ee5edcb618c4f9aae358d73a7',1,1,2,'7878',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJpYXQiOjE3MzkyNzY4MDAsImV4cCI6MTczOTI3ODYwMH0.cLgHXeQbw0h2zA6orZ_RW91U2pJzP_b9WZQy_UPznA4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJpYXQiOjE3MzkyNzY4MDAsImV4cCI6MTczOTI4MDQwMH0.Z_aScSA_A29EpzZH0t9gWGnysI-lYlxUklghTT0YifU',22),(154,'adem','8b372a2d003dc7c6e3ca4c4420c88ea9',1,1,2,'adem',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0LCJpYXQiOjE3MzkyODQ1MDcsImV4cCI6MTczOTI4NjMwN30.devKVvw9LAI-MQ8RPo1msV9bie4V9Phv-FupkTY1fRo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0LCJpYXQiOjE3MzkyODQ1MDcsImV4cCI6MTczOTI4ODEwN30.as9rqzIN_HOeFvow6-6AdENyVlVvN5yuMMIHcJVBm2I',24),(155,'nurihankk','912ec803b2ce49e4a541068d495ab570',1,1,2,'asdf',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJpYXQiOjE3MzkyOTIzOTQsImV4cCI6MTczOTI5NDE5NH0.1ZR7JgwphYGvNbCQv07K_HhufpiYuKTayQ_PRgK0x5o','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJpYXQiOjE3MzkyOTIzOTQsImV4cCI6MTczOTI5NTk5NH0.lcnNDzM9pwWa44gDLJeluxoBQsCQ_OIm2GfE_Q9yWYY',28),(156,'bennuri','146dcf7b727881dea183114754cf60ab',1,1,2,'yokyav',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU2LCJpYXQiOjE3MzkyOTUyNTIsImV4cCI6MTczOTI5NzA1Mn0.64gyBCD_uh745I0XcRMrGo7CGcF8WhF-wvlYPbLYqYo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU2LCJpYXQiOjE3MzkyOTUyNTIsImV4cCI6MTczOTI5ODg1Mn0.PpB0xJvEdzpTnvFsS9uETejvKG79dGpKHyA8_pFO7JQ',29),(157,'','d41d8cd98f00b204e9800998ecf8427e',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL),(158,'7897897','61bfdc160e4c099203c72258d8825340',1,1,2,'897897',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU4LCJpYXQiOjE3MzkyOTczOTMsImV4cCI6MTczOTI5OTE5M30.WLFAdmKAp3N2-2uwSu2SzuSrJ2-U7zoqJ5C5Hbz25Jg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU4LCJpYXQiOjE3MzkyOTczOTMsImV4cCI6MTczOTMwMDk5M30.gxZaWUAjlbs9tl-3hD9Btt5Ye0KFz2YhnnL0lFOHis8',NULL),(159,'89','7647966b7343c29048673252e490f736',1,1,2,'89',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU5LCJpYXQiOjE3NDAwNjk2MDgsImV4cCI6MTc0MDA3MTQwOH0.KUfCKQkf6FOXAAtgKWims4cpRbkjq91Gz_aFs-s3XSI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU5LCJpYXQiOjE3NDAwNjk2MDgsImV4cCI6MTc0MDA3MzIwOH0.hxEEUpACerJT37i1_LcsgQATqWsfE0y6V7uj_spYnqQ',30),(160,'12121','de872154ffbf91a5dcc0e539dd2d5106',4,1,4,'12121121',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYwLCJpYXQiOjE3NDAwNDg3ODcsImV4cCI6MTc0MDA1MDU4N30.LmHEWnkbl1FYeFx3dsNEN_VudRLBE9lqDtm7iRIh0lM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYwLCJpYXQiOjE3NDAwNDg3ODcsImV4cCI6MTc0MDA1MjM4N30.U1Q6rlFStjyPt5BftacN_bagMtUALF9gMjjQOJW9ZTc',NULL),(161,'50','c0c7c76d30bd3dcaefc96f40275bdc0a',1,1,2,'50',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJpYXQiOjE3NDAwNzQxNzUsImV4cCI6MTc0MDA3NTk3NX0.PjNBLt8xWRGIgdLWeboCemEqhP31Jvhg6IAcl12tTto','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJpYXQiOjE3NDAwNzQxNzUsImV4cCI6MTc0MDA3Nzc3NX0.tgsNcUrasdmYsAou304Q7F-HDp6GIF4vy6jv6y9ZpUk',NULL),(162,'10','d3d9446802a44259755d38e6d163e820',1,1,2,'10',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYyLCJpYXQiOjE3NDAwNzk2MzYsImV4cCI6MTc0MDA4MTQzNn0.CjDWl-gkRRnbo-uEQVPlqeH3ORR3VdwcMwGfseO-Eas','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYyLCJpYXQiOjE3NDAwNzk2MzYsImV4cCI6MTc0MDA4MzIzNn0.d85xUuP_1-IVEnm44jCXXEsM3D6G9NVeB_mPmKxYDYE',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oynananbolumler`
--

LOCK TABLES `oynananbolumler` WRITE;
/*!40000 ALTER TABLE `oynananbolumler` DISABLE KEYS */;
INSERT INTO `oynananbolumler` VALUES (38,161,1,'2025-02-20',1),(39,161,3,'2025-02-20',1),(40,161,4,'2025-02-20',1),(41,161,5,'2025-02-20',1),(42,161,7,'2025-02-20',1),(43,161,8,'2025-02-20',1),(44,161,9,'2025-02-20',1),(45,162,1,'2025-02-20',1),(46,162,3,'2025-02-20',1),(47,162,4,'2025-02-20',1),(48,162,5,'2025-02-20',1),(49,162,2,'2025-02-20',1),(50,162,6,'2025-02-20',1),(51,162,13,'2025-02-20',1),(52,162,7,'2025-02-20',1),(53,162,8,'2025-02-20',1),(54,162,9,'2025-02-20',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oynanantemelbolumler`
--

LOCK TABLES `oynanantemelbolumler` WRITE;
/*!40000 ALTER TABLE `oynanantemelbolumler` DISABLE KEYS */;
INSERT INTO `oynanantemelbolumler` VALUES (1,1,124,'2025-02-06',1,1),(2,1,124,'2025-02-06',1,2),(7,1,124,'2025-02-06',0,3),(1,1,141,'2025-02-06',1,4),(3,2,124,'2025-02-07',1,5),(12,4,124,'2025-02-07',1,6),(13,4,124,'2025-02-07',1,7),(2,1,141,'2025-02-07',1,8),(3,2,141,'2025-02-07',1,9),(12,4,141,'2025-02-07',1,10),(1,1,152,'2025-02-11',1,11),(3,2,152,'2025-02-11',1,12),(12,4,152,'2025-02-11',1,13),(14,4,124,'2025-02-11',1,14);
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sozluk`
--

LOCK TABLES `sozluk` WRITE;
/*!40000 ALTER TABLE `sozluk` DISABLE KEYS */;
INSERT INTO `sozluk` VALUES (32,141,23,'2025-02-05'),(33,158,41,'2025-02-11'),(34,124,16,'2025-02-11'),(35,124,9,'2025-02-11'),(36,124,10,'2025-02-11'),(37,124,NULL,'2025-02-11'),(38,159,14,'2025-02-20'),(39,159,21,'2025-02-20'),(40,159,9,'2025-02-20'),(41,159,22,'2025-02-20'),(42,159,27,'2025-02-20'),(43,159,20,'2025-02-20'),(44,159,31,'2025-02-20'),(45,159,16,'2025-02-20'),(46,159,32,'2025-02-20'),(47,159,10,'2025-02-20'),(48,159,24,'2025-02-20');
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
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `GirilenAd` varchar(45) DEFAULT NULL,
  `Tarih` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (17,'Nurihan',NULL),(18,'Selam','2025-02-11 00:00:00'),(19,'asd','2025-02-11 11:16:03'),(20,'Nuri','2025-02-11 11:32:42'),(21,'selam','2025-02-11 11:33:38'),(22,'Nurihan','2025-02-11 12:26:32'),(23,'','2025-02-11 14:28:13'),(24,'Adem','2025-02-11 14:34:31'),(25,'hamdi','2025-02-11 14:41:09'),(26,'kes','2025-02-11 14:43:02'),(27,'asd','2025-02-11 14:44:24'),(28,'NurihanK','2025-02-11 16:21:22'),(29,'NurihanLO','2025-02-11 16:59:38'),(30,'89','2025-02-19 20:07:57');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testsorulari`
--

DROP TABLE IF EXISTS `testsorulari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testsorulari` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TestID` int DEFAULT NULL,
  `KelimeID` int DEFAULT NULL,
  `dogruMu` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testsorulari`
--

LOCK TABLES `testsorulari` WRITE;
/*!40000 ALTER TABLE `testsorulari` DISABLE KEYS */;
INSERT INTO `testsorulari` VALUES (1,17,21,1),(2,17,17,1),(3,17,43,1),(4,17,57,1),(5,17,60,1),(6,17,61,1),(7,17,63,1),(8,17,65,1),(9,17,38,0),(10,17,56,0),(11,17,55,0),(12,17,66,0),(13,17,21,1),(14,17,17,1),(15,17,43,1),(16,17,57,1),(17,17,60,1),(18,17,61,1),(19,17,63,1),(20,17,65,1),(21,17,38,0),(22,17,56,0),(23,17,55,0),(24,17,66,0),(25,17,21,1),(26,17,17,1),(27,17,43,1),(28,17,57,1),(29,17,60,1),(30,17,61,1),(31,17,63,1),(32,17,65,1),(33,17,38,0),(34,17,56,0),(35,17,55,0),(36,17,66,0),(37,17,21,1),(38,17,17,1),(39,17,43,1),(40,17,57,1),(41,17,60,1),(42,17,61,1),(43,17,63,1),(44,17,65,1),(45,17,38,0),(46,17,56,0),(47,17,55,0),(48,17,66,0),(49,17,21,1),(50,17,17,1),(51,17,43,1),(52,17,57,1),(53,17,60,1),(54,17,61,1),(55,17,63,1),(56,17,65,1),(57,17,38,0),(58,17,56,0),(59,17,55,0),(60,17,66,0),(61,17,21,1),(62,17,17,1),(63,17,43,1),(64,17,57,1),(65,17,60,1),(66,17,61,1),(67,17,63,1),(68,17,65,1),(69,17,38,0),(70,17,56,0),(71,17,55,0),(72,17,66,0),(73,18,11,1),(74,18,40,1),(75,18,62,1),(76,18,12,0),(77,18,41,0),(78,18,53,0),(79,18,56,0),(80,18,58,0),(81,18,57,0),(82,18,61,0),(83,18,65,0),(84,18,67,0),(85,18,11,1),(86,18,40,1),(87,18,62,1),(88,18,12,0),(89,18,41,0),(90,18,53,0),(91,18,56,0),(92,18,58,0),(93,18,57,0),(94,18,61,0),(95,18,65,0),(96,18,67,0),(97,19,12,1),(98,19,41,1),(99,19,63,1),(100,19,66,1),(101,19,24,0),(102,19,42,0),(103,19,56,0),(104,19,54,0),(105,19,58,0),(106,19,57,0),(107,19,62,0),(108,19,68,0),(109,19,12,1),(110,19,41,1),(111,19,63,1),(112,19,66,1),(113,19,24,0),(114,19,42,0),(115,19,56,0),(116,19,54,0),(117,19,58,0),(118,19,57,0),(119,19,62,0),(120,19,68,0),(121,19,12,1),(122,19,41,1),(123,19,63,1),(124,19,66,1),(125,19,24,0),(126,19,42,0),(127,19,56,0),(128,19,54,0),(129,19,58,0),(130,19,57,0),(131,19,62,0),(132,19,68,0),(133,19,12,1),(134,19,41,1),(135,19,63,1),(136,19,66,1),(137,19,24,0),(138,19,42,0),(139,19,56,0),(140,19,54,0),(141,19,58,0),(142,19,57,0),(143,19,62,0),(144,19,68,0),(145,20,30,1),(146,20,64,1),(147,20,14,0),(148,20,37,0),(149,20,40,0),(150,20,56,0),(151,20,54,0),(152,20,59,0),(153,20,57,0),(154,20,63,0),(155,20,67,0),(156,20,68,0),(157,20,30,1),(158,20,64,1),(159,20,14,0),(160,20,37,0),(161,20,40,0),(162,20,56,0),(163,20,54,0),(164,20,59,0),(165,20,57,0),(166,20,63,0),(167,20,67,0),(168,20,68,0),(169,20,30,1),(170,20,64,1),(171,20,14,0),(172,20,37,0),(173,20,40,0),(174,20,56,0),(175,20,54,0),(176,20,59,0),(177,20,57,0),(178,20,63,0),(179,20,67,0),(180,20,68,0),(181,20,30,1),(182,20,64,1),(183,20,14,0),(184,20,37,0),(185,20,40,0),(186,20,56,0),(187,20,54,0),(188,20,59,0),(189,20,57,0),(190,20,63,0),(191,20,67,0),(192,20,68,0),(193,20,30,1),(194,20,64,1),(195,20,14,0),(196,20,37,0),(197,20,40,0),(198,20,56,0),(199,20,54,0),(200,20,59,0),(201,20,57,0),(202,20,63,0),(203,20,67,0),(204,20,68,0),(205,20,30,1),(206,20,64,1),(207,20,14,0),(208,20,37,0),(209,20,40,0),(210,20,56,0),(211,20,54,0),(212,20,59,0),(213,20,57,0),(214,20,63,0),(215,20,67,0),(216,20,68,0),(217,21,36,1),(218,21,38,1),(219,21,57,1),(220,21,62,1),(221,21,15,0),(222,21,33,0),(223,21,53,0),(224,21,55,0),(225,21,59,0),(226,21,61,0),(227,21,68,0),(228,21,66,0),(229,22,22,1),(230,22,13,1),(231,22,43,1),(232,22,39,1),(233,22,53,1),(234,22,54,1),(235,22,63,1),(236,22,66,1),(237,22,59,0),(238,22,57,0),(239,22,61,0),(240,22,68,0),(241,23,14,1),(242,23,38,1),(243,23,43,1),(244,23,59,1),(245,23,68,1),(246,23,12,0),(247,23,54,0),(248,23,55,0),(249,23,57,0),(250,23,64,0),(251,23,63,0),(252,23,66,0),(253,24,55,1),(254,24,59,1),(255,24,63,1),(256,24,13,0),(257,24,33,0),(258,24,37,0),(259,24,42,0),(260,24,54,0),(261,24,60,0),(262,24,64,0),(263,24,67,0),(264,24,68,0),(265,25,39,1),(266,25,56,1),(267,25,64,1),(268,25,61,1),(269,25,66,1),(270,25,16,0),(271,25,30,0),(272,25,38,0),(273,25,54,0),(274,25,60,0),(275,25,57,0),(276,25,65,0),(277,26,28,1),(278,26,39,1),(279,26,59,1),(280,26,67,1),(281,26,19,0),(282,26,36,0),(283,26,55,0),(284,26,56,0),(285,26,58,0),(286,26,61,0),(287,26,63,0),(288,26,66,0),(289,27,10,1),(290,27,38,1),(291,27,55,1),(292,27,59,1),(293,27,30,0),(294,27,41,0),(295,27,54,0),(296,27,57,0),(297,27,61,0),(298,27,62,0),(299,27,68,0),(300,27,67,0),(301,28,28,1),(302,28,55,1),(303,28,56,1),(304,28,57,1),(305,28,68,1),(306,28,12,0),(307,28,40,0),(308,28,42,0),(309,28,59,0),(310,28,62,0),(311,28,61,0),(312,28,66,0),(313,29,33,1),(314,29,41,1),(315,29,38,1),(316,29,58,1),(317,29,60,1),(318,29,68,1),(319,29,22,0),(320,29,53,0),(321,29,56,0),(322,29,63,0),(323,29,64,0),(324,29,67,0),(325,30,22,1),(326,30,39,1),(327,30,68,1),(328,30,67,1),(329,30,17,0),(330,30,40,0),(331,30,53,0),(332,30,55,0),(333,30,59,0),(334,30,60,0),(335,30,61,0),(336,30,64,0);
/*!40000 ALTER TABLE `testsorulari` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yanlisbilinenkelimeler`
--

LOCK TABLES `yanlisbilinenkelimeler` WRITE;
/*!40000 ALTER TABLE `yanlisbilinenkelimeler` DISABLE KEYS */;
INSERT INTO `yanlisbilinenkelimeler` VALUES (22,23,141,0,1,'2025-02-05'),(23,7,141,1,1,NULL),(24,5,141,1,1,NULL),(25,9,124,0,1,'2025-02-06'),(26,10,124,0,1,'2025-02-06'),(27,11,124,0,1,'2025-02-06'),(28,13,124,0,1,'2025-02-06'),(29,15,124,0,1,'2025-02-06'),(30,14,124,0,1,'2025-02-06'),(31,19,124,0,1,'2025-02-06'),(32,23,124,0,0,'2025-02-06'),(33,3,124,1,1,NULL),(34,4,124,1,1,NULL),(35,2,124,1,1,NULL),(36,17,124,1,1,NULL),(37,20,124,1,0,NULL),(38,3,141,1,1,NULL),(39,6,124,1,0,NULL),(40,5,124,1,1,NULL),(41,35,124,1,1,NULL),(42,33,124,1,1,NULL),(43,34,124,1,1,NULL),(44,7,152,1,1,NULL),(45,34,152,1,1,NULL),(46,18,124,1,1,NULL),(47,18,159,0,1,'2025-02-19'),(48,19,159,0,1,'2025-02-19'),(49,70,159,0,1,'2025-02-20'),(50,71,159,0,1,'2025-02-20'),(51,72,159,0,1,'2025-02-20'),(52,13,161,0,1,'2025-02-20'),(53,36,161,0,1,'2025-02-20'),(54,38,161,0,1,'2025-02-20'),(55,55,161,0,1,'2025-02-20'),(56,18,162,0,1,'2025-02-20'),(57,71,162,0,1,'2025-02-20'),(58,38,162,0,1,'2025-02-20'),(59,55,162,0,1,'2025-02-20'),(60,9,162,0,1,'2025-02-20'),(61,10,162,0,1,'2025-02-20');
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

-- Dump completed on 2025-02-20 22:52:14
