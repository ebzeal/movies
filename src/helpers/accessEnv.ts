import * as dotenv from "dotenv";
import handleError from "./errorHandler";

dotenv.config();

const cache: { [key: string]: any } = {};

const accessEnv = (key: string, defaultValue?: any) => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    handleError(`${key} not found in process.env!`, "BAD_USER_INPUT");
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return process.env[key];
};

export default accessEnv;
