const ticketSchema = (joi) => ({
    cinema: joi.string(),
    schedule: joi.date().min('now'),
    movie: joi.string(),
    seats: joi.array().items(joi.string()).single(),
    cinemaRoom: joi.number(),
    orderId: joi.string()
})

module.exports = ticketSchema