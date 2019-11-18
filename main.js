const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.json())

morgan.token('content', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/', (req, res) => {
  res.send('<h1>The Phonebook backend!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
          <h1>The Phonebook backend!</h1>
          <div>The phonebook has info for ${persons.length} people.</div>
          <div>${Date()}</div>
          `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// const generateId = () => persons[persons.length - 1].id + 1
const generateId = () => Math.round(Math.random() * 10000000)

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: 'Missing name!' })
  if (!body.number) return res.status(400).json({ error: 'Missing number!' })

  if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(409).json({ error: 'Person already exists!' })
  }
  const newPerson = { id: generateId(), name: body.name, number: body.number }
  persons = persons.concat(newPerson)

  res.json(newPerson)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
