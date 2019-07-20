var faker = require('faker');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  database : 'munch',
  password: 'password'
});
 
connection.connect();


module.exports = connection; 
 
