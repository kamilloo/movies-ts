import {MovieRepository} from "./movieRepository";
import {Service} from "typedi";
import {DBDataSource} from "./DataDB";
import {MovieEntity} from "../models/entities/MovieEntity";

@Service()
export class MovieRepositoryDB implements MovieRepository{

    async getAll(userId:number): Promise<MovieEntity[] | void> {
        return  await DBDataSource.getRepository(MovieEntity).findBy({
            user_id: userId
        })
    }

    async save(movie: MovieEntity): Promise<MovieEntity> {
        return await DBDataSource.getRepository(MovieEntity).save(movie)
    }
}