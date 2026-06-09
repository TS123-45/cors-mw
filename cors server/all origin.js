var express = require("express");
var cors = require("cors");
var app = express();
const path = require("path");

//Enable All Requests
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

const publicpath = path.join(__dirname, "public");
console.log(publicpath);
app.use(express.static(publicpath));

app.get(/^\/(home(?:\.html)?)?$/, (req, res) => {
  res.sendFile(path.join(path.join(publicpath, "home.html")));
});

app.get(/^\/contact(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(path.join(publicpath, "contact.html")));
});

app.listen(3500, function () {
  console.log("CORS-enabled web server listening on port 3500");
});
