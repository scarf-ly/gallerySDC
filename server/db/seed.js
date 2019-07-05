var faker = require('faker');
var db = require('./index.js')

//SEED USERS

//users without images

const seedUsers = () => {
  let count = 0; 
  while (count < 20){
    db.query('insert into users (name) values (?)', [faker.name.findName()], (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('success');
      }
    })
    count++; 
  }
}

//user with images

const seedURLUser = (userURL) => {
  db.query('insert into users (name, URL) values (?, ?)', [faker.name.findName(), userURL], (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('success');
  }
})
};

//all users (with and without URL images)
const seedAllUsers = () => {
  for (let i = 1; i < 21; i++){
    seedURLUser(`https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users${i}.jpg`); 
  };
  seedUsers(); 
}; 

//Seed Images

const seedImage = (imageURL) => {
   db.query('insert into images (URL, caption, userID) values (?, ?, ?)', [imageURL, faker.lorem.words(), Math.ceil(Math.random() * 40)], (error) => {
  if (error) {
      console.log(error);
  } else {
    console.log('success');
  }
}
)};

const seedAllImages = () => {
  for (let i=1; i < 101; i++){
    seedImage(`https://munch-gallery.s3-us-west-1.amazonaws.com/munch${i}.jpg`)
  }
}; 

//Call all functions to seed database

const seedDatabase = () => {
  seedAllUsers(); 
  seedAllImages(); 
};

//Invoking function to seed database

seedDatabase(); 
