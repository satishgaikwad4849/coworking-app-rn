const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // This loads the variables from .env into process.env

// You can access MONGO_URI using process.env.MONGO_URI
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
