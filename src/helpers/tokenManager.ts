/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
// import { Request } from "express";
// import { IncomingMessage } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";

const getTokenPayload = (token: string): number | string | JwtPayload => jwt.verify(token, process.env.JWT_SECRET as string);

const getUserId = (authToken: string) => {
  // console.log("🚀 ~ file: tokenManager.ts:8 ~ getUserId ~ req:", req.headers);
  // if (req) {
  //   const authHeader = req?.headers?.authorization;
  // if (authHeader) {
  const token = authToken.replace("Bearer ", "");
  if (!token) {
    throw new Error("No token found");
  }
  const { userId } = getTokenPayload(token) as JwtPayload;
  // console.log("🚀 ~ file: tokenManager.ts:20 ~ getUserId ~ userId:", userId);
  return userId;
};
// } else if (authToken) {
//   const { userId } = getTokenPayload(authToken) as JwtPayload;
//   return userId;
// }

// throw new Error("Not authenticated");
// };

export default getUserId;
