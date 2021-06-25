const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tasksdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM tasks ORDER BY date";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const datestring = req.body.date;
  const date = new Date(req.body.date);
  const sqlInsert =
    "INSERT INTO tasks (name, date, datestring, description) VALUES (?,?,?,?);";
  db.query(sqlInsert, [name, date, datestring, description], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const value = req.body.value;
  const field = req.body.field;
  const id = req.body.id;
  console.log(value, field, id);
  var sqlUpdate = "";
  if (field === "name") {
    sqlUpdate = "UPDATE tasks SET name = ? WHERE id = ?";
  } else if (field === "datestring") {
    sqlUpdate = "UPDATE tasks SET datestring = ? WHERE id = ?";
  } else {
    sqlUpdate = "UPDATE tasks SET description = ? WHERE id = ?";
  }

  db.query(sqlUpdate, [value, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
