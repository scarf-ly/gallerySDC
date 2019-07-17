const faker = require('faker');
const db = require('./index.js');
const moment = require('moment');


//Function to generate Users without Images Array

// const seedUsers = () => {
//   let users = [];
//   let count = 0; 
//   while (count < 20){
//     users.push([faker.name.findName()]);  
//     count++; 
//   }
//   return users; 
// }; 

//Function to generate Users with Images Array 

const seedURLUsers = () => {
  let urlUsers = []; 
  for (let i = 1; i < 60; i++){
    urlUsers.push([faker.name.findName(), `https://munch-gallery.s3-us-west-1.amazonaws.com/Users1/user${i}.jpg`, Math.ceil(Math.random() * 120), Math.ceil(Math.random() * 120), Math.floor(Math.random() * 2)]); 
  };
  return urlUsers; 
};

//Function to generate Images Information Array 

// const seedImages = () => {
//   let images = [];
//   for (let i = 1; i < 101; i++){
//     images.push([`https://munch-gallery.s3-us-west-1.amazonaws.com/munch${i}.jpg`, faker.lorem.words(), Math.ceil(Math.random() * 40)]);
//   }
//   return images; 
// }; 


const seedImages = () => {
  let images = [];
  let date;
  for (let i = 1; i < 200; i++){
    date = moment(faker.date.past(5)).format('MMMM D[,] YYYY');
    images.push([`https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch${i}.jpg`, faker.lorem.words(), Math.ceil(Math.random() * 20), date, Math.floor(Math.random() * 10)]);
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
  db.query ('insert into users (name, userURL, friends, stars, elite) values ?', [urlUsers], (err)=>{
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
  db.query('insert into images (URL, caption, userID, date, assign) values ?', [images], (err) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, 'Seeding successful');
      }
    })
};

//Seed Database with all functions

// seedAllUsers(()=>seedAllURLUsers(()=>seedAllImages((err, message) => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log(message)
//   }
//   })));

seedAllURLUsers(()=>seedAllImages((err, message) => {
  if (err){
    console.log(err);
  } else {
    console.log(message)
  }
  }));




