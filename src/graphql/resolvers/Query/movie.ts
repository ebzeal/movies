import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";

const movieRepo = AppDataSource.getRepository(Movie);

export const movies = () => movieRepo.find();

export const movie = (context: any, { id }: any) => movieRepo.findOne({ where: { id } });
