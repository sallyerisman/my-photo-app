-- --------------------------------------------------------
-- Host:                         eu-cdbr-west-03.cleardb.net
-- Server version:               5.6.47-log - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table heroku_cf8fb27c9f52f29.albums
DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table heroku_cf8fb27c9f52f29.albums: ~6 rows (approximately)
DELETE FROM `albums`;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
	(1, 'Fruit', 2),
	(2, 'Wonderful animals', 4),
	(3, 'Umbrellas', 3),
	(4, 'Buildings', 1),
	(7, 'Birds', 1),
	(8, 'Cats', 4);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

-- Dumping structure for table heroku_cf8fb27c9f52f29.albums_photos
DROP TABLE IF EXISTS `albums_photos`;
CREATE TABLE IF NOT EXISTS `albums_photos` (
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table heroku_cf8fb27c9f52f29.albums_photos: ~32 rows (approximately)
DELETE FROM `albums_photos`;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;
INSERT INTO `albums_photos` (`photo_id`, `album_id`) VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 2),
	(7, 2),
	(8, 2),
	(9, 2),
	(10, 2),
	(11, 3),
	(12, 3),
	(13, 3),
	(14, 3),
	(15, 3),
	(19, 2),
	(21, 2),
	(23, 2),
	(22, 2),
	(8, 6),
	(20, 6),
	(21, 6),
	(23, 6),
	(27, 6),
	(28, 6),
	(29, 6),
	(30, 6),
	(6, 6),
	(8, 8),
	(27, 8),
	(28, 8),
	(29, 8);
/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;

-- Dumping structure for table heroku_cf8fb27c9f52f29.photos
DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- Dumping data for table heroku_cf8fb27c9f52f29.photos: ~31 rows (approximately)
DELETE FROM `photos`;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
	(1, 'Tangerine', 'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60', NULL, 2),
	(2, 'Grapefruit', 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 2),
	(3, 'Banana', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This is a yellow banana.', 2),
	(4, 'Apple', 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 2),
	(5, 'Lemon', 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This is a yellow lemon.', 2),
	(6, 'Fox', 'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This is a fox.', 4),
	(7, 'Elephant', 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=6', NULL, 4),
	(8, 'Cat', 'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This is a cat.', 4),
	(9, 'Jellyfish', 'https://images.unsplash.com/photo-1495012379376-194a416fcc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(10, 'Sheep', 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(11, 'Yellow umbrella', 'https://images.unsplash.com/photo-1499678450342-29ebee16d1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This umbrella is yellow.', 3),
	(12, 'Black umbrella', 'https://images.unsplash.com/photo-1541697183324-e15d407c91cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 3),
	(13, 'Pink umbrella', 'https://images.unsplash.com/photo-1570390573732-32d5c7aaf3e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This umbrella is pink.', 3),
	(14, 'Rainbow-colored umbrella', 'https://images.unsplash.com/photo-1509216701163-b79cd826e0a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 3),
	(15, 'Clear umbrella', 'https://images.unsplash.com/photo-1516469727881-f4458e7cee17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 3),
	(16, 'Melon', 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This is a melon.', 2),
	(19, 'Monkey', 'https://images.unsplash.com/photo-1536146021566-627ce3c4d813?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'Hi there, I\'m a monkey.', 4),
	(20, 'Angry cat', 'https://images.unsplash.com/photo-1531704118376-ec637130bfa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(21, 'Happy cat', 'https://images.unsplash.com/photo-1531549216498-80e1dc380632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(23, 'Tiny cat', 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(25, 'Black lamp', 'https://images.unsplash.com/photo-1574103188526-4faaa363a358?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(26, 'Yellow lamp', 'https://images.unsplash.com/photo-1526319460291-c0b235f54886?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(27, 'Worried cat', 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'This cat is very worried...', 4),
	(28, 'Playing cat', 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(29, 'Stretching cat', 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(30, 'Butterfly cat', 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4),
	(33, 'Colorful spoons', 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 1),
	(34, 'Wooden spoons', 'https://images.unsplash.com/photo-1544391125-b8c805f25873?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 1),
	(35, 'Silver spoon', 'https://images.unsplash.com/photo-1542326237-94b1c5a538d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 1),
	(36, 'Fluffy cat', 'https://images.unsplash.com/photo-1568506759658-7d8f4bee0927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', 'OMG, this cat is fluffy.', 4),
	(37, 'Curious cat', 'https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60', NULL, 4);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;

-- Dumping structure for table heroku_cf8fb27c9f52f29.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table heroku_cf8fb27c9f52f29.users: ~5 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
	(1, 'slim.charles@thewire.com', '$2a$10$H6QoatNUrresVAYqfJvZqeki8/7DFf.sGkiFBGoOrPYwdEOg/.NQC', 'Slim', 'Charles'),
	(2, 'kima.greggs@thewire.com', '$2a$10$ikye1WcvuhXg6ttDnAF5Qe12eAe6CpgwKPmSU27EeJU9waEMJOH12', 'Kima', 'Greggs'),
	(3, 'bubs.bubbles@thewire.com', '$2a$10$arJn7FdCDeqJpXng9sNQXOuXEc3NY4t7/LwsT3FoqdOgwpqpnEc6.', 'Bubs', 'Bubbles'),
	(4, 'omar.little@thewire.com', '$2a$10$rA731wgUmpCPCn/DeMMJRer4EIKj8eWNRfz8ZIjWmf4/biTLMGe0q', 'Omar', 'Little'),
	(5, 'lester.freeman@thewire.com', '$2a$10$ZJfH2S50LLiJ84DU1hTAweJVkxFpGvRo9yg6XIQMFHN2kD2QjPlKW', '', '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
