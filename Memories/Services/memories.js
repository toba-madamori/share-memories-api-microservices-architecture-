/* eslint-disable camelcase */
const { MemoryRepository } = require('../Database')
const cloudinary = require('../Utils/cloudinary')
const { BadRequestError } = require('../Errors')

// All Business logic will be here
class MemoryService {
    constructor () {
        this.repository = new MemoryRepository()
    }

    async createMemory (input) {
        const { userid, title, tags, image } = input
        let result = {}

        if (!image) throw new BadRequestError('cannot create memories without an image')
        result = await cloudinary.uploader.upload(image.path, { folder: 'memory_upload' })

        const memory = result.secure_url
        const cloudinary_id = result.public_id

        const newMemory = await this.repository.createMemory({ userid, memory, title, tags, cloudinary_id })

        return newMemory
    }

    async getMemory (input) {
        const { memoryid } = input

        const memory = await this.repository.findMemory({ _id: memoryid })
        return memory
    }

    async getAllMemories (input) {
        const { userid } = input
        const memories = await this.repository.findAll({ userid })

        return memories
    }

    async updateMemory (input) {
        const { userid, title, tags, image, memoryid } = input
        let result = {}
        const update = {}
        const prevMemory = await this.repository.findOne({ userid, memoryid })

        if (image) {
            await cloudinary.uploader.destroy(prevMemory.cloudinary_id)
            result = await cloudinary.uploader.upload(image.path, { folder: 'memory_upload' })
            update.memory = result.secure_url
            update.cloudinary_id = result.public_id
        }

        if (title) update.title = title
        if (tags) update.tags = tags

        const updatedMemory = await this.repository.updateMemory({ memoryid, update })

        return updatedMemory
    }
}

module.exports = MemoryService
