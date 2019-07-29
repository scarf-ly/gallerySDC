
/* Cassandra */
CREATE  KEYSPACE IF NOT EXISTS munch
WITH REPLICATION = { 
'class':'SimpleStrategy',
'replication_factor' : 1
} ;

/*Table images*/
Create table images(
  imageID int ,
  restaurantID int,
  imageCaption text,
  imageDate date,
  imageUrl text,
  userid int,
  userFriends int,
  userName text,
  userReviews int,
  userURL text,
  userElite boolean,
  PRIMARY KEY(restaurantID,imageID,userID)
);
  
  
-- query images by restaurantID
-- Create table images(
--   id int ,
--   imageUrl text,
--   imageCaption text,
--   userID text,
--   restaurantID int,
--   imageDate date,
--   PRIMARY KEY(restaurantID,id)
-- );

COPY images (imageID,restaurantID,imageCaption,imageDate ,imageUrl ,userid ,userFriends ,userName ,userReviews ,userURL,userElite) FROM '/Users/yisun/Desktop/gallery_SDC/server/cassandraDB/imagesData.csv';

-- /* Table users*/
-- Create table users(
--   userId int,
--   userName text,
--   userURL text,
--   friends int,
--   reviews int, 
--   elite Boolean,
--   images_id int,
--   PRIMARY KEY (images_id,userId)
-- );


/* Table 'isHelpful'*/
Create table isHelpful(
  id int ,
  isHelpful Boolean,
  imageID int,
  userID int,
  PRIMARY KEY (imageID, userID)
);

COPY isHelpful (id,isHelpful,imageID,userID ) FROM '/Users/yisun/Desktop/gallery_SDC/server/cassandraDB/helpfulData.csv';
