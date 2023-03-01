import * as chai from "chai";
import supertest from "supertest";
import { app } from "../../../src/index";


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
});