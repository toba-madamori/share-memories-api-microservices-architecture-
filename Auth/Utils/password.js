const bcrypt = require('bcrypt')
const logger = require('./logger')
const { InternalServerError } = require('../Errors')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            resolve(hashedPassword)
        } catch (error) {
            logger.error(error.message)
            reject(new InternalServerError('something went wrong, please try again later'))
        }
    })
}

module.exports = {
    hashPassword
}
