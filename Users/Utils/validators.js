const Joi = require('joi')

const idSchema = Joi.object().keys({
    id: Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()
})

module.exports = {
    idSchema
}
