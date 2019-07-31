
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
  

-- COPY images (imageID,restaurantID,imageCaption,imageDate ,imageUrl ,userid ,userFriends ,userName ,userReviews ,userURL,userElite) FROM '/Users/yisun/Desktop/gallery_SDC/server/cassandraDB/imagesData.csv';


/* Table 'isHelpful'*/
Create table isHelpful(
  id int ,
  isHelpful Boolean,
  imageID int,
  userID int,
  PRIMARY KEY (imageID, userID)
);

-- COPY isHelpful (id,isHelpful,imageID,userID ) FROM '/Users/yisun/Desktop/gallery_SDC/server/cassandraDB/helpfulData.csv';
