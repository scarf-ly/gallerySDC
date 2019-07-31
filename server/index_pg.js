const express = require ('express');
const app = express();
// var compression = require('compression')
const path = require('path'); 
const PORT = 3000;
const db = require ('./postgresDB/index.js');
// app.use(compression());
app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/:id/gallery', (req, res) => {
    let num = req.params.id;
    db.pool.query(`select * from images,users where images.restaurantid=${num} and images.userid=users.id ;`, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            res.json(data.rows); 
        }
    })
});

app.get('/:id/gallery/:imageID/:userID', (req, res) => {
    let restaurant = req.params.id;
    let imageid = req.params.imageID;
    let userid = req.params.userID;
    db.pool.query(`select userid from ishelpful where imageid = ${imageid};`, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            res.json(data.rows); 
        }
    })
});


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

