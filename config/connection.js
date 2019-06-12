//creates connection from Node to MySQL
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`Connected!`);
});

module.exports = connection;