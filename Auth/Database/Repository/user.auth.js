/* eslint-disable camelcase */
const UserModel = require('../Models/user.auth')
const { NotFoundError } = require('../../Errors')

// Dealing with data base operations
class UserRepository {
    async CreateUser ({ name, email, password, avatar, cloudinary_id }) {
        const user = new UserModel({
            name,
            email,
            password,
            avatar,
            cloudinary_id
        })

        const newUser = await user.save()
        return newUser
    }

    async validateUser ({ _id }) {
        let user = await UserModel.findById(_id)

        if (!user) throw new NotFoundError('sorry, this user does not exist')

        user = await UserModel.findByIdAndUpdate({ _id }, { verified: true })
        return user
    }

    async findUser ({ _id }) {
        const user = await UserModel.findById(_id)

        if (!user) throw new NotFoundError('sorry, this user does not exist')

        return user
    }

    async findUserEmail ({ email }) {
        const user = await UserModel.findOne({ email })

        if (!user) throw new NotFoundError('sorry, this user does not exist')

        return user
    }

    async updatePassword ({ _id, newPassword }) {
        const user = await UserModel.findByIdAndUpdate({ _id }, { password: newPassword })
        return user
    }
}

module.exports = UserRepository
