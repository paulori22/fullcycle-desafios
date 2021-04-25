const express = require("express");
const mysql = require("mysql");
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const db = mysql.createConnection(config);

db.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

const sql_create_table_people = `
CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)  ENGINE=INNODB;`;
db.query(sql_create_table_people);

const random_str = Math.random().toString(36).substring(7);
const sql_insert = `INSERT INTO people (name) VALUES ('${random_str}')`;
db.query(sql_insert);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  db.query("SELECT name FROM people", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    const list_html = result.map((row) => `<li>${row.name}</li>`).join(" ");
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${list_html}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
