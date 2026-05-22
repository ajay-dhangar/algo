const { Sequelize } = require("sequelize");
const path = require("path");

// Configure SQLite database inside the server directory
const dbPath = path.join(__dirname, "quiz_attempts.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // Set to console.log for debugging sql queries
});

module.exports = sequelize;
