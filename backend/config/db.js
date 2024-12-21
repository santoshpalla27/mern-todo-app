const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'example';
  const MONGO_HOST = process.env.MONGO_HOST || 'mongodb';
  const MONGO_PORT = process.env.MONGO_PORT || '27017';
  const MONGO_DATABASE = process.env.MONGO_DATABASE || 'todos';

  const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;