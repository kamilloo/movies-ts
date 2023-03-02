import {Movie} from "../Movie";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MovieEntity implements Movie{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    Title: string

    @Column()
    Released: string //date

    @Column()
    Genre: string

    @Column()
    Director: string
}