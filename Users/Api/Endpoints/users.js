/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const UserService = require('../../Services/users')
const { StatusCodes } = require('http-status-codes')
const { idSchema } = require('../../Utils/validators')
const validator = require('express-joi-validation').createValidator({})
const authMiddleware = require('../Middleware/authentication')
const { publishAuthEvent } = require('../../Utils/events')

module.exports = (app) => {
    const service = new UserService()

    app.get('/profile/find', authMiddleware, async (req, res) => {
        const { userID: userid } = req.user

        // call to auth-service for user profile
        const response = await publishAuthEvent({ event: 'GET_USER', data: { userid } })

        res.status(StatusCodes.OK).json({ status: 'success', user: response.data.data })
    })

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/users : I am User Service' })
    })
}
