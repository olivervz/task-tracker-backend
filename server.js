const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var tasks = [
  {
    name: "Get groceries",
    date: "August 7th",
    description: "get groceries from the store",
    ID: 0,
  },
  {
    name: "Go to class",
    date: "August 8th",
    description: "Go to class you bum",
    ID: 1,
  },
];

app.get("/tasks", (req, res) => {
  res.send({ tasks: tasks });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
