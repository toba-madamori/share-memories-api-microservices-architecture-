const Joi = require('joi')

const stringRequired = Joi.string().trim(true).required()
const array = Joi.array().items(Joi.string().trim(true))

const newMemorySchema = Joi.object().keys({
    title: stringRequired,
    tags: array
})

module.exports = {
    newMemorySchema
}
