const fs = require('fs');
var faker = require('faker');
const moment = require('moment');
// const db = require('./index.js');

const imageDataGenerator = () => {
  var imageArr = [];
  var randomPicId = faker.random.number({min:1, max:1000})
  var url = `https://scarfly.s3-us-west-1.amazonaws.com/food/${randomPicId}.png`;
  var caption = faker.lorem.words();
  var userID = faker.random.number({min:1, max:500});
  var restaurantID = faker.random.number({min:1, max:10000000});
  var date = moment(faker.date.past(5)).format('YYYY-MM-DD');
  imageArr.push(url,caption,userID,restaurantID,date);
  var images =  imageArr.join(',');
  images += '\n';
  return images;
};


const userDataGenerator = () => {
  var userArr = []
  var randomPicId = faker.random.number({min:1, max:500})
  var name = faker.name.findName(); 
  var url = `https://scarfly.s3-us-west-1.amazonaws.com/user/${randomPicId}.png`;
  var friends = faker.random.number({min:0, max:50000});
  var reviews = faker.random.number({min:0, max:10000});
  var elite = ['true','false'][faker.random.number({min:0, max:1})];
  userArr.push(name,url,friends,reviews,elite);
  var users = userArr.join(',');
  users += '\n';
  return users;
};

const helpfulDataGenerator = () => {
  var helpArr = []
  var ishelpful = 'true';
  var imageid = faker.random.number({min:1, max:50000000});
  var userid = faker.random.number({min:1, max:10000000});
  helpArr.push(ishelpful,imageid,userid);
  var help = helpArr.join(',');
  help += '\n';
  return help;
}



/* WRITING IMAGE DATA to CSV FILE */
const writeImagesTable = fs.createWriteStream('imagesData.csv');
function writeImagesMTimes(writer) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    while (i <= 50000000 && ok) {
      data = imageDataGenerator();
      ok = writer.write(data, 'utf8');
      i++;
    } ;
    if (i < 50000000) {
      
      writer.once('drain', write);
    }
  }
}

/* WRITING USER DATA to CSV FILE */
const writeUsersTable = fs.createWriteStream('usersData.csv');
function writeUsersMTimes(writer) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    while (i <= 10000000 && ok) {
      data = userDataGenerator();
      ok = writer.write(data, 'utf8');
      i++;
    } ;
    if (i < 10000000) {
      writer.once('drain', write);
    }
  }
}

/* WRITING HELPFUL DATA to CSV FILE  */
const writeHelpfulTable = fs.createWriteStream('helpfulData.csv');
function writeHelpfulMTimes(writer) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    while (i <= 10000000 && ok) {
      data = helpfulDataGenerator();
      ok = writer.write(data, 'utf8');
      i++;
    } ;
    if (i < 10000000) {
      writer.once('drain', write);
    }
  }
}

writeImagesMTimes(writeImagesTable);
writeUsersMTimes(writeUsersTable);
writeHelpfulMTimes(writeHelpfulTable)
