var faker = require('faker');
var db = require('./index.js');

//Function to generate Users without Images Array

const seedUsers = () => {
  let users = [];
  let count = 0; 
  while (count < 20){
    users.push([faker.name.findName()]);  
    count++; 
  }
  return users; 
}; 

//Function to generate Users with Images Array 

const seedURLUsers = () => {
  let urlUsers = []; 
  for (let i = 1; i < 21; i++){
    urlUsers.push([faker.name.findName(), `https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users${i}.jpg`]); 
  };
  return urlUsers; 
};

//Function to generate Images Information Array 

const seedImages = () => {
  let images = [];
  for (let i = 1; i < 101; i++){
    images.push([`https://munch-gallery.s3-us-west-1.amazonaws.com/munch${i}.jpg`, faker.lorem.words(), Math.ceil(Math.random() * 40)]);
  }
  return images; 
}; 

//Function to populate database with users w/o images

const seedAllUsers = (callback) => {
  let users = seedUsers();
  let query = 'INSERT INTO users (name) VALUES ?';
  db.query (query, [users], (err)=>{
    if (err){
      console.log(err);
    } else {
      callback(); 
    }
  })
}; 

//Function to populate database with users w/ images

const seedAllURLUsers = (callback) => {
  let urlUsers = seedURLUsers();
  db.query ('insert into users (name, URL) values ?', [urlUsers], (err)=>{
    if (err){
      console.log(err);
    } else {
      callback(); 
    }
  })
}; 

//Function to populate database with images information 

const seedAllImages = (callback) => {
  let images = seedImages(); 
  db.query('insert into images (URL, caption, userID) values ?', [images], (err) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, 'Seeding successful');
      }
    })
};

//Seed Database with all functions

seedAllUsers(()=>seedAllURLUsers(()=>seedAllImages((err, message)=>{
  if (err){
    console.log(err);
  } else {
    console.log(message)
  }
  })));



