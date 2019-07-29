const fs = require('fs');
var faker = require('faker');
const moment = require('moment');
// const db = require('./index.js');

var allUsers = [];

const userDataGenerator = (i) => {
  var userArr = [];
  var randomPicId = faker.random.number({min:1, max:500});
  var userID = i;
  var name = faker.name.findName(); 
  var userURL = `https://scarfly.s3-us-west-1.amazonaws.com/user/${randomPicId}.png`;
  var friends = faker.random.number({min:0, max:50000});
  var reviews = faker.random.number({min:0, max:10000});
  var elite = ["true","false"][faker.random.number({min:0, max:1})];
  userArr.push(userID,friends,name,reviews,userURL,elite);
  return userArr;
};
//Generate 10,000,000 users' info
for(var i=1; i<=10000000; i++){
  allUsers.push(userDataGenerator(i));
}


const imageDataGenerator = (i) => {
  var imageArr = [];
  var randomPicId = faker.random.number({min:1, max:1000});
  var imageid = i;
  var url = `https://scarfly.s3-us-west-1.amazonaws.com/food/${randomPicId}.png`;
  var caption = faker.lorem.words();
  var restaurantID = faker.random.number({min:1, max:10000000});
  var date = moment(faker.date.past(5)).format('YYYY-MM-DD');
  var userInfo = allUsers[faker.random.number({min:0, max:9999999})];
  var userID = userInfo[0]
  var friends = userInfo[1];
  var name = userInfo[2];
  var reviews = userInfo[3];
  var userURL  = userInfo[4];
  var elite = userInfo[5]
  imageArr.push(imageid,restaurantID,caption,date,url,userID,friends,name,reviews,userURL,elite);
  var images =  imageArr.join(',');
  images += '\n';
  return images;
}


const helpfulDataGenerator = (i) => {
  var helpArr = []
  var id = i;
  var ishelpful = 't';
  var imageid = faker.random.number({min:1, max:50000000});
  var userid = faker.random.number({min:1, max:10000000});
  helpArr.push(id,ishelpful,imageid,userid);
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
      data = imageDataGenerator(i);
      ok = writer.write(data, 'utf8');
      i++;
    } ;
    if (i < 50000000) {
      writer.once('drain', write);
    }
  }
}


/* WRITING HELPFUL DATA to CSV FILE */
const writeHelpfulTable = fs.createWriteStream('helpfulData.csv');
function writeHelpfulMTimes(writer) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    while (i <= 10000000 && ok) {
      data = helpfulDataGenerator(i);
      ok = writer.write(data, 'utf8');
      i++;
    } ;
    if (i < 10000000) {
      writer.once('drain', write);
    }
  }
}

writeImagesMTimes(writeImagesTable);
writeHelpfulMTimes(writeHelpfulTable)

