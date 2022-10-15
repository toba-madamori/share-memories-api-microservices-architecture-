/* eslint-disable camelcase */
const { CommentRepository } = require('../Database')

// All Business logic will be here
class ReactionsService {
    constructor () {
        this.commentRepository = new CommentRepository()
    }

    async createComment (input) {
        const { comment, userid, memoryid } = input

        const newComment = await this.commentRepository.createComment({ comment, userid, memoryid })

        return newComment
    }

    async updateComment (input) {
        const { comment, userid, commentid } = input

        await this.commentRepository.findComment({ _id: commentid })

        const updatedComment = await this.commentRepository.updateComment({ comment, userid, commentid })
        return updatedComment
    }
}

module.exports = ReactionsService
