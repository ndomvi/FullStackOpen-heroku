const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./utils/config')
const peopleRouter = require('./controllers/people')
const middleware = require('./utils/middleware')

const app = express()

console.log('Connecting to mongoDB...')
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB successfuly!')
  })
  .catch(err => {
    console.log('An error during MongoDB connection has occured: ', err)
  })

// Fixes some resorce access, essentially allows to access the database(or any external resource)
app.use(cors())

// Hosts the webpage; makes the project a Single-page app
app.use(express.static('build'))

// Get json from received requests
app.use(bodyParser.json())

// Logger
app.use(middleware.requestLogger)

// People api route
app.use('/api/persons', peopleRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
