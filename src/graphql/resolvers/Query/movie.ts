import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";

const movieRepo = AppDataSource.getRepository(Movie);

export const movies = () => movieRepo.findAndCount();

export const movie = (context: any, { input }: any) => movieRepo.find({ where: { id: input.id } });
