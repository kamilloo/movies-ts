import {Movie} from "../models/Movie";
import {MovieRepository} from "./movieRepository";
import {Service} from "typedi";

@Service()
export class MovieRepositoryDB implements MovieRepository{

    private movies: Movie[] = [
        {
            Title: 'Matrix',
            Director: 'John Doe',
            Released: '2000-01-01',
            Genre: 'action'
        }
    ]

    async getAll(): Promise<Array<Movie>> {
        return await this.movies
    }

    async add(movie: Movie): Promise<boolean> {
        await this.movies.push(movie);
        return true;
    }
}