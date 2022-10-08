/* eslint-disable camelcase */
const MemoryService = require('../../Services/memories')
const { StatusCodes } = require('http-status-codes')

module.exports = (app) => {
    const service = new MemoryService()

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/memory : I am Memory Service' })
    })
}
