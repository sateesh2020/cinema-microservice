const bookingSchema = (joi) => ({
    city: joi.string(),
    schedule: joi.date().min('now'),
    movie: joi.string(),
    cinemaRoom: joi.number(),
    seats: joi.array().items(joi.string()).single(),
    totalAmount: joi.number()
})

module.exports = bookingSchema