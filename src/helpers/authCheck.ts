import handleError from "./errorHandler";
import getUserId from "./tokenManager";

const authCheck = (authToken: string) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) {
    handleError("you cannot perform this action", "UNAUTHORIZED");
  } else {
    return userId;
  }
};

export default authCheck;
