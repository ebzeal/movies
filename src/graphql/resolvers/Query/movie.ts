/* eslint-disable max-len */
import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";

const movieRepo = AppDataSource.getRepository(Movie);

export const movies = () => movieRepo.find();

export const movie = (context: any, { input }: any) => movieRepo.findOne({ where: { id: input.id } });
