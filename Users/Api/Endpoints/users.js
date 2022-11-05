/* eslint-disable camelcase */
const UserService = require('../../Services/users')
const { StatusCodes } = require('http-status-codes')
const { idSchema } = require('../../Utils/validators')
const validator = require('express-joi-validation').createValidator({})
const authMiddleware = require('../Middleware/authentication')

module.exports = (app) => {
    const service = new UserService()

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/users : I am User Service' })
    })
}
