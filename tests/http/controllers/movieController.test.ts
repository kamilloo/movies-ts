import * as chai from "chai";
import supertest from "supertest";
import { app } from "../../../src/index";
import {Movie} from "../../../src/models/Movie";
import {DBDataSource} from "../../../src/DAO/DataDB";
import {MovieEntity} from "../../../src/models/entities/MovieEntity";


describe('movies',  () => {

    after(async () => {
        return await DBDataSource.createQueryBuilder()
            .delete()
            .from(MovieEntity)
            .execute()
    })

    it('should create new movie successful', function (done) {

        let title = 'matrix';
        let newMovie = {Title: title , Director: 'John Doe', Released: '2000-01-01', Genre: 'fiction'} as Movie;
        supertest(app.app).post('/movies')
            .send(newMovie)
            .expect(201)
            .end((err, res) => {
                chai.expect(res.body).to.be.not.empty
                chai.expect(res.body.Title).to.be.eql(title)
                done()
            })

    });

    it('should get movies list', (done) => {

        supertest(app.app).get('/movies')
            .query({title: 'matrix'})
            .expect(200)
            .end((err, res) => {
                chai.expect(res.body).to.be.not.empty
                chai.expect(res.body.length).to.be.eql(1)
                done()
            })

    });

});