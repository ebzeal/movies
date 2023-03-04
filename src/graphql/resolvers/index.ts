// import Chef from "./Chef";
// import * as Mutation from "./Mutation";
// import * as Query from "./Query";
import { createUser } from "./Mutation/user";

const resolvers = {
  Mutation: { createUser },
};

export default resolvers;
