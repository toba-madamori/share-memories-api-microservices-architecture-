/* eslint-disable camelcase */
const { MemoryRepository } = require('../Database')

// All Business logic will be here
class MemoryService {
    constructor () {
        this.repository = new MemoryRepository()
    }
}

module.exports = MemoryService
