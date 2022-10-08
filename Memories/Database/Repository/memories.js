/* eslint-disable camelcase */
const MemoryModel = require('../Models/memories')

// Dealing with data base operations
class MemoryRepository {
    async createMemory ({ userid, memory, title, tags, cloudinary_id }) {
        const mem = new MemoryModel({
            userid,
            memory,
            title,
            tags,
            cloudinary_id
        })

        const newMemory = await mem.save()
        return newMemory
    }
}

module.exports = MemoryRepository
