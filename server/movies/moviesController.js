const moment = require('moment');
const { isEmpty } = require("lodash");
const { Op } = require("sequelize");
const { Movie } = require('../../model');


const createNewMovie = async (req, res) => {
    const { title, year, length, actors } = req.body;
    const movieId = `MV-${moment().unix()}`;

    const movieRecord = {
        movieId,
        title,
        year,
        length,
        actors
    }

    const result = await Movie.create(movieRecord);
    console.log(result.toJSON());

    if (!isEmpty(result)) {
        res.send(result);
    } else {
        res.send({ error: "Movie creations Failed" });
    }
}

const listMovies = async (req, res) => {
    const movies = await Movie.findAll();

    // To convert sequelize model to plain javascript
    const formattedMovie = movies.map(r => r.get({ plain: true }));
    if (!isEmpty(formattedMovie)) {
        res.send(formattedMovie);
    }
    else {
        res.send({ error: "movie creation failed" });
    }
}

const searchMovieTitle = async (req, res) => {
    const { title } = req.params;
    const searchResult = await Movie.findAll({
        where: {
            title: {
                [Op.like]: `%${title}%`,
            }

        },
        raw: true
    });


    if (isEmpty(searchResult)) {
        res.send({ message: 'No Records Found' });
    } else if (!isEmpty(searchResult)) {
        res.send(searchResult);
    }
}

const updateMovie = async (req, res) => {
    const { movieId } = req.params;

    const searchResult = await Movie.findOne(
        {
            where:
            {
                movieId: movieId
            },
            raw: true

        });

    const title = searchResult.title;
    const { year, lenth, actors } = req.body;
    const movieRecord = { title, year, lenth, actors };

    const updatedMovie = await Movie.update(movieRecord, {
        where: {
            movieId: movieId
        }
    });

    res.send("changes saved...");
}

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;

    const searchResult = await Movie.findOne({
        where: { movieId: movieId }

    });
    if (searchResult) {
        const deletedMovie = await Movie.destroy({
            where: { movieId: movieId }
        });
        res.send({ message: "Deleted successfully" });
    }
    else {
        res.send({ message: "No records found by this ID" });
    }
}

module.exports = {
    createNewMovie,
    listMovies,
    searchMovieTitle,
    updateMovie,
    deleteMovie
}