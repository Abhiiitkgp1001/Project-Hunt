const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoDBUri");

const establishConnection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = establishConnection;
