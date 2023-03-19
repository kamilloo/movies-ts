import * as chai from "chai";
import supertest from "supertest";
import { app } from "../../../src/index";
import {DBDataSource} from "../../../src/DAO/DataDB";
import {MovieEntity} from "../../../src/models/entities/MovieEntity";
import * as jwt from "jsonwebtoken"


describe('movies',  () => {

    afterEach(async () => {
        return await DBDataSource.createQueryBuilder()
            .delete()
            .from(MovieEntity)
            .execute()
    })

    function createToken(userId:number) {
        return jwt.sign({
            role: 'basic',
            name: 'name',
            userId: userId,
        }, <string>process.env.JWT_SECRET);
    }

    it('should create new movie successful', function (done) {

        //GIVEN
        let title = 'matrix';
        let newMovie = {title: title} as MovieEntity;
        supertest(app.app).post('/movies')
            .auth(createToken(1), {type: "bearer"})
            .send(newMovie)
            .expect(201)
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
                    .auth(createToken(1), {type: "bearer"})
                    .query({title: 'matrix'})
                    .expect(200)
                    .end((err, res) => {
                        chai.expect(res.body).to.be.not.empty
                        chai.expect(res.body.length).to.be.eql(1)
                        done()
                    })
            })
    });

    it('get list should skipped other user movies', (done) => {

        let movie:MovieEntity = new MovieEntity();
        movie.title = 'title';
        movie.released = '2000-01-01'
        movie.genre = 'action'
        movie.director = 'director'
        movie.user_id = 2;

        DBDataSource.getRepository(MovieEntity).save(movie)
            .then(() => {
                supertest(app.app).get('/movies')
                    .auth(createToken(1), {type: "bearer"})
                    .query({title: 'matrix'})
                    .expect(200)
                    .end((err, res) => {
                        chai.expect(res.body.length).to.be.eql(0)
                        done()
                    })
            })
    });

});