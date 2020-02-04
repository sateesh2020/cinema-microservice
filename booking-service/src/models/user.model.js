const userSchema = (joi) => ({
    name: joi.string().regex(/^[\D]+/).required(),
    lastName: joi.string().regex(/^[\D]+/).required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
    creditCard: joi.object({
        number: joi.string().creditCard().required(),
        cvc: joi.string().min(3).max(4).required(),
        exp_month: joi.string().length(2).required(),
        exp_year: joi.string().length(4).required()

    }),
    membership: joi.string().creditCard()
})

module.exports = userSchema