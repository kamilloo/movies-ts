import {Movie} from "../Movie";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: "movies"})
export class MovieEntity implements Movie{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string

    @Column()
    released: string //date

    @Column()
    genre: string

    @Column()
    director: string
}