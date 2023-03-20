import * as chai from "chai";
import {MovieService} from "../../src/movies/MovieService";
import sinon, {SinonMock} from "sinon";
import {MovieRepository} from "../../src/DAO/movieRepository";
import {User} from "../../src/models/User";


describe('Movie Service',  () => {

    let movieService:MovieService

    afterEach(async () => {
    })

    beforeEach(async () => {
        movieService
    })

    it('it limit 5 movies per Month when user has basic role', function (done) {

        //GIVEN
        let title = 'matrix';
        let newMovie = {title: title} ;
        let user:User = {userId:1, name: "name", role: "basic"}

        let movieRepository = <any>{}
        let omdbRepository = <any>{
            getByTitle: () => Promise.resolve()
        }

        let movieRepositoryMock = sinon.mock(movieRepository)

        let omdbRepositoryMock = sinon.mock(omdbRepository)
        omdbRepositoryMock
            .expects("getByTitle")
            .resolves(null)
            .returned(null)

        movieService = new MovieService(movieRepository, omdbRepository);

        movieService.create(title, user)
            .then((movie) =>{

                // chai.expect(movie).to.be.null
                // omdbRepositoryMock.verify()
                // omdbRepositoryMock.restore()
                done()
            })

    });

});