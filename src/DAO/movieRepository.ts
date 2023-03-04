import {Movie} from "../models/Movie";
import {MovieEntity} from "../models/entities/MovieEntity";

export interface MovieRepository {
    getAll(): Promise<MovieEntity[] | void>
    add(movie: Movie): Promise<Movie>;
}