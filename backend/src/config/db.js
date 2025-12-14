const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI not provided');
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDB;
