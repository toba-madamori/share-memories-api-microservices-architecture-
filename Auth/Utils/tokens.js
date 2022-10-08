const jwt = require('jsonwebtoken')
const { InternalServerError, UnauthenticatedError } = require('../Errors')
const logger = require('./logger')

const confirmRegistrationToken = (email, _id, password) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email,
            id: _id
        }
        const secret = process.env.JWT_SECRET_CONFIRM_REG_TOKEN + password
        const options = {
            expiresIn: process.env.JWT_LIFETIME_CONFIRM_REG_TOKEN
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                logger.error(err.message)
                reject(new InternalServerError('something went wrong, please try again later'))
            }
            resolve(token)
        })
    })
}

const verifyConfirmRegistrationToken = (user, token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_CONFIRM_REG_TOKEN + user.password, (err, payload) => {
            if (err) {
                console.log(err)
                const message = err.name === 'TokenExpiredError' ? err.message : 'Authentication Invalid'
                return reject(new UnauthenticatedError(message))
            }
            const valid = true
            resolve(valid)
        })
    })
}

module.exports = {
    confirmRegistrationToken,
    verifyConfirmRegistrationToken
}
