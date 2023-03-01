import express, { Express, Request, Response } from "express";

const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get('/', (req:Request, res:Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://172.0.0.1:${port}`);
});