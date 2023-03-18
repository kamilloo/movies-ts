import {Movie} from "../models/Movie";
import {MovieEntity} from "../models/entities/MovieEntity";
import {OmdbRepository} from "./omdbRepository";
import {URL} from "url";
import {Service} from "typedi";

@Service()
export class OmdbRepositoryFake implements OmdbRepository{

    getByTile(title:string): Promise<Movie | null>{
        const movie = {
            Title: title,
            Released: "2000-01-01",
            Genre: "action",
            Director: "Director"
        } as Movie
        return Promise.resolve(movie);
    }
}