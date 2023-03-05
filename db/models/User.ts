import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    DeleteDateColumn,
    OneToMany,
    Relation
} from 'typeorm';
import { IMovie, IUser } from './models.interface';
import { Review, Movie } from './index';
@Entity('user')
export class User implements IUser{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    userName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Movie, (movie: Movie) => movie.addedBy, {
      eager: false,
    })
    movies!: [Movie];

    @OneToMany(() => Review, (review: Review) => review.user, {
      eager: false,
    })
    reviews!: [Review];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;
}
