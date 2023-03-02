import {Movie} from "../models/Movie";

export interface MovieRepository {
    getAll(): Promise<Array<Movie>>
    add(movie: Movie): Promise<boolean>;
}