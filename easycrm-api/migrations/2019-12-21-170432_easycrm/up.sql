-- Your SQL goes here

CREATE TABLE customers (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(60) DEFAULT NULL,
  `legel_person_name` varchar(60) DEFAULT NULL,
  `legel_contract` varchar(60) DEFAULT NULL,
  `agent` varchar(60) DEFAULT NULL,
  `agent_contract` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `sisuation` varchar(255) DEFAULT NULL,
  `found_time` varchar(60) DEFAULT NULL,
  `business_scope` varchar(2000) DEFAULT NULL,
  `create_time` TIMESTAMP NOT NULL default now(),
  `update_time` TIMESTAMP NOT NULL default now(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = COMPACT;

CREATE TABLE progress  (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(60) DEFAULT NULL,
  `demands` varchar(2000) DEFAULT NULL,
  `process` int(8) NOT NULL default 0,
  `create_time`  TIMESTAMP NOT NULL default now(),
  `update_time` TIMESTAMP NOT NULL default now(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = COMPACT;

CREATE TABLE users  (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(2000) NOT NULL,
  `is_admin` TINYINT(1) NOT NULL DEFAULT 0,
  `token` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = COMPACT;