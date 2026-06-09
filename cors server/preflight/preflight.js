var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DELETE ALLOWED
const allowDeleteCors = cors({
  origin: "http://127.0.0.1:5500",

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],
});

// DELETE BLOCKED
const blockDeleteCors = cors({
  origin: "http://127.0.0.1:5500",

  methods: ["GET", "POST", "PUT"],

  allowedHeaders: ["Content-Type", "Authorization"],
});

// OPTIONS for allowed delete
app.options(
  "/allow-delete/:id",
  allowDeleteCors
);

// OPTIONS for blocked delete
app.options(
  "/block-delete/:id",
  blockDeleteCors
);

const publicpath = path.join(__dirname, "public");

console.log(publicpath);

app.use(express.static(publicpath));

const pool = mysql.createPool({
  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  connectionLimit: 10,
});

const queryDatabase = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

app.get(/^\/deletepage(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(publicpath, "deletepage.html"));
});

app.delete(
  "/allow-delete/:id",

  allowDeleteCors,

  async (req, res) => {
    try {
      const deleteQuery = "DELETE FROM viewtable WHERE id = ?";

      await queryDatabase(deleteQuery, [req.params.id]);

      res.json({
        message: "DELETE allowed and completed successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting data",

        error: err.message,
      });
    }
  },
);

app.delete(
  "/block-delete/:id",

  blockDeleteCors,

  async (req, res) => {
    try {
      const deleteQuery = "DELETE FROM viewtable WHERE id = ?";

      await queryDatabase(deleteQuery, [req.params.id]);

      res.json({
        message: "This should never execute from browser",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting data",

        error: err.message,
      });
    }
  },
);

app.get("/testdb", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({
        message: "Database connection failed",

        error: err.message,
      });
    } else {
      res.status(200).json({
        message: "Database connected successfully!",
      });

      connection.release();
    }
  });
});

app.listen(3500, function () {
  console.log("CORS-enabled web server listening on port 3500");
});
