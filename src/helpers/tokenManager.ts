/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import jwt, { JwtPayload } from "jsonwebtoken";
import handleError from "./errorHandler";

const getTokenPayload = (token: string): number | string | JwtPayload => jwt.verify(token, process.env.JWT_SECRET as string);

const getUserId = (authToken: string) => {
  const token = authToken.replace("Bearer ", "");
  if (!token) {
    handleError("No token found", "NOT FOUND");
  }
  const { userId } = getTokenPayload(token) as JwtPayload;
  return userId;
};

export default getUserId;
