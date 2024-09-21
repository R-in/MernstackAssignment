const mongoose = require('mongoose');

// connection string
const uri = 'mongodb+srv://mern:mernstack@cluster0.w9949.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;