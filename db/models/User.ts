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
import Review from "./Review";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "users"
})
export class User extends Model<User> {
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
  userName!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  password!: string;

  @HasMany(() => Movie)
  movies!: Movie[];

  @HasMany(() => Review)
  reviews!: Review[];
}


export default User;
