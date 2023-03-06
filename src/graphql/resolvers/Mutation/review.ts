import { AppDataSource } from "../../../../db/config";
import { Review } from "../../../../db/models";
import { MyContext } from "../../../helpers/types";
import getUserId from "../../../helpers/tokenManager";
import authCheck from "../../../helpers/authCheck";
import handleError from "../../../helpers/errorHandler";

const reviewRepo = AppDataSource.getRepository(Review);
export const createReview = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);
  const review = await reviewRepo.save({
    movie: input.movieId,
    user: userId,
    rating: input.rating,
    comment: input.comment,
  });

  return review;
};

export const updateReview = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);

  const {
    id, rating, comment,
  } = input;
  const review = await reviewRepo.findOne({ where: { id } });
  if (!review) handleError("review does not exist", "BAD_REQUEST");

  if (userId !== review?.user.id) handleError("you cannot perform this action", "UNAUTHORIZED");
  const updatedReview = await reviewRepo.save({
    ...review,
    rating: rating || review?.rating,
    comment: comment || review?.comment,
  });
  return {
    ...updatedReview,
    user: updatedReview.user.id,
  };
};

export const deleteReview = async (context: any, { id } : any, { authToken }: MyContext) => {
  const userId = authCheck(authToken as string);

  const review = await reviewRepo.findOne({ where: { id: +id } });
  if (!review) handleError("review does not exist", "BAD_REQUEST");

  if (userId !== review?.user.id) handleError("you cannot perform this action", "UNAUTHORIZED");
  const isDeleted = await reviewRepo
    .createQueryBuilder("reviews")
    .delete()
    .from(Review)
    .where("id = :id", { id: review?.id })
    .execute();

  return isDeleted ? { message: "Review Deleted" } : handleError("not deleted", "INTERNAL_SERVER_ERROR");
};
