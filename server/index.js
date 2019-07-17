const express = require ('express');
const app = express();
const path = require('path'); 
const PORT = 3000;
const db = require ('./db/index.js');


app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));


app.get('/gallery/:id', (req, res) => {
    let num = req.params.id.split('')[1];
    db.query(`SELECT * from users INNER JOIN images ON images.userID = users.id AND assign = ${num}`, (err, data)=>{
        if (err) {
            res.status(500).send(err); 
        } else {
            res.send(data); 
        }
    })
});

console.log()

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

