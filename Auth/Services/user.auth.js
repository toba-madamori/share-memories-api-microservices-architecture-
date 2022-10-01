/* eslint-disable camelcase */
const { UserRepository } = require('../Database')
const { hashPassword } = require('../Utils/password')
const cloudinary = require('../Utils/cloudinary')
const { confirmRegistrationToken } = require('../Utils/tokens')
const { sendMail } = require('../Utils/mailer')
const { signupMailOptions } = require('../Templates/email/signupMail')
const path = require('path')

const defaultAvatarPath = path.join(__dirname, '../public/default-profile-image.png')

// All Business logic will be here
class UserService {
    constructor () {
        this.repository = new UserRepository()
    }

    async SignUp (input) {
        const { name, email, password } = input

        const result = await cloudinary.uploader.upload(defaultAvatarPath)
        const avatar = result.secure_url
        const cloudinary_id = result.public_id

        const userPassword = await hashPassword(password)

        const newUser = await this.repository.CreateUser({ name, email, password: userPassword, avatar, cloudinary_id })

        const token = await confirmRegistrationToken(email, newUser._id, userPassword)
        const link = `${process.env.CONFIRM_REGISTRATION_URL}/${newUser._id}/${token}`

        await sendMail(signupMailOptions(email, link, name))

        return newUser
    }
}

module.exports = UserService
