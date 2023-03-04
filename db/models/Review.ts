
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    DeleteDateColumn,
} from 'typeorm';
import { User, Movie } from './index';
import { IUser, IMovie, IReview } from './models.interface';

@Entity('review')
export class Review implements IReview{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @JoinColumn({ name: 'movie_id' })
    @ManyToOne(() => Movie, ( movie: Movie) => movie.reviews)
    movie!: IMovie;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user: User) => user.reviews, { eager: true })
    reviewer!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;
}
