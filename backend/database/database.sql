


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table mst_workflow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mst_workflow`;

CREATE TABLE `mst_workflow` (
  `mw_id` int(11) NOT NULL AUTO_INCREMENT,
  `mwt_id` int(11) DEFAULT NULL,
  `su_id` int(11) DEFAULT NULL,
  `mw_order` int(11) NOT NULL,
  `mw_status` enum('active','inactive') DEFAULT NULL,
  `mw_created_at` datetime DEFAULT NULL,
  `mw_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`mw_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES `mst_workflow` WRITE;
/*!40000 ALTER TABLE `mst_workflow` DISABLE KEYS */;

INSERT INTO `mst_workflow` (`mw_id`, `mwt_id`, `su_id`, `mw_order`, `mw_status`, `mw_created_at`, `mw_updated_at`) VALUES
	(3, 2, 5, 1, 'active', '2024-12-03 10:10:20', NULL),
	(4, 2, 5, 2, 'active', '2024-12-03 10:10:20', NULL),
	(5, 3, 5, 1, 'active', '2024-12-03 10:12:23', NULL),
	(10, 1, 1, 1, 'inactive', '2024-12-03 13:31:41', NULL);

/*!40000 ALTER TABLE `mst_workflow` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table mst_workflow_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mst_workflow_type`;

