const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri =
  "mongodb+srv://harshhelaiya5:Justin%40007@cluster0.eyqbbzz.mongodb.net/?retryWrites=true&w=majority";

  const schema = new mongoose.Schema({
    name: String
  });

  const TestModel = mongoose.model('Test', schema);

async function connect() {

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    await TestModel.collection.insertOne({ name: 'Harsh Helaiya', description:'Testing Working or not' });
  } catch (error) {
    console.error(error);
  }
}

connect(); 

app.listen(3000, () => {
  console.log("Server started on port 8000");
});