import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import cors from "cors";
import express from "express";
import resolvers from "./graphql/resolvers";
// interface MyContext {
//   token?: string;
// }

const PORT = 4000;
// const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(cors(), express.json());

const typeDefs = await readFile("./src/graphql/schema.graphql", "utf-8");

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   // const user = await User.findOne((user) => user.email === email);
//   // if (user && user.password === password) {
//   //   const token = jwt.sign({ sub: user.id }, JWT_SECRET);
//   //   res.json({ token });
//   // } else {
//   //   res.sendStatus(401);
//   // }
//   User.create({ userName: "me", email: "me@movies.com", password: "now" });
// });

// const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: PORT },
});
console.log(`🚀  Server ready at ${url}`);
