const UserService = require('../../Services/user.auth')
const { StatusCodes } = require('http-status-codes')
const validator = require('express-joi-validation').createValidator({})
const { signupSchema, idtokenSchema } = require('../../Utils/validators')
const upload = require('../../Utils/multer')

module.exports = (app) => {
    const service = new UserService()

    app.post('/signup', upload.single('avatar'), validator.body(signupSchema), async (req, res) => {
        const { name, email, password } = req.body
        const avatar = req.file

        await service.SignUp({ name, email, password, avatar })
        res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'verification link sent to email' })
    })

    app.patch('/verify/:id/:token', validator.params(idtokenSchema), async (req, res) => {
        const { id: _id, token } = req.params
        await service.verify({ _id, token })
        res.status(StatusCodes.OK).json({ status: 'success', msg: 'verification complete' })
    })

    app.get('/whoami', (req, res, next) => {
        return res.status(StatusCodes.OK).json({ msg: '/auth : I am Auth Service' })
    })
}
