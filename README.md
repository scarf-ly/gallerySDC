# scarf.ly
Web page header for a restaurant reviews service, scarf.ly.


## APIs
`:id` stands for restaurantID

| HTTP Method  | Endpoint                       | Description
| -----------  | -----------------------------  | -------------
| GET          | /gallery/:id/                  | Retrieve image(s) for a specific restaurant (only images and users data)
| GET          | /gallery/:id/:imageID/:userID  | Retrieve image details for galleryView 
| POST         | /gallery/:id/:userID           | Insert image(s) for a specific restaurant with author's userID
| PATCH        | /gallery/:id/:imageID/:userID  | Update info for a specific image 
| DELETE       | /gallery/:id/                  | If thisrestaurnat id exists, delete image(s)


