import { Movie, User, Review } from './../models';
import "reflect-metadata"
import { DataSource } from "typeorm"

import env from 'dotenv';

env.config();



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
  entities: [User, Movie, Review],
  synchronize: true,
    logging: false,
})

AppDataSource.initialize()
    .then(() => {
    })
    .catch((error) => console.log(error))