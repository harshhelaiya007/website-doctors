const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

// Connect to database
mongoose.connect(
  "mongodb+srv://harshhelaiya5:Justin%40007@cluster0.eyqbbzz.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (error) => {
  console.log("Connection Faild");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connection successful");
});

// Middleware
app.use(express.json());
const fileupload = require("express-fileupload")

app.use(fileupload())

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json", limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(cors()); // Add CORS middleware

app.use(
  cors({
    origin: "*",
  })
);

// Routes
const registerRoute = require("./src/api/register");
const loginRoute = require("./src/api/login");
const logoutRoute = require("./src/api/logout");
const formRoute = require("./src/api/form");
const doctorsDetails = require("./src/api/doctos");
const uploadImage = require("./src/api/image");
const getImage = require("./src/api/get_image");

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/forms", formRoute);
app.use("/doctors", doctorsDetails);
app.use("/upload", uploadImage);
app.use("/image", getImage);


// DELETE API to delete a doctor by ID
app.delete('/doctors/:name', (req, res) => {
  const reqName = req.params.name;

  // Find and delete the document by ID
  mongoose.connection.db.collection('doctors').deleteOne({ name: reqName }, function (err, result) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    if (result.deletedCount === 0) {
      res.status(404).send('Document not found');
      return;
    }

    res.send(`Deleted ${result.deletedCount} document(s)`);
  });
});

app.delete('/doctors/:id', doctorsDetails);


app.listen(80, () => console.log("Server running on port 80"));

// Load react build
app.use(express.static("frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
