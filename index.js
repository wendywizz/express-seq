const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync Database
const dbJobboard = require("./app/jobboard/models")
dbJobboard.sequelize.sync({ force: true })

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API"});
});

// Ploylora Routes
require("./app/ploylora/routes/RStudentRoute.js")(app);

// Jobboard Routes

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})