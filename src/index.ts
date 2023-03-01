import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import {App} from "./app";
import MovieController from "./http/controllers/movieController";

const dotenv = require('dotenv');

dotenv.config();
const port:number|any = process.env.PORT;

const app = new App([
    new MovieController()
], port)


app.app.get('/', (req:Request, res:Response) => {
    res.send(req.query);
});

app.listen();

export { app }