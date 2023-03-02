import express, {Request, Response} from "express";
import {Movie} from "../../models/Movie";
import {query, validationResult} from "express-validator";
import {MovieRepository} from "../../DAO/movieRepository";
import {Inject, Service} from "typedi";
import {MovieRepositoryDB} from "../../DAO/movieRepositoryDB";
import {pino} from "pino"

@Service()
export class MovieController {
    public path = '/movies';
    public router = express.Router();

    constructor(@Inject(() => MovieRepositoryDB) private readonly movieRepository:MovieRepository) {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(this.path, query('title').isLength({min:4}), this.getAllPosts.bind(this))
        this.router.post(this.path, this.createPost.bind(this))
    }

    private async getAllPosts(request:Request, response:Response) {
        const error = validationResult(request)
        if (!error.isEmpty()){
            response.status(422).json({ errors:error.array()})
        }
        let movies =  await this.movieRepository.getAll();
        response.send(movies)
    }

    private async createPost(request:Request, response:Response) {
        const movie:Movie = request.body
        await this.movieRepository.add(movie).catch(err => pino().error(err))
        response.send(movie).status(201)
    }
}