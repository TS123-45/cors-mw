var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

// Disable cache (good for testing)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

const publicpath = path.join(__dirname, "public");

app.use(express.static(publicpath));

app.get(/^\/(home(?:\.html)?)?$/, cors(corsOptions), (req, res) => {
  res.sendFile(path.join(publicpath, "home.html"));
});

app.get(/^\/contact(?:\.html)?$/,
  cors({ origin: "http://localhost:3500", optionsSuccessStatus: 200 }),(req, res) => {
    res.sendFile(path.join(publicpath, "contact.html"));
  },
);

app.listen(3500, function () {
  console.log("CORS-enabled web server listening on port 3500");
});
