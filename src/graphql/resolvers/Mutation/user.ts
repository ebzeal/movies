import { AppDataSource } from "../../../../db/config";
import { User } from "../../../../db/models/user";
// import { User } from "#db/models/User";

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (context: any, { input }:any) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = await userRepository.save({ ...input });
  return newUser;
};
