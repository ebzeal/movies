/* eslint-disable max-len */
// eslint-disable import/prefer-default-export
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../../../../db/config";
import { User } from "../../../../db/models";
import { hashPassword, verifyPassword } from "../../../helpers/passwordManager";
import handleError from "../../../helpers/errorHandler";
import { MyContext } from "../../../helpers/types";
import getUserId from "../../../helpers/tokenManager";

dotenv.config();
const userRepository = AppDataSource.getRepository(User);

export const createUser = async (context: any, { input }: any) => {
  if (input.password !== input.confirmPassword) handleError("Invalid password confirmatio", "BAD_REQUEST");
  const password = await hashPassword(input.password);
  const newUser = await userRepository.save({ ...input, password });
  return newUser;
};

export const loginUser = async (context: any, { input }:any) => {
  const { password, email, userName } = input;
  const user = await userRepository.findOne({ where: [{ email }, { userName }] });
  if (!user) handleError("user details are not correct", "BAD_USER_INPUT");

  const valid = user?.password ? await verifyPassword(password, user.password) : false;
  if (!valid) handleError("user details are not correct", "BAD_USER_INPUT");

  const token = user?.id ? jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string) : null;

  return {
    token,
    user,
  };
};

export const changePassword = async (context: any, { input } :any, { authToken }: MyContext) => {
  // input old password ?
  const userId = authToken ? getUserId(authToken) : null;
  const { id, password } = input;
  if (+id !== userId) handleError("You cannot change this password", "FORBIDDEN");
  const hashedPassword = await hashPassword(password);

  const user = await userRepository.findOne({ where: { id } });
  return userRepository.save({
    ...user,
    password: hashedPassword,
  });
};
