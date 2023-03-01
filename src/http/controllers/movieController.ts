import express, {Request, Response} from "express";
import {Movie} from "../../models/Movie";
import {body, query, validationResult} from "express-validator";

export default class MovieController {
    public path = '/movies';
    public router = express.Router();

    private movies: Movie[] = [
        {
            Title: 'Matrix',
            Director: 'John Doe',
            Released: '2000-01-01',
            Genre: 'action'
        }
    ]

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(this.path, query('title').isLength({min:4}), this.getAllPosts.bind(this))
        this.router.post(this.path, this.createPost.bind(this))
    }

    private getAllPosts(request:Request, response:Response) {
        const error = validationResult(request)
        if (!error.isEmpty()){
            response.status(422).json({ errors:error.array()})
        }
        response.send(this.movies)
    }

    private createPost(request:Request, response:Response) {
        const movie:Movie = request.body
        this.movies.push(movie)
        response.send(movie)
    }
}