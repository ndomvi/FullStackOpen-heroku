require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

// Hosts the webpage; makes the project a Single-page app
app.use(express.static('frontend-build'))

// Fixes some resorce access, essentially allows to access the database(or any external resource)
app.use(cors())

// Get json from received requests
app.use(bodyParser.json())

// Logger
morgan.token('content', (req, _) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/', (_, res) => {
  res.send('<h1>The Phonebook backend API!</h1>')
})

app.get('/api/info', (_, res) => {
  Person.countDocuments({}).then(size => {
    res.send(`
          <h1>The Phonebook backend!</h1>
          <div>The phonebook has info for ${size} people.</div>
          <div>${Date()}</div>
          `)
  })
})

app.get('/api/persons', (_, res) => {
  Person.find({}).then(persons => res.json(persons.map(person => person.toJSON())))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => (person ? res.json(person.toJSON()) : res.status(404).end()))
    .catch(err => next(err)) // res.status(400).send({ error: 'Incorrect ID' })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: 'Missing name!' })
  if (!body.number) return res.status(400).json({ error: 'Missing number!' })

  const person = new Person({ name: body.name, number: body.number })

  person.save().then(newPerson => res.json(newPerson.toJSON()))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = { name: body.name, number: body.number }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Incorrect ID' })
  }

  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
