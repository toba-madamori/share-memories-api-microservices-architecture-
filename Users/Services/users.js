/* eslint-disable camelcase */
const logger = require('../Utils/logger')
const { publishMemoryEvent, publishAuthEvent, publishReactionEvent } = require('../Utils/events')

// All Business logic will be here
class UserService {
    constructor () {

    }

    async SubscribeEvents (payload) {
        logger.info('============= Triggering user Events =============')

        const { event, data } = payload

        const { } = data

        switch (event) {
        case 'TEST':
            return true
        default:
            break
        }
    }
}

module.exports = UserService
