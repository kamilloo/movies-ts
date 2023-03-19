import express, {Request, Response} from "express";
import {body, query, validationResult} from "express-validator";
import {MovieRepository} from "../../DAO/movieRepository";
import {Inject, Service} from "typedi";
import {MovieRepositoryDB} from "../../DAO/movieRepositoryDB";
import {pino} from "pino"
import {MovieEntity} from "../../models/entities/MovieEntity";
import {MovieService} from "../../movies/MovieService";
import {expressjwt, Request as JWTRequest} from "express-jwt";
import {User} from "../../models/User";

@Service()
export class MovieController {
    public path = '/movies';
    public router = express.Router();

    constructor(
        @Inject(() => MovieRepositoryDB) private readonly movieRepository:MovieRepository,
        @Inject(() => MovieService) private readonly movieService:MovieService,
    ) {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(this.path, query('title').isLength({min:4}), this.getAllPosts.bind(this))
        this.router.post(this.path, body('title').isLength({min: 4}), this.createPost.bind(this))
    }

    private async getAllPosts(request:JWTRequest, response:Response) {
        const user:User = <User>request.auth
        const error = validationResult(request)
        if (!error.isEmpty()){
            response.status(422).json({ errors:error.array()})
        }
        let movies =  await this.movieRepository.getAll();
        response.send(movies)
    }

    private async createPost(request:Request, response:Response, ) {
        const error = validationResult(request)
        if (!error.isEmpty()){
            response.status(422).json({ errors:error.array()})
        }
        const {title}:{ title:string } = request.body
        const movieEntity = await this.movieService.create(title).catch(err => pino().error(err))
        response.send(movieEntity).status(201)
    }
}