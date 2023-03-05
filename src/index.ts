import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import express, { Request } from "express";
import { readFile } from "fs/promises";
// import cors from "cors";
import resolvers from "./graphql/resolvers";
import getUserId from "./helpers/tokenManager";
import { MyContext } from "./helpers/types";

const PORT = 4000;
// const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

// const app = express();
// app.use(
//   cors(),
// );
const context = async ({ req }: any) => getUserId(req);
console.log("🚀 ~ file: index.ts:21 ~ context:", context);
const typeDefs = await readFile("./src/graphql/schema.graphql", "utf-8");

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
// const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    authToken: req?.headers?.authorization,
  }),
  listen: { port: PORT },
});
console.log(`🚀  Server ready at ${url}`);
