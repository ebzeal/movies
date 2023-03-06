import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";
import { MyContext } from "../../../helpers/types";
import authCheck from "../../../helpers/authCheck";
import handleError from "../../../helpers/errorHandler";

const movieRepo = AppDataSource.getRepository(Movie);
export const createMovie = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);
  const movie = await movieRepo.save({
    ...input,
    addedBy: userId,
  });
  return movie;
};

export const updateMovie = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);
  const {
    id, name, description, director, releaseDate,
  } = input;
  const movie = await movieRepo.findOne({ where: { id } });
  if (!movie) handleError("movie does not exist", "NOT FOUND");

  if (userId !== movie?.addedBy.id) handleError("you cannot perform this action", "UNAUTHORIZED");

  return movieRepo.save({
    id: movie?.id,
    name: name || movie?.name,
    description: description || movie?.description,
    director: director || movie?.director,
    releaseDate: releaseDate || movie?.releaseDate,
  });
};

export const deleteMovie = async (context: any, { id }: any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);

  const movie = await movieRepo.findOne({ where: { id: +id } });
  if (!movie) handleError("movie does not exist", "BAD_REQUEST");

  if (userId !== movie?.addedBy.id) handleError("you cannot perform this action", "UNAUTHORIZED");
  const isDeleted = await movieRepo
    .createQueryBuilder("movies")
    .delete()
    .from(Movie)
    .where("id = :id", { id: movie?.id })
    .execute();

  return isDeleted ? { message: "Movie Deleted" } : handleError("not deleted", "INTERNAL_SERVER_ERROR");
};
