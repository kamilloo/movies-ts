import express from 'express';
import * as bodyParser from "body-parser";
import {jwt} from "./http/middlewares/jwt";

export class App {
    public app: express.Application
    public port: number;

    constructor(controllers: Array<any>, port:number) {
        this.app = express()
        this.port = port

        this.initializeMiddlewares();
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(jwt.jwt())
        this.app.use(jwt.jwtErrorHandler)
        this.app.use(bodyParser.json())
    }

    private initializeControllers(controllers:Array<any>) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen(){
        this.app.listen(this.port , () =>{
            console.log(`App listening on the post ${this.port}`)
        })
    }
}