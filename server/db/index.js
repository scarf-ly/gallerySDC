var faker = require('faker');


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'munch'
});
 
connection.connect();


module.exports = connection; 
 
