const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_USER_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.onmvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Conectou ao banco!");
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
