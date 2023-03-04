// const dotenv = require("dotenv");
// const path = require("path");
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

module.exports.development = {
  dialect: "postgres",
  seederStorage: "sequelize",
  url: process.env.DB_URL
};

module.exports.production = {
  dialect: "postgres",
  url: process.env.DB_URL
};
