/* eslint-disable camelcase */
const { UserRepository } = require('../Database')
const { hashPassword, validatePassword } = require('../Utils/password')
const cloudinary = require('../Utils/cloudinary')
const { confirmRegistrationToken, verifyConfirmRegistrationToken, signAccessToken, forgotPasswordToken, verifyForgotPasswordToken } = require('../Utils/tokens')
const { sendMail } = require('../Utils/mailer')
const { signupMailOptions } = require('../Templates/email/signupMail')
const { resetPasswordOptions } = require('../Templates/email/forgotPasswordMail')
const path = require('path')
const { UnauthenticatedError } = require('../Errors')

const defaultAvatarPath = path.join(__dirname, '../public/default-profile-image.png')

// All Business logic will be here
class UserService {
    constructor () {
        this.repository = new UserRepository()
    }

    async SignUp (input) {
        let { name, email, password, avatar } = input
        let result = {}

        if (avatar) {
            result = await cloudinary.uploader.upload(avatar.path, { folder: 'avatar_upload' })
        } else {
            result = await cloudinary.uploader.upload(defaultAvatarPath, { folder: 'avatar_upload' })
        }

        avatar = result.secure_url
        const cloudinary_id = result.public_id

        const userPassword = await hashPassword(password)

        const newUser = await this.repository.CreateUser({ name, email, password: userPassword, avatar, cloudinary_id })

        const token = await confirmRegistrationToken(email, newUser._id, userPassword)
        const link = `${process.env.CONFIRM_REGISTRATION_URL}/${newUser._id}/${token}`

        await sendMail(signupMailOptions(email, link, name))

        return newUser
    }

    async verify (input) {
        const { _id, token } = input
        let user = await this.repository.findUser({ _id })
        await verifyConfirmRegistrationToken(user, token)

        user = await this.repository.validateUser({ _id })
        return user
    }

    async login (input) {
        const { email, password } = input
        const user = await this.repository.findUserEmail({ email })
        const isMatch = await validatePassword(password, user.password)

        if (!isMatch) throw new UnauthenticatedError('Invalid Credentials')
        if (!user.verified) throw new UnauthenticatedError('Incomplete Registration Error')

        const token = await signAccessToken(user._id)
        return token
    }

    async forgotPassword (input) {
        const { email } = input
        const user = await this.repository.findUserEmail({ email })

        const token = await forgotPasswordToken(user)
        const link = `${process.env.RESET_PASSWORD_URL}/${user._id}/${token}`

        await sendMail(resetPasswordOptions(email, link, user.name))

        return user
    }

    async resetPassword (input) {
        const { _id, token, new_password } = input
        let user = await this.repository.findUser({ _id })

        await verifyForgotPasswordToken(user, token)
        const newPassword = await hashPassword(new_password)

        user = await this.repository.updatePassword({ _id, newPassword })
        return user
    }
}

module.exports = UserService
