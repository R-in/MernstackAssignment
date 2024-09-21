const mongoose = require('mongoose');
const { User } = require('./db');

// Connect to MongoDB
const uri = 'mongodb+srv://mern:mernstack@cluster0.w9949.mongodb.net/';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to insert a new user
const insertUser = async (name, email, age) => {
    const user = new User({ name, email, age });
    try {
        const savedUser = await user.save();
        console.log('User inserted:', savedUser);
    } catch (error) {
        console.error('Error inserting user:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Call the insertUser function with example data
insertUser('John Doe', 'john.doe@example.com', 30);
