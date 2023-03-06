/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { createApollo4QueryValidationPlugin, constraintDirectiveTypeDefs } from "graphql-constraint-directive/apollo4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./graphql/resolvers";
import { MyContext } from "./helpers/types";

const PORT = 4000;

const typeDefs = await readFile("./src/graphql/schema.graphql", "utf-8");

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});

const plugins = [
  createApollo4QueryValidationPlugin({
    schema,
  }),
];
const server = new ApolloServer<MyContext>({ schema, plugins });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    authToken: req?.headers?.authorization,
  }),
  listen: { port: PORT },
});
console.log(`🚀  Server ready at ${url}`);
