const newrelic = require('newrelic');
const express = require ('express');
const app = express();
var compression = require('compression')
const path = require('path'); 
const bodyParser = require('body-parser');
const PORT = 3000;

const db = require ('./postgresDB/index.js');
const redis = require('redis');

var redisClient = redis.createClient();
app.use(compression());

redisClient.on('error', (err) => {
  console.log("Error " + err);
});

app.use(bodyParser.json())

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

var cacheImage = (req,res,next) => {
    let num = req.params.id;
    redisClient.get(num.toString(),(err,data)=>{
        if(err){
            res.status(500).send(err); 
        } 
        if(data !== null){
            res.send(JSON.parse(data))
        } else {
            next();
        }
    })
};

var cacheVote = (req,res,next) => {
    let imageid = req.params.imageID;
    redisClient.get(imageid.toString(),(err,data)=>{
        if(err){
            res.status(500).send(err); 
        } 
        if(data !== null){
            res.send(JSON.parse(data))
        } else {
            next();
        }
    })
};


app.get('/:id/gallery', cacheImage, (req, res) => {
    let num = req.params.id;
    db.pool.query(`select * from images,users where images.restaurantid=${num} and images.userid=users.id ;`, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            redisClient.set(num.toString(),JSON.stringify(data.rows))
            res.json(data.rows); 
        }
    })
});

app.get('/:id/gallery/:imageID/:userID', cacheVote, (req, res) => {
    let restaurant = req.params.id;
    let imageid = req.params.imageID;
    let userid = req.params.userID;
    db.pool.query(`select userid from ishelpful where imageid = ${imageid};`, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            redisClient.set(imageid.toString(),JSON.stringify(data.rows))
            res.json(data.rows); 
        }
    })
});

app.post('/:id/gallery', (req, res) => {
    let text = `insert into images(imageURL,imageCaption,userID,restaurantID,imageDate) values ($1,$2,$3,$4,$5) returning *`
    let values = [req.body.data[0],req.body.data[1],req.body.data[2],req.body.data[3],req.body.data[4]]
    db.pool.query(text, values, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } 
    })
    // console.log(req.params);
    // console.log('body',req.body)
});


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

