/* eslint-disable camelcase */
const CommentModel = require('../Models/comments')

// Dealing with data base operations
class CommentRepository {
    async createComment ({ comment, userid, memoryid }) {
        const comm = new CommentModel({
            comment,
            userid,
            memoryid
        })

        const newComment = await comm.save()
        return newComment
    }
}

module.exports = CommentRepository
