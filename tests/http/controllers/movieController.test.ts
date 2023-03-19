import * as chai from "chai";
import supertest from "supertest";
import { app } from "../../../src/index";
import {DBDataSource} from "../../../src/DAO/DataDB";
import {MovieEntity} from "../../../src/models/entities/MovieEntity";
import {MovieService} from "../../../src/movies/MovieService";


describe('movies',  () => {

    after(async () => {
        return await DBDataSource.createQueryBuilder()
            .delete()
            .from(MovieEntity)
            .execute()
    })

    it('should create new movie successful', function (done) {

        let title = 'matrix';
        let newMovie = {title: title , director: 'John Doe', released: '2000-01-01', genre: 'fiction'} as MovieEntity;
        supertest(app.app).post('/movies')
            .send(newMovie)
            // .expect(201)
            .end((err, res) => {
                chai.expect(res.body).to.be.not.empty
                chai.expect(res.body.title).to.be.eql(title)
                chai.expect(true).to.be.true
                done()
            })

    });

    it('should get movies list', (done) => {

        let movie:MovieEntity = new MovieEntity();
        movie.title = 'title';
        movie.released = '2000-01-01'
        movie.genre = 'action'
        movie.director = 'director'
        movie.user_id = 1;
        DBDataSource.getRepository(MovieEntity).save(movie)
            .then(() => {
                supertest(app.app).get('/movies')
                    .query({title: 'matrix'})
                    .expect(200)
                    .end((err, res) => {
                        chai.expect(res.body).to.be.not.empty
                        chai.expect(res.body.length).to.be.eql(1)
                        done()
                    })
            })
    });

});