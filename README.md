# My Full-Stack Application

This repository contains a full-stack application built with Node.js, Express.js, React, and MongoDB. The application demonstrates various features, including a basic server setup, RESTful APIs, state management in React, and routing.

## Table of Contents

1. [Node.js](#nodejs)
2. [Express.js](#expressjs)
3. [React](#react)
4. [MongoDB](#mongodb)
5. [Express.js + MongoDB](#expressjs--mongodb)
6. [React + State Management](#react--state-management)
7. [React Routing](#react-routing)
8. [RESTful API Design](#restful-api-design)
9. [Getting Started](#getting-started)
10. [License](#license)

## Node.js

A basic Node.js server that listens on port 3000 and returns a "Hello, World!" message when the root URL is accessed.
Check the code in the file path \backend\server.js

### Code Snippet

```javascript
const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Express.js

A simple REST API using Express.js with a single route /users that returns a JSON list of users.

File Path:- backend\server.js

### Code Snippet

```javascript
const express = require('express');
const app = express();
const port = 3000;

const users = [
  { id: 1, name: "Alice", email: "alice@yopmail.com", age: 40 },
  { id: 2, name: "Bob", email: "bob@yopmail.com", age: 25 },
  { id: 3, name: "Charlie", email: "charlie@yopmail.com", age: 60 },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}/`);
});
```

## React

A basic React component that fetches the list of users from the /users API route and displays them in a table.

File Path:- \frontend\user-table\src\components\UserTable.js

### Code Snippet

```javascript
import React, { useEffect, useState } from 'react';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
```

## MongoDB

MongoDB schema for storing user data (name, email, age), and a script to insert a new user into the collection.

File Path:- backend\db.js

### Code Snippet

```const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```
File Path :- backend\inserUser.js

```const User = require('./user.model');

const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
});

user.save((err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`User created: ${user.name}`);
  }
});
```

