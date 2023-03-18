import {Movie} from "../models/Movie";
import {MovieEntity} from "../models/entities/MovieEntity";
import {OmdbRepository} from "./omdbRepository";
import {URL, URLSearchParams} from "url";


export class OmdbRepositoryImpl implements OmdbRepository{
    private base:string = "https://www.omdbapi.com/";
    private apiKey:string = process.env.OMDB_APIKEY

    getByTile(title:string): Promise<Movie | null>{
        const url = new URL(this.base)
        url.searchParams.set("t", title)
        url.searchParams.set("apiKey", this.apiKey)

    }
}