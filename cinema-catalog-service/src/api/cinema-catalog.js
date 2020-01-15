'use strict'
const status = require('http-status');

module.exports = (app, options) => {
    const { repo } = options

    app.get('/cinemas', (req, res, next) => {
        repo.getCinemasByCity(req.query.cityId)
            .then(cinemas => {
                res.status(status.OK).send(cinemas)
            })
            .catch(next)
    });

    app.get('/cinemas/:movieId', (req, res, next) => {
        repo.getCinemaByMovie(req.params.movieId)
            .then(cinema => {
                res.status(status.OK).send(cinema)
            })
            .catch(next)
    });

    app.get('/cinemas/:cityId/:movieId', (req, res, next) => {
        let options = {
            cityId: req.params.cityId,
            movieId: req.params.movieId
        }
        repo.getCinemaScheduleByMovie(options)
            .then(schedules => {
                res.status(status.OK).send(schedules)
            })
            .catch(next)
    });

}