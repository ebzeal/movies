/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { MyContext } from "../../../helpers/types";
import { AppDataSource } from "../../../../db/config";
import { Movie } from "../../../../db/models";
import getUserId from "../../../helpers/tokenManager";
import handleError from "../../../helpers/errorHandler";

const movieRepo = AppDataSource.getRepository(Movie);

export const movies = async (context: any, {
  cursor, limit, sort, filter,
}:any) => {
  try {
    const [allMovies, count] = await movieRepo.findAndCount({
      order: {
        id: sort || "ASC",
      },
      take: limit,
    });

    if (cursor) {
      const allDataLimit = await movieRepo.createQueryBuilder("movie")
        .leftJoinAndSelect("movie.reviews", "reviews")
        .where("movie.id > :cursor", { cursor })
        .orderBy("movie.id", sort || "ASC")
        .take(limit)
        .getMany();

      const filteredData = filter === "reviewed" ? allDataLimit.filter((el:any) => el.reviews.length > 0) : filter === "notReviewed" ? allDataLimit.filter((el:any) => el.reviews.length < 1) : allDataLimit;

      return {
        pageInfo: {
          startCursor: allMovies[0].id,
          endCursor: allMovies[count - 1].id,
          hasPrevPage: cursor > allMovies[0].id,
          hasNextPage: cursor < count,
        },
        edges: filteredData.map((data: any) => ({
          node: data,
        })),
      };
    }
    return {
      pageInfo: {
        startCursor: allMovies[0].id,
        endCursor: allMovies[count - 1].id,
        hasPrevPage: cursor > allMovies[0].id,
        hasNextPage: cursor < count,
      },
      edges: allMovies.map((data: any) => ({
        node: data,
      })),
    };
  } catch (error: any) {
    handleError(error, "Server Error");
  }
};

export const movie = async (context: any, { input }: any, { authToken }: MyContext) => {
  try {
    const userId = authToken ? getUserId(authToken) : null;
    const { id, name, description } = input;
    const getMovie = await movieRepo.findOne({ where: [{ id }, { name }, { description }] });
    if (!getMovie) handleError("movie does not exist", "NOT FOUND");
    if (userId && getMovie) {
      const userReviews = getMovie.reviews.filter((el) => el.user?.id === userId);
      const otherUsersReviews = getMovie.reviews.filter((el) => el.user?.id !== userId);
      const allReviews = [
        ...userReviews,
        ...otherUsersReviews];
      return {
        ...getMovie,
        reviews: allReviews,
      };
    }
    return getMovie;
  } catch (error: any) {
    handleError(error, "Server Error");
  }
};
