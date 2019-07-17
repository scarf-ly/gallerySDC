CREATE DATABASE IF NOT EXISTS munch;

use munch; 

-- ---
-- Table 'images'
-- 
-- ---

DROP TABLE IF EXISTS images;
		
CREATE TABLE images (
  id INTEGER NOT NULL AUTO_INCREMENT,
  URL VARCHAR(255) NULL DEFAULT NULL UNIQUE,
  caption VARCHAR(255) NULL DEFAULT NULL,
  userID INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'authors'
-- 
-- ---

DROP TABLE IF EXISTS users;
		
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL DEFAULT NULL,
  userURL VARCHAR(255) NULL DEFAULT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE images ADD FOREIGN KEY (userID) REFERENCES users (id);

