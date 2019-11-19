require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

// Hosts the webpage; makes the project a Single-page app
app.use(express.static('frontend-build'))

// Fixes some resorce access, essentially allows to access the database(or any external resource)
app.use(cors())

// Get json from received requests
app.use(bodyParser.json())

// Logger
morgan.token('content', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/', (req, res) => {
  res.send('<h1>The Phonebook backend API!</h1>')
})

app.get('/api/info', (req, res) => {
  res.send(`
          <h1>The Phonebook backend!</h1>
          <div>The phonebook has info for ${persons.length} people.</div>
          <div>${Date()}</div>
          `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    person ? res.json(person.toJSON()) : res.status(404).end()
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: 'Missing name!' })
  if (!body.number) return res.status(400).json({ error: 'Missing number!' })

  const person = new Person({ name: body.name, number: body.number })

  person.save().then(newPerson => {
    res.json(newPerson.toJSON())
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
