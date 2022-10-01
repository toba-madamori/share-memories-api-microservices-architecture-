const UserService = require('../../Services/user.auth')
const { StatusCodes } = require('http-status-codes')
const validator = require('express-joi-validation').createValidator({})
const { signupSchema } = require('../../Utils/validators')

module.exports = (app) => {
    const service = new UserService()

    app.post('/signup', validator.body(signupSchema), async (req, res) => {
        const { name, email, password } = req.body

        await service.SignUp({ name, email, password })
        res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'verification link sent to email' })
    })

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/auth : I am Auth Service' })
    })
}
