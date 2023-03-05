export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  confirmPassword?:string;
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
  user: IUser;
  rating: number;
  comment: string;
}