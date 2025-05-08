require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

// Add a porta client ou uma local server
const clientPort = process.env.CLIENT_PORT || 5173;
const origin = `http://localhost:${clientPort}`;

const port = process.env.PORT;

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// solve CORS
app.use(cors({ credentials: true, origin }));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//db connection
require("./config/db.js");

//routes
const router = require("./routes/Router");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});
