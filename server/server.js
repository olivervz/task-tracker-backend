const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var tasks = [];

var ID = 2;

app.get("/tasks", (req, res) => {
  res.send({ tasks: tasks });
});

app.post("/addtask", (req, res) => {
  var body = req.body;
  var task = {
    name: body.task.name,
    date: body.task.date,
    description: body.task.description,
    ID: ID,
  };
  tasks.push(task);
  ++ID;
  res.send("Success");
});

app.delete("/:ID", (req, res) => {
  const ID = parseInt(req.params.ID);
  var newTasks = [];
  console.log(ID);
  console.log(tasks);
  for (var i = 0; i < tasks.length; ++i) {
    if (tasks[i].ID != ID) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  res.send("Success");
});

app.listen(port);
