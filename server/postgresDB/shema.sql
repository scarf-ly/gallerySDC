/* Postgres */

CREATE DATABASE IF NOT EXISTS munch;
    WITH ENCODING='UTF8';
use munch; 

/*Table images*/

DROP TABLE IF EXISTS images;
		
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  imageURL VARCHAR NOT NULL,
  imageCaption VARCHAR NOT NULL, 
  userID INTEGER NOT NULL,
  restaurantID INTEGER NOT NULL,
  imageDate DATE NOT NULL
);

/* Table users*/

DROP TABLE IF EXISTS users;
		
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR NOT NULL,
  userURL VARCHAR NOT NULL,
  friends INTEGER NOT NULL,
  reviews INTEGER NOT NULL, 
  elite BOOLEAN NOT NULL
);

/* Table ishelpful*/

DROP TABLE IF EXISTS isHelpful;
		
CREATE TABLE isHelpful (
  id SERIAL PRIMARY KEY,
  checkHelpful BOOLEAN,
  imageID INTEGER NOT NULL,
  userID INTEGER NOT NULL
);

ALTER TABLE images ADD FOREIGN KEY (userID) REFERENCES users (id);
ALTER TABLE isHelpful ADD FOREIGN KEY (imageID) REFERENCES images (id);
ALTER TABLE isHelpful ADD FOREIGN KEY (userID) REFERENCES users (id);