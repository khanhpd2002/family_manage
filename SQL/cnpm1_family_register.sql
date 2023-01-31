-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cnpm1
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `family_register`
--

DROP TABLE IF EXISTS `family_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_register` (
  `number` int NOT NULL,
  `owner` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `ward` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_register`
--

LOCK TABLES `family_register` WRITE;
/*!40000 ALTER TABLE `family_register` DISABLE KEYS */;
INSERT INTO `family_register` VALUES (1,'Nguyễn Nam','Thành phố Hà Nội','Quận Cầu Giấy','Phường Quan Hoa','số 2'),(3,'Tiến Quang','Tỉnh Tuyên Quang','Huyện Lâm Bình','Xã Phúc Yên','số4'),(5,'Tiến Hoàng','Tỉnh Tuyên Quang','Huyện Lâm Bình','Xã Phúc Yên','số 4'),(10,'Tiến Dương','Thành phố Hà Nội','Quận Cầu Giấy','Phường Dịch Vọng','số 4'),(13,'Dương Tiến','Thành phố Hà Nội','Quận Hoàn Kiếm','Phường Hàng Buồm','số 22'),(23,'Hoang','Thành phố Hà Nội','Quận Ba Đình','Phường Phúc Xá',''),(24,'Dương Hoa','Thành phố Hà Nội','Quận Đống Đa','Phường Ô Chợ Dừa',''),(25,'Dương Giang','Tỉnh Hà Giang','Thành phố Hà Giang','Phường Trần Phú',''),(30,'hoa','Tỉnh Hà Giang','Huyện Đồng Văn','Xã Lũng Cú',''),(54,'hu','Tỉnh Tuyên Quang','Huyện Yên Sơn','Xã Trung Minh','');
/*!40000 ALTER TABLE `family_register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-31  8:29:10
