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
} from 'typeorm';
import { User, Review } from './index';
import { IUser, IMovie } from './models.interface';

@Entity('movie')
export class Movie implements IMovie{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @Column()
    description: string;

    @Column()
    director: string;

    @Column()
    releaseDate: Date;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.movies, { eager: true })
    addedBy!: User;

    @OneToMany(() => Review, (review) => review.movie, { eager: true })
    reviews!: [Review];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;
}
