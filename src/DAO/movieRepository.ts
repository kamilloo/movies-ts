import {MovieEntity} from "../models/entities/MovieEntity";

export interface MovieRepository {
    getAll(userId:number): Promise<MovieEntity[] | void>
    save(movie: MovieEntity): Promise<MovieEntity>;
}