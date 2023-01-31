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
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `other_name` varchar(50) DEFAULT NULL,
  `birthday` datetime NOT NULL,
  `family_number` int NOT NULL,
  `province` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `ward` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `place_of_birth` varchar(50) NOT NULL,
  `ethnic` varchar(50) DEFAULT NULL,
  `place_of_job` varchar(50) DEFAULT NULL,
  `identity_card` varchar(50) NOT NULL,
  `relationship_with_owner` enum('OWNER','WIFE','SON','DAUGHTER') NOT NULL,
  `note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `abc_idx` (`family_number`),
  CONSTRAINT `FK9iuy5kyo79hhgr5rk2rpnd6px` FOREIGN KEY (`family_number`) REFERENCES `family_register` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (12,'Hoang','','2022-05-25 00:00:00',23,'Thành phố Hà Nội','Quận Ba Đình','Phường Phúc Xá','abcd','fff','Kinh','sdfsf','026202000158','OWNER',''),(14,'hoa','','2022-05-25 00:00:00',30,'Tỉnh Bắc Kạn','Thành Phố Bắc Kạn','Xã Lũng Cú','h,mm','fff','Kinh','','026202000158','OWNER',''),(15,'hu','','2022-05-25 00:00:00',54,'Tỉnh Tuyên Quang','Thành phố Tuyên Quang','Xã Trung Minh','hmmm','hhh','Kinh','sdfsf','026202000158','OWNER',''),(16,'Khnh','','2022-05-25 00:00:00',23,'Thành phố Hà Nội','Quận Tây Hồ','Phường Phú Thượng','hmmm','fff','Kinh','sdfsf','026202000158','SON','');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-30 11:46:50
