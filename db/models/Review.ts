import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from "sequelize-typescript";
import Movie from "./Movie";
import User from "./User";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "reviews"
})
export class Review extends Model<Review> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED
  })
  @ForeignKey(() => User)
  userId!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED
  })
  @ForeignKey(() => Movie)
  movieId!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  rating: number;

  @Column({
    type: DataType.STRING
  })
  comment: String;

  @BelongsTo(() => User)
  reviewer: User;

  @BelongsTo(() => Movie)
  moview: Movie;
}


export default Review;
