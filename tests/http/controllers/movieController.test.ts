import * as chai from "chai";
import supertest from "supertest";
import { app } from "../../../src/index";
import {Movie} from "../../../src/models/Movie";


describe('movies', function () {
    it('should get movies list', function () {

        supertest(app.app).get('/movies')
            .query({title: 'matrix'})
            .expect(200)
            .end((err, res) => {
                chai.expect(res.body).to.be.not.empty
                chai.expect(res.body.length).to.be.eql(1)
            })

    });

    it('should create new movie successful', function () {

        let title = 'matrix';
        supertest(app.app).post('/movies')
            .send({Title: title} as Movie)
            .expect(201)
            .end((err, res) => {
                chai.expect(res.body).to.be.not.empty
                chai.expect(res.body.Title).to.be.eql(title)
            })

    });
});