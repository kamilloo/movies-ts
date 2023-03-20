import * as chai from "chai";
import {MovieService} from "../../src/movies/MovieService";
import sinon, {SinonMock} from "sinon";
import {MovieRepository} from "../../src/DAO/movieRepository";
import {User} from "../../src/models/User";
import {OmdbRepository} from "../../src/DAO/omdbRepository";
import {Movie} from "../../src/models/Movie";
import {MovieEntity} from "../../src/models/entities/MovieEntity";


describe('Movie Service',  () => {

    let movieService:MovieService

    let movieRepository:MovieRepository;

    let omdbRepository:OmdbRepository;

    let movieRepositoryMock:sinon.SinonMock
    let omdbRepositoryMock:sinon.SinonMock

    afterEach(async () => {

        omdbRepositoryMock.restore()
        movieRepositoryMock.restore()
    })

    beforeEach(async () => {

        movieRepository = {
            getAll:(userId:number) => Promise.resolve(),
            save: (movie: MovieEntity) => Promise.resolve(new MovieEntity()),
            countThisMonth: (userId:number) => Promise.resolve(10),
        }
        omdbRepository = {
            getByTile: () => Promise.resolve(null)
        }

        movieRepositoryMock = sinon.mock(movieRepository)
        omdbRepositoryMock = sinon.mock(omdbRepository)

        movieService = new MovieService(movieRepository, omdbRepository);

    })

    it('it limit 5 movies per Month when user has basic role', function (done) {

        //GIVEN
        let title = 'matrix';
        let newMovie = {title: title} ;
        let user:User = {userId:1, name: "name", role: "basic"}

        movieRepositoryMock.expects("countThisMonth")
            .withArgs(user.userId)
            .resolves(10)

        omdbRepositoryMock
            .expects("getByTile")
            .never()

        //WHEN
        movieService.create(title, user)
            .then((movie) =>{
                //THEN
                chai.expect(movie).to.be.null

                movieRepositoryMock.verify()
                omdbRepositoryMock.verify()
                done()
            })

    });

    it('it no limit adding movies per Month when user has premium role', function (done) {

        //GIVEN
        let title = 'matrix';
        let newMovie = {title: title} ;
        let user:User = {userId:1, name: "name", role: "premium"}

        movieRepositoryMock.expects("countThisMonth")
            .withArgs(user.userId)
            .resolves(10)

        omdbRepositoryMock
            .expects("getByTile")
            .once()
            .resolves(null)

        //WHEN
        movieService.create(title, user)
            .then((movie) =>{
                //THEN
                chai.expect(movie).to.be.null

                movieRepositoryMock.verify()
                omdbRepositoryMock.verify()
                done()
            })

    });

});