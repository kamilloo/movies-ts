import {MovieEntity} from "../models/entities/MovieEntity";

export interface MovieRepository {
    getAll(): Promise<MovieEntity[] | void>
    save(movie: MovieEntity): Promise<MovieEntity>;
}