import 'reflect-metadata';
import express, { Express, Request, Response } from "express";
import {App} from "./app";
import {MovieController} from "./http/controllers/movieController";
import {Container} from "typedi";

const dotenv = require('dotenv');

dotenv.config();
const port:number|any = process.env.PORT;

const app = new App([
    Container.get(MovieController)
], port)


app.app.get('/', (req:Request, res:Response) => {
    res.send(req.query);
});

app.listen();

export { app }