import { AppDataSource } from "../../../../db/config";
import { Review } from "../../../../db/models";
import { MyContext } from "../../../helpers/types";
import getUserId from "../../../helpers/tokenManager";

const reviewRepo = AppDataSource.getRepository(Review);
export const createReview = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");
  const review = await reviewRepo.save({
    movie: input.movieId,
    user: userId,
    rating: input.rating,
    comment: input.comment,
  });
  console.log("🚀 ~ file: review.ts:16 ~ createReview ~ review:", review);

  return review;
};

export const updateReview = async (context: any, { input }: any, { authToken }: MyContext) => {
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");
  const {
    id, rating, comment,
  } = input;
  const review = await reviewRepo.findOne({ where: { id } });
  if (!review) throw new Error("review does not exist");

  if (userId !== review.user.id) throw new Error("Unauthorized");
  const updatedReview = await reviewRepo.save({
    ...review,
    rating: rating || review.rating,
    comment: comment || review.comment,
  });
  return {
    ...updatedReview,
    user: updatedReview.user.id,
  };
};

export const deleteReview = async (context: any, { id } : any, { authToken }: MyContext) => {
  console.log("🚀 ~ file: review.ts:43 ~ deleteReview ~ id:", id);
  const userId = authToken ? getUserId(authToken) : null;
  if (!userId) throw new Error("Unauthorized");

  const review = await reviewRepo.findOne({ where: { id: +id } });
  console.log("🚀 ~ file: review.ts:48 ~ deleteReview ~ review:", review);
  if (!review) throw new Error("review does not exist");

  if (userId !== review.user.id) throw new Error("Unauthorized");
  const isDeleted = await reviewRepo
    .createQueryBuilder("reviews")
    .delete()
    .from(Review)
    .where("id = :id", { id: review.id })
    .execute();

  return isDeleted ? { message: "Review Deleted" } : new Error("not deleted");
};
