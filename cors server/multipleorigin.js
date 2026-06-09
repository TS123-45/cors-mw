var express = require("express");
var cors = require("cors");
var app = express();
const path = require("path");

// Enable multiple origin
const allowedOrigins = ["https://www.google.com","http://127.0.0.1:5500", "http://localhost:5500"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

// Disable cache (good for testing)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

const publicpath = path.join(__dirname, "public");

app.use(express.static(publicpath));

app.get(/^\/(home(?:\.html)?)?$/, (req, res) => {
  res.sendFile(path.join(publicpath, "home.html"));
});

app.get(/^\/contact(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(publicpath, "contact.html"));
});

app.listen(3500, function () {
  console.log("Server running on port 3500");
});
