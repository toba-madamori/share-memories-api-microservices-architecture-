const Joi = require('joi')

const name = Joi.string().trim(true).required()
const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()

const signupSchema = Joi.object().keys({
    name,
    email,
    password
})

module.exports = {
    signupSchema
}
