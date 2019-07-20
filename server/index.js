const express = require ('express');
// var compression = require('compression');
const app = express();
const path = require('path'); 
const PORT = 3000;
const db = require ('./db/index.js');

// app.use(compression());
app.use('/:id', (path.resolve(__dirname, '..', 'client', 'dist')));


app.get('/gallery/:id', (req, res) => {
    let split = req.params.id.split('');
    let num = split[split.length - 1];
    console.log(num);
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

