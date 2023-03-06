/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { AppDataSource } from "../../../../db/config";
import { Review } from "../../../../db/models";
import handleError from "../../../helpers/errorHandler";

const reviewRepo = AppDataSource.getRepository(Review);

export const review = async (context: any, { id } : any) => {
  try {
    const getReview = await reviewRepo.createQueryBuilder("review")
      .leftJoinAndSelect("review.movie", "movie")
      .leftJoinAndSelect("review.user", "user")
      .where("review.id = :id", { id })
      .getOne();
    if (!getReview) handleError("review does not exist", "NOT FOUND");
    return getReview;
  } catch (error: any) {
    handleError(error, "Server Error");
  }
};
