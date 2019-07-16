const express = require ('express');
const app = express();
const path = require('path'); 
const PORT = 3000;
const db = require ('./db/index.js');


app.use('/:id', express.static('/Users/TinaLe/Documents/gallery/client/dist'));
// app.use('/restaurant', express.static('/Users/TinaLe/Documents/gallery/client/dist'))


app.get('/gallery/:id', (req, res) => {
    console.log("req ", req.params.id)
    db.query("SELECT * from users INNER JOIN images ON images.userID = users.id", (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            res.send(data); 
        }
    })
});


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

