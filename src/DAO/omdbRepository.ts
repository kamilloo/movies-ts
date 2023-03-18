import {Movie} from "../models/Movie";

export interface OmdbRepository {
    getByTile(title:string): Promise<Movie | null>
}