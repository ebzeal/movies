import { GraphQLError } from "graphql";

const handleError = (message: string, code: string, argumentName?: string) => {
  throw new GraphQLError(message, {
    extensions: { code, argumentName },
  });
};

export default handleError;
