// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcryptjs";

export const hashPassword = (password:string): Promise<string> => bcrypt.hash(password, 10);

// eslint-disable-next-line max-len
export const verifyPassword = (password: string, hashedPassword: string): boolean => bcrypt.compareSync(password, hashedPassword);
