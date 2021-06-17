const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  res.json({ data: "data" });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
