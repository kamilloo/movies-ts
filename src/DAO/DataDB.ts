import "reflect-metadata"
import { DataSource } from "typeorm"
import {MovieEntity} from "../models/entities/MovieEntity";
import {pino} from "pino";

const DBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "app",
    password: "app",
    database: "movies",
    entities: [MovieEntity],
    synchronize: true,
    logging: false,
})

DBDataSource.initialize().catch((error) => pino().error(error))

export { DBDataSource }