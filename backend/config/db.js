const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGO_URI) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDB,
  isDatabaseConnected,
};