CREATE TABLE `mst_workflow_type` (
  `mwt_id` int(11) NOT NULL AUTO_INCREMENT,
  `mwt_name` varchar(64) DEFAULT NULL,
  `mwt_status` enum('active','inactive') DEFAULT NULL,
  `mwt_created_at` datetime DEFAULT NULL,
  `mwt_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`mwt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

LOCK TABLES `mst_workflow_type` WRITE;
/*!40000 ALTER TABLE `mst_workflow_type` DISABLE KEYS */;

INSERT INTO `mst_workflow_type` (`mwt_id`, `mwt_name`, `mwt_status`, `mwt_created_at`, `mwt_updated_at`) VALUES
	(1, 'อนุมัติครั้งที่ 1', 'active', '2024-12-03 09:00:00', '2024-12-03 09:00:00'),
	(2, 'อนุมัติครั้งที่ 2', 'active', '2024-12-03 09:00:00', '2024-12-03 09:00:00'),
	(3, 'อนุมัติครั้งที่ 3', 'active', '2024-12-03 09:00:00', '2024-12-03 09:00:00'),
	(4, 'อนุมัติครั้งที่ 4', 'active', '2024-12-03 09:00:00', '2024-12-03 09:00:00');

/*!40000 ALTER TABLE `mst_workflow_type` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table sys_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `sm_id` int(11) NOT NULL AUTO_INCREMENT,
  `sm_name` varchar(64) DEFAULT NULL,
  `sm_route` varchar(64) NOT NULL,
  `sm_icon` varchar(64) DEFAULT NULL,
  `sm_order` int(11) DEFAULT NULL,
  `sm_status` enum('active','inactive') DEFAULT 'active',
  `sm_created_at` datetime DEFAULT NULL,
  `sm_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;

INSERT INTO `sys_menu` (`sm_id`, `sm_name`, `sm_route`, `sm_icon`, `sm_order`, `sm_status`, `sm_created_at`, `sm_updated_at`) VALUES
	(8, 'Admin Control', '', 'bx bx-user', 2, 'active', '2024-11-22 15:31:35', NULL),
	(9, 'Settings', '/settings', 'bx bx-cog', 3, 'active', '2024-11-22 15:38:53', NULL),
	(10, 'Dashboard', '/', 'bx bx-home', 1, 'active', '2024-11-22 15:42:40', NULL);

/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table sys_permission_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_permission_detail`;

CREATE TABLE `sys_permission_detail` (
  `spd_id` int(11) NOT NULL AUTO_INCREMENT,
  `spg_id` int(11) DEFAULT NULL,
  `sm_id` int(11) DEFAULT NULL,
  `ss_id` int(11) DEFAULT NULL,
  `spd_status` enum('active','inactive') DEFAULT NULL,
  `spd_created_at` datetime DEFAULT NULL,
  `spd_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`spd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

LOCK TABLES `sys_permission_detail` WRITE;
/*!40000 ALTER TABLE `sys_permission_detail` DISABLE KEYS */;

INSERT INTO `sys_permission_detail` (`spd_id`, `spg_id`, `sm_id`, `ss_id`, `spd_status`, `spd_created_at`, `spd_updated_at`) VALUES
	(70, 2, 10, 0, 'active', '2024-12-02 10:30:51', '2024-12-02 10:30:51'),
	(71, 2, 9, 0, 'active', '2024-12-02 10:30:51', '2024-12-02 10:30:51'),
	(72, 1, 8, 9, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13'),
	(73, 1, 8, 10, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13'),
	(74, 1, 8, 8, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13'),
	(75, 1, 8, 11, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13'),
	(76, 1, 9, 0, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13'),
	(77, 1, 10, 0, 'active', '2024-12-02 15:52:13', '2024-12-02 15:52:13');

/*!40000 ALTER TABLE `sys_permission_detail` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table sys_permission_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_permission_group`;

CREATE TABLE `sys_permission_group` (
  `spg_id` int(11) NOT NULL AUTO_INCREMENT,
  `spg_name` varchar(64) DEFAULT NULL,
  `spg_status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `spg_created_at` datetime NOT NULL,
  `spg_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`spg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `sys_permission_group` WRITE;
/*!40000 ALTER TABLE `sys_permission_group` DISABLE KEYS */;

INSERT INTO `sys_permission_group` (`spg_id`, `spg_name`, `spg_status`, `spg_created_at`, `spg_updated_at`) VALUES
	(1, 'administrator', 'active', '2024-11-27 11:17:44', '2024-12-02 15:52:13'),
	(2, 'user', 'active', '2024-11-27 11:17:49', '2024-12-02 10:30:51'),
	(3, 'test', 'active', '2024-11-27 11:36:40', '2024-11-27 14:05:32');

/*!40000 ALTER TABLE `sys_permission_group` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table sys_submenu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_submenu`;

CREATE TABLE `sys_submenu` (
  `ss_id` int(11) NOT NULL AUTO_INCREMENT,
  `sm_id` int(11) DEFAULT NULL,
  `ss_name` varchar(64) DEFAULT NULL,
  `ss_route` varchar(64) DEFAULT NULL,
  `ss_order` int(11) DEFAULT NULL,
  `ss_status` enum('active','inactive') DEFAULT 'active',
  `ss_created_at` datetime DEFAULT NULL,
  `ss_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ss_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

LOCK TABLES `sys_submenu` WRITE;
/*!40000 ALTER TABLE `sys_submenu` DISABLE KEYS */;

INSERT INTO `sys_submenu` (`ss_id`, `sm_id`, `ss_name`, `ss_route`, `ss_order`, `ss_status`, `ss_created_at`, `ss_updated_at`) VALUES
	(8, 8, 'Manage Permission', '/manage/permission', 1, 'active', '2024-11-22 15:33:44', NULL),
	(9, 8, 'Manage Role', '/manage/role', 2, 'active', '2024-11-22 15:34:54', NULL),
	(10, 8, 'Manage User', '/manage/user', 3, 'active', '2024-11-28 09:29:18', NULL),
	(11, 8, 'Manage Workflow', '/manage/workflow', 4, 'active', '2024-12-02 10:33:23', NULL);

/*!40000 ALTER TABLE `sys_submenu` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table sys_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `su_id` int(11) NOT NULL AUTO_INCREMENT,
  `spg_id` int(11) NOT NULL,
  `su_username` varchar(64) DEFAULT NULL,
  `su_password` varchar(255) DEFAULT NULL,
  `su_firstname` varchar(64) DEFAULT NULL,
  `su_lastname` varchar(64) DEFAULT NULL,
  `su_email` varchar(64) DEFAULT NULL,
  `su_status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `su_created_at` datetime NOT NULL,
  `su_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`su_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;

INSERT INTO `sys_user` (`su_id`, `spg_id`, `su_username`, `su_password`, `su_firstname`, `su_lastname`, `su_email`, `su_status`, `su_created_at`, `su_updated_at`) VALUES
	(1, 1, 'user1', '$2b$10$SIlDdtVg9cqlJN7zqIF5j.DCSwx5knkyJaRlasHzg8eGd.fwfFf7e', 'admin', 'admin', 'admin@email.com', 'active', '2024-11-15 09:28:29', NULL),
	(5, 1, '51K0090', '2e172dc5efd92521bcaaf4b48d05862a', 'Chanachai', 'Tohmudbamrung', 'chanachai_t@tbkt.co.th', 'active', '2024-12-02 10:11:00', NULL);

/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


