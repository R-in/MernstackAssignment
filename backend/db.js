const mongoose = require('mongoose');

// connection string
const uri = 'mongodb+srv://mern:mernstack@cluster0.w9949.mongodb.net/';

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
