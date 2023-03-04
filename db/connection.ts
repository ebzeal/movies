import { Sequelize } from "sequelize-typescript";

import accessEnv from "#accessEnv";


import { User, Movie, Review} from "./models"

const dbURL = accessEnv("DB_URL");

const sequelize = new Sequelize(dbURL, {
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true
  },
  logging: false,
  models: [User, Movie, Review]
});

export default sequelize;
