// application wide middleware
require('dotenv').config()
require('express-async-errors')

// app setup
const express = require('express')
const app = express()
const reactionsApi = require('../Api/Endpoints/reactions')
const appEvents = require('../Api/Endpoints/app-events')

// extra security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

// custom-built middleware
const errorHandler = require('../Api/Middleware/errorHandler')
const notFound = require('../Api/Middleware/notFound')

// inbuilt-middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors settings
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}))
app.use(xss())

// test-route
app.get('/', (req, res) => {
    res.send('<h4>Reaction service is up and running at </h4><a href="">Documentation</a>')
})

// routes

// listen to events
appEvents(app)

// memory api
reactionsApi(app)

app.use(errorHandler)
app.use(notFound)

module.exports = app
