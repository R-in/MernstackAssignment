// Import the HTTP module
const http = require("http");

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const hostname = "127.0.0.1";
const port = 3000;

// connection string
const uri = "mongodb+srv://mern:mernstack@cluster0.w9949.mongodb.net/";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create a User model
const User = mongoose.model("User", userSchema);

//Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //Set the respomse header
  res.setHeader("Content-Type", "text/plain");
  //Send the response body
  res.end("Hello, World!\n");
});

//Start the server and listen on the port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Define a JSON list of users
const users = [
  { id: 1, name: "Alice", email: "alice@yopmail.com", age: 40 },
  { id: 2, name: "Bob", email: "bob@yopmail.com", age: 25 },
  { id: 3, name: "Charlie", email: "charlie@yopmail.com", age: 60 },
];

// Define a route for /users that returns the JSON list of users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST /users route to create a new user
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;

    const user = new User({ name, email, age });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});


// GET /users/:email route to fetch user by email
app.get("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}/`);
});
