const express = require ('express');
const app = express();
const path = require('path'); 
const PORT = 3000;
const db = require ('./db/index.js');


app.use(express.static('/Users/TinaLe/Documents/gallery/client/dist'))

app.get('/gallery', (req, res)=>{
    db.query("SELECT * from users INNER JOIN images ON images.userID = users.id", (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            res.send(data); 
        }
    })
})


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

