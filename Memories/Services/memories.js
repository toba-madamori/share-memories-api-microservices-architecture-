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
}

module.exports = MemoryService
