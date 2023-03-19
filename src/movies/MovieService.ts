import {MovieEntity} from "../models/entities/MovieEntity";
import {Inject, Service} from "typedi";
import {MovieRepositoryDB} from "../DAO/movieRepositoryDB";
import {MovieRepository} from "../DAO/movieRepository";
import {OmdbRepositoryFake} from "../DAO/omdbRepositoryFake";
import {OmdbRepository} from "../DAO/omdbRepository";
import {Movie} from "../models/Movie";
import {OmdbRepositoryImpl} from "../DAO/omdbRepositoryImpl";

@Service()
export class MovieService {

    constructor(
        @Inject(() => MovieRepositoryDB) private readonly movieRepository:MovieRepository,
        @Inject(() => process.env.OMDB_API == "live" ? OmdbRepositoryImpl : OmdbRepositoryFake) private readonly omdbRepository:OmdbRepository,
    ) {
    }

    public async create(title:string):Promise<MovieEntity| null>{
        const movie: Movie|null = await this.omdbRepository.getByTile(title);
        if (movie != null){
            let entity:MovieEntity = new MovieEntity();
            entity.director = movie.Director;
            entity.title = movie.Title;
            entity.genre = movie.Genre
            entity.released = movie.Released
            entity.user_id = 1;
            return await this.movieRepository.save(entity)
        }
        return null;
    }
}