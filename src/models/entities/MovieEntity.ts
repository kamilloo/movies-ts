import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: "movies"})
export class MovieEntity{

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

    @Column()
    user_id: number
}