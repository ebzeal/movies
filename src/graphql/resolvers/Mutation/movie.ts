import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";
import { MyContext } from "../../../helpers/types";
import getUserId from "../../../helpers/tokenManager";

const movieRepo = AppDataSource.getRepository(Movie);
export const createMovie = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");
  const movie = await movieRepo.save({
    ...input,
    addedBy: userId,
  });
  return movie;
};

export const updateMovie = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");
  const {
    id, name, description, director, releaseDate,
  } = input;
  const movie = await movieRepo.findOne({ where: { id } });
  if (!movie) throw new Error("movie does not exist");

  if (userId !== movie.addedBy.id) throw new Error("Unauthorized");
  return movieRepo.save({
    id: movie.id,
    name: name || movie.name,
    description: description || movie.description,
    director: director || movie.director,
    releaseDate: releaseDate || movie.releaseDate,
  });
};

export const deleteMovie = async (context: any, { id }: any, { authToken }: MyContext) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");

  const movie = await movieRepo.findOne({ where: { id: +id } });
  if (!movie) throw new Error("movie does not exist");

  if (userId !== movie.addedBy.id) throw new Error("Unauthorized");
  const isDeleted = await movieRepo
    .createQueryBuilder("movies")
    .delete()
    .from(Movie)
    .where("id = :id", { id: movie.id })
    .execute();

  return isDeleted ? { message: "Movie Deleted" } : new Error("not deleted");
};
