const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  next()
})

// Sync Database
/*const syncLocal = require("./app/models/orm").local
syncLocal.sync({ force: true })*/

// Add Routes
require("./app/routes/RegisterRoute.js")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})