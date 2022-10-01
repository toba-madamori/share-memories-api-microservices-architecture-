/* eslint-disable camelcase */
const UserModel = require('../Models/user.auth')

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

    // async validateUser ({ _id }) {
    //     let user = await UserModel.findById(_id)

    //     if (!user) throw new NotFoundError('sorry, this user does not exist')

    //     user = await UserModel.findByIdAndUpdate({ _id }, { verified: true })
    //     return await profile.save()
    // }
}

module.exports = UserRepository
