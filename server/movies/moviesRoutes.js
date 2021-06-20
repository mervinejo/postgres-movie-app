const Router = require('express-promise-router');

const controller = require('./moviesController');

module.exports = () => {
    const router = Router({ mergeParams: true });
    router.route('/create').post(controller.createNewMovie);
    router.route('/list').get(controller.listMovies);
    router.route('/searchTitle/:title').get(controller.searchMovieTitle);
    router.route('/updation/:movieId').put(controller.updateMovie);
    router.route('/deletion/:movieId').delete(controller.deleteMovie);


    return router;
}