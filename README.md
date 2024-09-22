# MERN Developer Assignment

This repository contains a full-stack application built with Node.js, Express.js, React, and MongoDB. The application demonstrates various features, including a basic server setup, RESTful APIs, state management in React, and routing.

## Table of Contents for MERN Stack (MongoDB, Express.js, React, Node.js)

1. [Node.js](#nodejs)
2. [Express.js](#expressjs)
3. [React](#react)
4. [MongoDB](#mongodb)
5. [Express.js + MongoDB](#expressjs--mongodb)
6. [React + State Management](#react--state-management)
7. [React Routing](#react-routing)
8. [RESTful API Design](#restful-api-design)
   [Getting Started](#getting-started)
   [License](#license)

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

## Express.js + MongoDB 

An Express.js route to fetch a user by their email from the MongoDB database.

File Path:- backend\server.js

### Code Snippet

```
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
```

## React + State Management

A form component in React that allows users to submit their name, email, and age. On submission, send the data to the backend API and update the state to display the new user.

File Path:- frontend\user-table\src\components\UserForm.js

### Code Snippet

```
const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" type="number" required />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## React Routing

The give code explain how React Router in an application to navigate between Home page and the user page.

File Path:- frontend\user-table\src\components\Navbar.js

### Code Snippet

```
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </nav>
    );
};
```

## RESTful API Design

Design and implement a REST API in Express.js for a simple blog application with routes for creating, reading, updating, and deleting blog posts.

Also attached is swagger to run API.

File Path:- blog-api\server.js

### Code Snippet

```
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./Post');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create a new post
app.post('/posts', async (req, res) => {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a post by ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a post by ID
app.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

## Getting Started

To get started with this application:
1. Clone the repository.
2. Install the dependencies for both the backend and frontend.
3. Set up your MongoDB database.
4. Run the backend server and frontend React app.
5. Access the application in your browser.

Github Repo:- https://github.com/R-in/MernstackAssignment/tree/master

## License
This project is licensed under the MIT License.


# Application with Docker

nodejs-docker-web-app folder demonstrates how to containerizes a Node.js Express application using Docker and Docker Compose while integrating a MongoDB database. It covers the creation of a Dockerfile, Docker Compose configuration, and the advantages of using Docker for a MERN stack application.

## Table of Contents for Docker

9. [Basic Dockerfile](#basic-dockerfile)
10. [Docker Compose](#docker-compose)
11. [Docker Networking](#docker-networking)
12. [Containerization](#containerization)
   [Getting Started](#getting-started)

## Basic Dockerfile
Q.  Write a Dockerfile for a Node.js Express application that installs dependencies and runs the server on port 3000.

Ans. Before I begin, firstly I check whether Docker is installed in my system or not.

### Step1. 
Creating a simple Node.js and Express.js application. Create a file name app.js and added a code below:-

### Code Snippet

```
const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("Hello World");
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});
```
Run "npm init" and "npm install express" in the terminal. This will initialize the basic Node.js project.

### Step2.
Next, create a Dockerfile to specify how to build our Docker image. Create a file named Dockerfile in the same directory as my app.js file and add the following content:

### Dockerfile

```dockerfile
# Use the official Node.js image
FROM node:19-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000
```
### Step3. Building a Docker Image
Now my Dockerfile is ready, let’s build the Docker image. Open a terminal, navigate to the directory containing your Dockerfile, and run the following command:
```
docker build -t node-application
```
This command builds a Docker image named node-application based on the instructions in my Dockerfile.

### Step4. Running the Docker Container
Docker image but, I can run a Docker container based on this image.Run the following command in my terminal:
```
docker run -it -p 9000:3000 node-application
```
### Step5. Testing the Dockerized Application
Now my Docker container is up and running, let’s test our Node.js and Express.js API applications by accessing it through a web browser.

* Open Google Chrome or any web browser of your choice.
* In the address bar, type localhost:9000

## Docker Compose

Using Docker Compose, I can create a configuration file to set up a multi-container application with a Node.js server and a MongoDB database.

### docker-compose.yml

```
version: '3.9'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - MONGODB_URI=mongodb://db:27017/mydatabase

  db:
    image: mongo
    ports:
      - "27017:27017"
```
## Docker Networking

Docker Compose automatically creates a network for my containers to communicate with each other. In this configuration, the Node.js application (web) can connect to the MongoDB database (db) using the service name db as the hostname.

For Example: In my Node.js application, I can use the environment variable MONGODB_URI to connect to MongoDB.

### Code Snippet
```
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));
```

## Containerization

Using Docker for deploying a MERN Stack application provides several advantages, including:
* Environment Consistency: Docker ensures that the application runs in the same environment across different machines, eliminating "it works on my machine" issues.
* Isolation: Each component (Node.js, MongoDB) runs in its own container, providing clear separation and reducing the risk of dependency conflicts.
* Portability: Docker containers are portable across environments, making deploying the application on different machines easy.
* Scalability: Docker makes it easier to scale components independently. We can quickly spin up additional instances of your Node.js server or MongoDB as needed.
* Efficient use of resources: Containers use fewer resources than virtual machines, making them more efficient.
* Simplified CI/CD: Docker integrates well with CI/CD pipelines, allowing automated testing and deployment processes.

A real-world use case in which Docker enhances development workflows is in a continuous integration and deployment (CI/CD) pipeline. Docker allows developers to create a consistent environment for testing and deployment, ensuring that the application works as expected in different environments.

For example, a developer can create a Docker image for the application and push it to a registry like Docker Hub. The CI/CD pipeline can then pull the image and run it in a container, ensuring that the application is tested and deployed consistently across different environments.

## Getting Started

To get started with this application:

1. Clone the repository.
2. Open nodejs-docker-web-app.
3. Ensure you have Docker and Docker Compose installed.
4. Run the following command to build and start the containers:

```
docker-compose up
```
5. Access the application in your browser at http://localhost:3000.



# Git and CI/CD Guide

This document provides an overview of basic Git commands, a common branching strategy, instructions for resolving merge conflicts, and setting up a CI/CD pipeline using GitHub Actions for a Node.js application.

## Table of Contents for GitHub and Version Control

13. [Basic Git Commands](#basic-git-commands)
14. [Branching Strategy](#branching-strategy)
15. [Merging and Resolving Conflicts](#merging-and-resolving-conflicts)
16. [CI/CD Integration](#cicd-integration)

## Basic Git Commands

### Steps to Initialize a Repository, Make a Commit, and Push Code to GitHub

1. **Initialize a new Git repository**:
   ```bash
   git init
2.  **Add Files to the staging area**:
    ```git add. ```
3. **Make a commit**:
    ``` git commit -m "Initial commit"```
4. **Add a remote repository**:
   ```bash
    git remote add origin https://github.com/username/repository.git
5. **Push code to GitHub**:
   ```git push -u origin master```

Replace username and repository.git with my actual GitHub username and repository name.

## Branching Strategy

The GitFlow branching strategy is a common approach used in software development teams. It involves the following branches:

* master: The main branch that reflects the production-ready code.
* develop: The branch where new features are developed.
* feature: A branch created from develop to work on a new feature.
  ```git checkout -b feature/my-new-feature develop```
* release: A branch created from develop for final testing before production.
  ```git checkout -b release/v1.0 develop```
* hotfix: A branch created from master to quickly fix a production issue.
  ```git checkout -b hotfix/fix-issue main```

To implement this strategy for a new feature, follow these steps:

1. Create a new feature branch from **develop**:
   ```
   git checkout rinadevelopdevelop
   git checkout -b feature/add-docker
   ```
2. Work on the feature and commit changes:
   ```
   git add .
   git commit -m "Implement docker with nodejs"
   ```
3. Push the feature branch to the remote repository:
   ```
   git push -u origin feature/add-docker
   ```
4. Create a pull request to merge the feature branch into **rinadevelop**.
5. Once the feature is reviewed and approved, merge it into **rinadevelop**:
   ```
   git checkout rinadevelop
   git merge feature/add-docker
   ```
6. Delete the feature branch:
   ```
   git branch -d feature/add-docker/ git branch -d feature/new-feature
   ```

   ## Merging and Resolving Conflicts

   ### Step-by-Step Guide to Resolve a Merge Conflict
   
    To resolve a merge conflict when merging a feature branch into the main           branch, follow these steps:

  1. **Merge the feature branch into the main branch**:
     ```
     git checkout main
     git merge feature/my-new-feature
     ```
  2. **Identify conflicts**: Git will notify you of any conflicts during the            merge process.
  3. **Open the conflicting files**: Conflicted areas will be marked with               <<<<<<<,         =======, and >>>>>>>. Resolve the conflicts by choosing          which changes to          keep.
  4. **Add resolved files to the staging area**:
     ```
     git add <resolved-file>
     ```
  5. **Complete the merge**: After resolving all conflicts, finalize the merge:
      ```
      git commit -m "Resolved merge conflicts"
      ```
  6. **Push the updated main branch to the remote repository**:
     ```
     git push -u origin master
     ```

## CI/CD Integration

### Setting Up a Basic CI/CD Pipeline with GitHub Actions

To set up a basic CI/CD pipeline using GitHub Actions to automatically test and deploy a Node.js application when changes are pushed to the repository, follow these steps:

1. **Create a GitHub Actions workflow file**: In your repository, create the following directory structure:
   ```
   .github/workflows
   ```
2. **Create a YAML file for the workflow**: Create a file named ```ci-cd.yml ```inside ```.github/workflows```:
   
   ```
   name: CI/CD Pipeline

    on:
      push:
        branches:
          - main
      pull_request:
        branches:
          - main

    jobs:
      build:
        runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Deploy
        run: |
          echo "Deploying to server..."
          # Add your deployment commands here```
          
  3. **Customize the deployment step**: Replace the echo command with your actual deployment commands (e.g., using rsync, scp, or deploying to a cloud service).
  4. Save the file and commit the changes:
     ```
     git add .
     git commit -m "Add CI/CD pipeline"
     ```
  5. Push the changes to the remote repository:
     ```
     git push -u origin master
     ```
  6. The CI/CD pipeline will automatically run when changes are pushed to the repository, testing and deploying the Node.js application to production.

Data Analysis  in Python
=========================

## Table of Contents for Python for Data Analysis

17. [Data_Cleaning](#data_cleaning)
18. [Data_Manipulation](#data_manipulation)
19. [Data_Visualization](#data_visualization)
20. [Descriptive_Statistics](#descriptive_statistics)


This project performs data cleaning, manipulation, visualization, and descriptive statistics on a dataset.

## 1. Install Required Software
   * **Python**: Make sure you have Python installed on your machine. You can download it from python.org. I already have Python 3.10.3 in my system.
     
## 2. Create a New Folder 
   data_analysis

## 3. Set Up a Virtual Environment
   Open the integrated terminal in VS Code (View > Terminal) and run:
      
      ``` 
         python -m venv venv
         # Activate the virtual environment
         # On Windows
         .\venv\Scripts\activate
         # On macOS/Linux
         source venv/bin/activate
      ```
      
## 4. Install Required Packages
   Install the required packages using pip:
      ```pip install pandas matplotlib numpy```
      
## 5. Create Python Scripts
   Create the following Python files in my project folder (data_analysis):
   * ```dada_cleaning.py```
   * ```data_manipulation.py```
   * ```data_visualization.py```
   * ```descriptive_statistics```

## Code Snippet

   1. Data Cleaning: ```data_cleaning.py```.

      The `clean_data` function reads a CSV file, drops rows with missing values,       and outputs the cleaned data to a new CSV file.


      ```
         import pandas as pd

         def clean_data(file_path):
             # Read CSV file
             df = pd.read_csv(file_path)
         
             # Drop rows with missing values
             cleaned_df = df.dropna()
         
             # Output the cleaned data
             cleaned_df.to_csv('cleaned_data.csv', index=False)
             print("Cleaned data saved to 'cleaned_data.csv'.")
         
         if __name__ == "__main__":
             clean_data('my_data.csv')  # Replace with your CSV file name
      ```
   3. Data Manipulation: ```data_manipulation.py```.

      The `get_top_rows` function takes a DataFrame and returns the top 5 rows          where a specific column (e.g., "age") has values greater than 30.


      ```
         import pandas as pd

         def filter_age_over_30(df):
             # Return top 5 rows where age > 30
             filtered_df = df[df['age'] > 30]  # Replace 'age' with your column 
             name
             return filtered_df.head(5)
         
         if __name__ == "__main__":
             df = pd.read_csv('cleaned_data.csv')  # Use cleaned data
             print(filter_age_over_30(df))
      ```
   4. Data Visualization: ```data_visualization.py```.

      The `plot_age_distribution` function creates a bar chart using Matplotlib         to visualize the distribution of user ages from the dataset.


      ```
         import pandas as pd
         import matplotlib.pyplot as plt
         
         def visualize_age_distribution(file_path):
             # Read CSV file
             df = pd.read_csv(file_path)
         
             # Create a bar chart for age distribution
             plt.figure(figsize=(10, 6))
             df['age'].value_counts().sort_index().plot(kind='bar')  # Replace                 'age' with your column name
             plt.title('Age Distribution')
             plt.xlabel('Age')
             plt.ylabel('Frequency')
             plt.xticks(rotation=0)
             plt.grid(axis='y')
         
             # Show plot
             plt.savefig('age_distribution.png')
             plt.show()
         
         if __name__ == "__main__":
             visualize_age_distribution('cleaned_data.csv')  # Use cleaned data

      ```

   5. Descriptive Statistics: ```descriptive_statistics.py```.
      
      The `calculate_stats` function calculates the mean, median, and standard          deviation of a column (e.g., "age") in the dataset using NumPy and Pandas.


      ```
         import pandas as pd
         import numpy as np
         
         def calculate_statistics(file_path):
             # Read CSV file
             df = pd.read_csv(file_path)
         
             # Calculate mean, median, and standard deviation for the 'age' column
             mean_age = np.mean(df['age'])  # Replace 'age' with your column name
             median_age = np.median(df['age'])
             std_dev_age = np.std(df['age'])
         
             print(f"Mean Age: {mean_age}")
             print(f"Median Age: {median_age}")
             print(f"Standard Deviation of Age: {std_dev_age}")
         
         if __name__ == "__main__":
             calculate_statistics('cleaned_data.csv')  # Use cleaned data
      ```
  ## 6. For Running the Scripts

   1.  Ensure your data file (e.g., ```my_data.csv```) is in the same directory          as your scripts.
   2.  Run the scripts in the terminal:

      ```
         # Clean the data
         python data_cleaning.py
         
         # Filter data for ages over 30
         python data_manipulation.py
         
         # Visualize age distribution
         python data_visualization.py
         
         # Calculate descriptive statistics
         python descriptive_statistics.py

      ```
**License**

This project is licensed under the MIT License. See `LICENSE` for details.



