/* eslint-disable camelcase */
const DislikeModel = require('../Models/dislikes')

// Dealing with data base operations
class DislikeRepository {
    async createDislike ({ userid, memoryid }) {
        const dislike = new DislikeModel({
            userid,
            memoryid
        })

        const newDislike = await dislike.save()
        return newDislike
    }
}

module.exports = DislikeRepository
