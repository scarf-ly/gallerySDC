const express = require ('express');
const app = express();
const path = require('path'); 
const PORT = 3000;


app.use(express.static('/Users/TinaLe/gallery/client/dist'))


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))

