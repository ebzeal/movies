import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from "sequelize-typescript";
import Review from "./Review";
import User from "./User";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "movies"
})
export class Movie extends Model<Movie> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @Column({
    type: DataType.STRING
  })
  director: string;

  @Column({
    type: DataType.DATE
  })
  releaseDate: Date;

  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED
  })
  @ForeignKey(() => User)
  userId!: number;

  @HasMany(() => Review)
  reviews!: Review[];

  @BelongsTo(() => User)
  addedBy: User;
}


export default Movie;
