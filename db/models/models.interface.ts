export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
}

export interface IMovie {
  id: number;
  name: string;
  description: string;
  director: string;
  releaseDate: Date;
  addedBy: IUser
}

export interface IReview {
  id: number;
  movie: IMovie;
  reviewer: IUser;
  rating: number;
  comment: string;
}