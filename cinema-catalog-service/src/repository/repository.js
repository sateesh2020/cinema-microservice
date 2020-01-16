'use strict'
var ObjectId = require('mongodb').ObjectID;

const repository = (connection) => {
    const { db, ObjectID } = connection
    const collection = db.collection('movies')
    const getCinemasByCity = (cityId) => {
        return new Promise((resolve, reject) => {
            const cinemas = []
            let query = { city_id: cityId }
            let options = {
                projection: { _id: 1, name: 1 }
            }
            const cursor = collection.find(query, options)
            const addCinema = (cinema) => {
                cinemas.push(cinema)
            }
            const sendCinemas = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching cinemas, err: ' + err))
                }
                resolve(cinemas)
            }
            cursor.forEach(addCinema, sendCinemas)
        })
    }

    const getCinemaByMovie = (movieId) => {
        return new Promise((resolve, reject) => {
            let query = { _id: new ObjectId(movieId) }
            let options = {
                projection: { _id: 1, name: 1, cinemaPremieres: 1 }
            }
            let response = (err, cinema) => {
                if (err) {
                    reject(new Error('An error occured retrieving a cinema, err: ' + err))
                }
                resolve(cinema)
            }
            collection.findOne(query, options, response)
        })
    }

    const getCinemaScheduleByMovie = (options) => {
        return new Promise((resolve, reject) => {
            const schedules = []
            const match = {
                $match: {
                    'city_id': options.cityId,
                    'cinemaRooms.schedules.movie_id': options.movieId
                }
            }

            const project = {
                $project: {
                    '_id': 1,
                    'name': 1,
                    'cinemaRooms.schedules.time': 1,
                    'cinemaRooms.name': 1,
                    'cinemaRooms.format': 1
                }
            }

            const unwind = [{ $unwind: '$cinemaRooms' }, { $unwind: '$cinemaRooms.schedules' }]

            const group = [{
                $group: {
                    _id: {
                        name: '$name',
                        room: '$cinemaRooms.name'
                    },
                    schedules: { $addToSet: '$cinemaRooms.schedules.time' }
                }
            }, {
                $group: {
                    _id: '$_id.name',
                    schedules: {
                        $addToSet: {
                            room: '$_id.room',
                            schedules: '$schedules'
                        }
                    }
                }
            }]
            let cursor = collection.aggregate([match, project, ...unwind, ...group])
            const addSchedule = (schedule) => {
                schedules.push(schedule)
            }
            const sendSchedules = (err) => {
                if (err) {
                    reject('An error has occured fetching schedules by movie, err: ' + err)
                }
                resolve(schedules)
            }
            cursor.forEach(addSchedule, sendSchedules)
        })
    }
    const disconnect = () => {
        db.close()
    }

    return Object.create({
        getCinemasByCity,
        getCinemaByMovie,
        getCinemaScheduleByMovie,
        disconnect
    })
}
const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, { connect })