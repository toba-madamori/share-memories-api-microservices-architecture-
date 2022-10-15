/* eslint-disable camelcase */
const ReactionsService = require('../../Services/reactions')
const { StatusCodes } = require('http-status-codes')
const { newCommentSchema, idSchema } = require('../../Utils/validators')
const validator = require('express-joi-validation').createValidator({})
const authMiddleware = require('../Middleware/authentication')

module.exports = (app) => {
    const service = new ReactionsService()

    app.post('/comment/new/:id', authMiddleware, validator.params(idSchema), validator.body(newCommentSchema), async (req, res) => {
        let { comment } = req.body
        const { id: memoryid } = req.params
        const { userID: userid } = req.user

        comment = await service.createComment({ comment, userid, memoryid })
        res.status(StatusCodes.CREATED).json({ status: 'success', comment })
    })

    app.patch('/comment/update/:id', authMiddleware, validator.params(idSchema), validator.body(newCommentSchema), async (req, res) => {
        let { comment } = req.body
        const { id: commentid } = req.params
        const { userID: userid } = req.user

        comment = await service.updateComment({ comment, userid, commentid })
        res.status(StatusCodes.OK).json({ status: 'success', comment })
    })

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/reactions : I am Reactions Service' })
    })
}
