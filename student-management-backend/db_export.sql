-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: student_activity_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `achievement_id` int NOT NULL AUTO_INCREMENT,
  `participation_id` int DEFAULT NULL,
  `prize` varchar(20) DEFAULT NULL,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`achievement_id`),
  KEY `participation_id` (`participation_id`),
  CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`participation_id`) REFERENCES `participation` (`participation_id`),
  CONSTRAINT `achievements_ibfk_2` FOREIGN KEY (`participation_id`) REFERENCES `participation` (`participation_id`),
  CONSTRAINT `chk_prize` CHECK ((`prize` in (_utf8mb4'Winner',_utf8mb4'Runner')))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,1,'Winner',10),(2,2,'Runner',5),(3,7,'Winner',10),(4,11,'Runner',5),(5,8,'Winner',10),(6,12,'Runner',5),(7,13,'Winner',10),(8,9,'Runner',5),(9,10,'Winner',10),(10,14,'Runner',5);
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(100) DEFAULT NULL,
  `activity_type` enum('Co','Extra') DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Coding Contest','Co','Programming competition'),(2,'Paper Presentation','Co','Technical presentation'),(3,'Debugging Challenge','Co','Code fixing contest'),(4,'Project Expo','Co','Project showcase'),(5,'Technical Quiz','Co','Knowledge test'),(6,'Football','Extra','Outdoor game'),(7,'Basketball','Extra','Team sport'),(8,'Dance','Extra','Cultural performance'),(9,'Music','Extra','Singing event'),(10,'Drama','Extra','Stage acting');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) NOT NULL,
  PRIMARY KEY (`dept_id`),
  UNIQUE KEY `dept_name` (`dept_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (6,'Civil'),(3,'Computer Science'),(1,'CSE'),(2,'ECE'),(4,'Electronics'),(5,'Mechanical');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int DEFAULT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `activity_id` (`activity_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`),
  CONSTRAINT `fk_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'Hackathon 2026','2026-05-10','Lab 1',1),(2,2,'Tech Presentation','2026-05-15','Seminar Hall',2),(3,3,'Debug Battle','2026-05-20','Lab 2',3),(4,4,'Project Expo 2026','2026-06-01','Main Hall',4),(5,5,'Quiz Fest','2026-06-05','Room 101',5),(6,6,'Football Tournament','2026-06-10','Ground',1),(7,7,'Basketball League','2026-06-12','Court',2),(8,8,'Dance Fest','2026-06-15','Auditorium',3),(9,9,'Music Night','2026-06-18','Open Stage',4),(10,10,'Drama Night','2026-06-20','Auditorium',5),(11,1,'Test Event','2026-05-20','Test Lab',1),(12,1,'vibe coding 2026','2026-04-20','seminar hall',5);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` int NOT NULL AUTO_INCREMENT,
  `faculty_name` varchar(50) DEFAULT NULL,
  `dept_id` int DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  KEY `dept_id` (`dept_id`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Anitha',1),(2,'Priyanka',2),(3,'Haritha',3),(4,'Sujitha',4),(5,'Vimal',1),(6,'Test Faculty',1);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `type` enum('Note','Question','Announcement') DEFAULT 'Note',
  `content_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participation` (
  `participation_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`participation_id`),
  KEY `student_id` (`student_id`),
  KEY `idx_participation_event` (`event_id`),
  CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `participation_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `participation_ibfk_4` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participation`
--

LOCK TABLES `participation` WRITE;
/*!40000 ALTER TABLE `participation` DISABLE KEYS */;
INSERT INTO `participation` VALUES (1,1,1,'Participant','Completed'),(2,2,1,'Participant','Completed'),(3,3,2,'Participant','Completed'),(4,4,3,'Participant','Completed'),(5,5,4,'Participant','Registered'),(6,6,5,'Participant','Completed'),(7,7,6,'Participant','Completed'),(8,8,7,'Participant','Completed'),(9,9,8,'Participant','Registered'),(10,10,9,'Participant','Completed'),(11,1,6,'Participant','Completed'),(12,2,7,'Participant','Completed'),(13,3,8,'Participant','Completed'),(14,4,9,'Participant','Completed'),(16,13,12,'Participant','Completed');
/*!40000 ALTER TABLE `participation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_registration_log` AFTER INSERT ON `participation` FOR EACH ROW BEGIN
  INSERT INTO registration_log(student_id, event_id, registration_date)
  VALUES (NEW.student_id, NEW.event_id, NOW());
END */;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `registration_log`
--

DROP TABLE IF EXISTS `registration_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `student_id` (`student_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `registration_log_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `registration_log_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_log`
--

LOCK TABLES `registration_log` WRITE;
/*!40000 ALTER TABLE `registration_log` DISABLE KEYS */;
INSERT INTO `registration_log` VALUES (1,1,1,'2026-04-19 12:25:32'),(2,2,1,'2026-04-19 12:25:32'),(3,3,2,'2026-04-19 12:25:32'),(4,4,3,'2026-04-19 12:25:32'),(5,5,4,'2026-04-19 12:25:32'),(6,6,5,'2026-04-19 12:25:32'),(7,7,6,'2026-04-19 12:25:32'),(8,8,7,'2026-04-19 12:25:32'),(9,9,8,'2026-04-19 12:25:32'),(10,10,9,'2026-04-19 12:25:32'),(11,1,6,'2026-04-19 12:25:32'),(12,2,7,'2026-04-19 12:25:32'),(13,3,8,'2026-04-19 12:25:32'),(14,4,9,'2026-04-19 12:25:32'),(16,1,1,'2026-04-19 17:07:26'),(17,13,12,'2026-04-20 18:53:50');
/*!40000 ALTER TABLE `registration_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `student_event_view`
--

DROP TABLE IF EXISTS `student_event_view`;
/*!50001 DROP VIEW IF EXISTS `student_event_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_event_view` AS SELECT 
 1 AS `name`,
 1 AS `event_name`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `dept_id` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email` (`email`),
  KEY `dept_id` (`dept_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`),
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`),
  CONSTRAINT `students_chk_1` CHECK ((`year` between 1 and 4))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Sharmitha',1,2,'sharmitha@gmail.com'),(2,'Soumitha',1,3,'soumitha@gmail.com'),(3,'Samyuktha',2,1,'samyuktha@gmail.com'),(4,'Rubiga',2,2,'rubiga@gmail.com'),(5,'Rofina',3,4,'rofina@gmail.com'),(6,'Sanjana',1,1,'sanjana@gmail.com'),(7,'Savitha',4,3,'savitha@gmail.com'),(8,'Riya',3,2,'riya@gmail.com'),(9,'Shahul',2,4,'shahul@gmail.com'),(10,'Selva',4,1,'selva@gmail.com'),(11,'Test Student',1,2,'test@example.com'),(13,'sharnika',3,2,'sharni@gmail.com');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `student_event_view`
--

/*!50001 DROP VIEW IF EXISTS `student_event_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_event_view` AS select `s`.`name` AS `name`,`e`.`event_name` AS `event_name`,`p`.`status` AS `status` from ((`students` `s` join `participation` `p` on((`s`.`student_id` = `p`.`student_id`))) join `events` `e` on((`p`.`event_id` = `e`.`event_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 11:27:20
